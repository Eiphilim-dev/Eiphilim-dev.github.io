import { Component, input, output, OnInit, OnDestroy, signal, computed, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionType, Section } from '../../types';
import { LanguageService, Language } from '../services/language.service';
import { azureMusicDevice } from '../../utils/audioSynth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'shrink-0 z-30 block w-full lg:w-auto lg:h-full lg:min-h-0'
  },
  template: `
    <!-- ==================== MOBILE & TABLET TOP NAVIGATION BAR (< lg) ==================== -->
    <header class="lg:hidden shrink-0 z-40 bg-brand-deep/90 backdrop-blur-md border-b border-brand-royal/40 px-4 py-3 select-none flex items-center justify-between shadow-lg">
      <!-- Brand & Active Section Indicator -->
      <div class="flex items-center gap-2.5">
        <div class="w-3 h-3 bg-brand-cyan transform rotate-45 shrink-0"></div>
        <div class="flex flex-col">
          <div class="flex items-center gap-1.5 leading-none">
            <span class="font-heading text-sm font-black tracking-tight text-white uppercase italic">
              AZURE <span class="text-brand-cyan">PROTOCOL</span>
            </span>
          </div>
          <span class="font-mono text-[9px] text-brand-cyan tracking-widest uppercase mt-0.5">
            // {{ activeSectionLabel() }}
          </span>
        </div>
      </div>

      <!-- Controls: Audio, Language, Mobile Menu Toggle -->
      <div class="flex items-center gap-2">
        <!-- Language Switcher -->
        <div class="flex bg-black/50 border border-brand-cyan/20 p-0.5 rounded-xs">
          <button
            (click)="setLang('en')"
            [class]="'px-1.5 py-0.5 font-mono text-[9px] font-bold rounded-xs transition-colors cursor-pointer border-none ' + 
              (lang() === 'en' ? 'bg-brand-cyan text-brand-deep' : 'text-white/60 hover:text-white')"
            aria-label="Set English"
          >
            EN
          </button>
          <button
            (click)="setLang('it')"
            [class]="'px-1.5 py-0.5 font-mono text-[9px] font-bold rounded-xs transition-colors cursor-pointer border-none ' + 
              (lang() === 'it' ? 'bg-brand-cyan text-brand-deep' : 'text-white/60 hover:text-white')"
            aria-label="Imposta Italiano"
          >
            IT
          </button>
        </div>

        <!-- Quick Audio Toggle -->
        <button
          (click)="toggleMusic()"
          [class]="'p-1.5 rounded-xs border transition-all cursor-pointer ' + 
            (isMusicPlaying() 
              ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan' 
              : 'bg-black/40 border-white/10 text-white/50 hover:text-white')"
          aria-label="Toggle Sound"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            [class]="isMusicPlaying() ? 'animate-pulse' : ''"
          >
            @if (isMusicPlaying()) {
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            } @else {
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="22" y1="9" x2="16" y2="15"></line>
              <line x1="16" y1="9" x2="22" y2="15"></line>
            }
          </svg>
        </button>

        <!-- Menu Button (Open / Close Drawer) -->
        <button
          (click)="toggleMobileMenu()"
          class="flex items-center gap-1 px-2.5 py-1.5 bg-brand-royal/40 hover:bg-brand-royal border border-brand-cyan/40 hover:border-brand-cyan text-white text-[10px] font-mono uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
          [attr.aria-expanded]="mobileMenuOpen()"
          aria-label="Toggle Navigation Menu"
        >
          <span>MENU</span>
          <span class="text-brand-cyan font-bold font-mono">
            {{ mobileMenuOpen() ? '[✕]' : '[☰]' }}
          </span>
        </button>
      </div>
    </header>

    <!-- ==================== MOBILE FULLSCREEN DRAWER OVERLAY ==================== -->
    @if (mobileMenuOpen()) {
      <div 
        class="lg:hidden fixed inset-0 z-50 bg-brand-deep/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-content-fade"
        role="dialog"
        aria-modal="true"
      >
        <!-- Top bar inside drawer with close button -->
        <div class="flex items-center justify-between border-b border-brand-royal/40 pb-4">
          <div class="flex items-center gap-2">
            <div class="w-3.5 h-3.5 bg-brand-cyan transform rotate-45"></div>
            <span class="font-mono text-xs text-brand-cyan tracking-widest font-bold">
              SYS_NAVIGATION_MATRIX
            </span>
            <span class="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded-xs border border-emerald-400/20">
              v1.1.0 STABLE
            </span>
          </div>

          <button
            (click)="closeMobileMenu()"
            class="p-2 text-white/70 hover:text-brand-cyan font-mono text-xs cursor-pointer bg-black/40 border border-brand-royal/30 rounded-xs"
            aria-label="Close navigation menu"
          >
            ESC [✕]
          </button>
        </div>

        <!-- Navigation Links in Drawer -->
        <div class="flex flex-col gap-4 my-6" role="tablist">
          @for (section of sections(); track section.id; let idx = $index) {
            <button
              role="tab"
              [attr.aria-selected]="activeSection() === section.id"
              (click)="selectSectionMobile(section.id)"
              [class]="'text-left border-none bg-transparent cursor-pointer w-full py-2 outline-hidden transition-all ' + 
                (activeSection() === section.id ? 'opacity-100' : 'opacity-65 hover:opacity-100')"
            >
              <span [class]="'text-[10px] tracking-[0.25em] font-mono block mb-1 uppercase font-bold ' + 
                (activeSection() === section.id ? 'text-brand-cyan' : 'text-white/60')">
                {{ getSectionMetatag(section.id, idx) }}
              </span>
              
              <div class="flex items-center justify-between">
                <span
                  [class]="'font-heading text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-none transition-transform ' + 
                    (activeSection() === section.id ? 'text-brand-cyan italic translate-x-2' : 'text-white')"
                >
                  {{ t('nav.' + section.id) }}
                </span>
                @if (activeSection() === section.id) {
                  <span class="text-brand-cyan font-bold text-sm pr-2 animate-pulse">◀</span>
                }
              </div>
            </button>
          }
        </div>

        <!-- Audio controls and links inside Mobile Drawer -->
        <div class="flex flex-col gap-3 pt-4 border-t border-brand-royal/30">
          <!-- Audio track controller -->
          <button
            (click)="toggleMusic()"
            [class]="'flex items-center justify-between px-3 py-2 rounded-xs border text-left cursor-pointer ' + 
              (isMusicPlaying() 
                ? 'bg-brand-cyan/15 border-brand-cyan text-brand-cyan' 
                : 'bg-black/30 border-white/10 text-white/70')"
          >
            <span class="font-heading text-[11px] uppercase tracking-wider font-bold">
              {{ isMusicPlaying() ? t('sidebar.soundOn') : t('sidebar.soundOff') }}
            </span>
            <span class="font-mono text-[9px] text-brand-cyan font-bold">
              {{ isMusicPlaying() ? 'ACTIVE' : 'MUTED' }}
            </span>
          </button>

          @if (isMusicPlaying()) {
            <div class="flex flex-col gap-2.5 bg-black/40 border border-brand-cyan/25 p-3 rounded-xs text-[10px]">
              <div class="flex items-center justify-between font-mono text-[9px]">
                <span class="text-white/60 uppercase">{{ t('sidebar.oceanWash') }}</span>
                <span class="text-brand-cyan font-bold">{{ oceanVolume() }}%</span>
              </div>
              <input 
                type="range" min="0" max="100" step="5"
                [value]="oceanVolume()"
                (input)="onOceanVolumeChange($event)"
                class="w-full h-1 bg-brand-royal/40 accent-brand-cyan cursor-pointer"
              />

              <div class="flex items-center justify-between font-mono text-[9px] mt-1">
                <span class="text-white/60 uppercase">{{ t('sidebar.sequencerPad') }}</span>
                <span class="text-brand-cyan font-bold">{{ sequencerVolume() }}%</span>
              </div>
              <input 
                type="range" min="0" max="100" step="5"
                [value]="sequencerVolume()"
                (input)="onSequencerVolumeChange($event)"
                class="w-full h-1 bg-brand-royal/40 accent-brand-cyan cursor-pointer"
              />
            </div>
          }

          <div class="flex items-center justify-between text-white/50 font-mono text-[9px] pt-1">
            <span>{{ formattedTime() }}</span>
            <div class="flex gap-4">
              <a href="mailto:andreaeduard.magri391@gmail.com" class="text-white/70 hover:text-brand-cyan">EMAIL</a>
              <a href="https://github.com/Eiphilim-dev" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-brand-cyan">GITHUB</a>
              <a href="https://www.linkedin.com/in/andreaeduard-magr%C3%AC-2a1111333/" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-brand-cyan">LINKEDIN</a>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- ==================== DESKTOP FIXED SLANTED SIDEBAR (lg and up) ==================== -->
    <nav class="hidden lg:flex relative w-[245px] xl:w-[285px] 2xl:w-[330px] bg-brand-royal text-white h-full max-h-full flex-col justify-between p-4 xl:p-6 2xl:p-8 shrink-0 z-30 select-none clip-slanted shadow-2xl border-r-2 border-brand-cyan/20 overflow-y-auto overflow-x-hidden min-h-0">
      
      <!-- Top Brand / Header -->
      <div class="flex flex-col gap-1.5 shrink-0">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <div class="w-3 h-3 bg-brand-cyan transform rotate-45"></div>
            <span class="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-cyan font-bold">
              SYS_NODE_MGR
            </span>
          </div>

          <!-- Language Switcher EN / IT -->
          <div class="flex bg-black/40 border border-brand-cyan/20 p-0.5 rounded-sm shrink-0">
            <button
              (click)="setLang('en')"
              [class]="'px-1.5 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold rounded-xs transition-colors cursor-pointer outline-hidden border-none ' + 
                (lang() === 'en' ? 'bg-brand-cyan text-brand-deep' : 'text-white/50 hover:text-white')"
            >
              EN
            </button>
            <button
              (click)="setLang('it')"
              [class]="'px-1.5 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold rounded-xs transition-colors cursor-pointer outline-hidden border-none ' + 
                (lang() === 'it' ? 'bg-brand-cyan text-brand-deep' : 'text-white/50 hover:text-white')"
            >
              IT
            </button>
          </div>
        </div>
        
        <h1 class="font-heading text-2xl xl:text-3xl leading-none tracking-tighter uppercase mt-0.5 italic">
          AZURE<br />
          <span class="text-brand-cyan font-black">PROTOCOL</span>
        </h1>
        <div class="h-[2px] w-[85%] bg-linear-to-r from-brand-cyan via-brand-cyan/30 to-transparent mt-1.5"></div>
        
        <p class="font-mono text-[8px] xl:text-[9px] text-[#A0AEC0] tracking-wider uppercase mt-0.5 opacity-80">
          EST. 2024 // FRONTIER
        </p>
      </div>

      <!-- Center Navigation Links (my-auto centers when screen is tall, flows gracefully when compact) -->
      <div class="flex flex-col gap-2 xl:gap-3.5 my-auto py-3 shrink-0" role="tablist">
        @for (section of sections(); track section.id; let idx = $index) {
          <button
            role="tab"
            [attr.aria-selected]="activeSection() === section.id"
            [attr.aria-controls]="'panel-' + section.id"
            [id]="'tab-' + section.id"
            (click)="selectSection(section.id)"
            [class]="'group flex flex-col justify-start text-left border-none bg-transparent cursor-pointer w-full py-1 outline-hidden transition-all duration-300 ' + 
              (activeSection() === section.id ? 'opacity-100' : 'opacity-60 hover:opacity-100')"
          >
            <span [class]="'text-[0.6rem] xl:text-[0.65rem] tracking-[0.25em] font-mono block mb-0.5 uppercase font-bold transition-colors ' + 
              (activeSection() === section.id ? 'text-[#00D1FF]' : 'text-white')">
              {{ getSectionMetatag(section.id, idx) }}
            </span>
            
            <div class="flex items-center justify-between w-full">
              <span
                [class]="'font-heading text-lg xl:text-2xl 2xl:text-3xl font-black tracking-tighter uppercase leading-none transition-transform duration-300 group-hover:translate-x-1.5 ' + 
                  (activeSection() === section.id ? 'text-brand-cyan italic translate-x-2 xl:translate-x-3' : 'text-white')"
              >
                {{ t('nav.' + section.id) }}
              </span>

              @if (activeSection() === section.id) {
                <span class="text-brand-cyan font-bold text-sm pr-2 animate-pulse">
                  ◀
                </span>
              }
            </div>
          </button>
        }
      </div>

      <!-- Bottom Information: Status, Music & Socials (pr-4 to pr-6 to stay inside the polygon clip slant) -->
      <div class="flex flex-col gap-2.5 xl:gap-3 pr-4 xl:pr-6 shrink-0">
        <!-- Systems Online Status Badge + Live UTC time -->
        <div class="border border-brand-cyan/45 bg-black/40 p-2 xl:p-2.5 text-[9px] xl:text-[10px] tracking-widest rounded-xs">
          <div class="flex items-center justify-between border-b border-brand-cyan/20 pb-1 mb-1">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-brand-cyan animate-pulse rounded-full"></div>
              <span class="text-brand-cyan font-black uppercase text-[9px] xl:text-[10px]">
                {{ t('sidebar.status') }}
              </span>
            </div>
            <span class="font-mono text-[8px] xl:text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded-xs border border-emerald-400/20">
              v1.1.0 STABLE
            </span>
          </div>
          <div class="flex items-center justify-between text-[9px] xl:text-[10px] font-mono">
            <span class="text-white/40">SYS_TIME:</span>
            <span class="text-[#00D1FF] font-semibold">{{ formattedTime() }}</span>
          </div>
        </div>

        <!-- Dynamic P3-inspired Web Audio Loop controller -->
        <button
          (click)="toggleMusic()"
          [class]="'flex items-center justify-between px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xs border transition-all duration-300 text-left cursor-pointer outline-hidden border-none ' + 
            (isMusicPlaying() 
              ? 'bg-brand-cyan/15 border-brand-cyan hover:bg-brand-cyan/25 text-brand-cyan shadow-[0_0_10px_rgba(0,209,255,0.2)]' 
              : 'bg-black/30 border-white/10 text-white/70 hover:border-brand-cyan/50 hover:bg-black/50')"
        >
          <div class="flex items-center gap-2">
            @if (isMusicPlaying()) {
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-cyan animate-pulse">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/40">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="22" y1="9" x2="16" y2="15"></line>
                <line x1="16" y1="9" x2="22" y2="15"></line>
              </svg>
            }
            <div class="flex flex-col">
              <span class="font-mono text-[7px] xl:text-[8px] uppercase tracking-widest text-[#A0AEC0] leading-none mb-0.5">
                {{ t('sidebar.soundtrack') }}
              </span>
              <span class="font-heading text-[9px] xl:text-[10px] uppercase tracking-wide leading-none font-bold">
                {{ isMusicPlaying() ? t('sidebar.soundOn') : t('sidebar.soundOff') }}
              </span>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            [class]="'shrink-0 ' + (isMusicPlaying() ? 'text-brand-cyan animate-spin [animation-duration:8s]' : 'text-white/30')"
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        </button>

        <!-- Volumetric slider controls for custom ocean & chord soundscapes -->
        @if (isMusicPlaying()) {
          <div class="flex flex-col gap-2 bg-black/40 border border-brand-cyan/25 p-2 xl:p-2.5 rounded-xs text-[9px] tracking-wider transition-all duration-300">
            <!-- Ocean Wash Slider -->
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center justify-between font-mono text-[8px] xl:text-[9px]">
                <span class="text-white/60 uppercase">{{ t('sidebar.oceanWash') }}</span>
                <span class="text-brand-cyan font-bold">{{ oceanVolume() }}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                step="5"
                [value]="oceanVolume()"
                (input)="onOceanVolumeChange($event)"
                class="w-full h-1 rounded-full bg-brand-royal/40 appearance-none cursor-pointer accent-brand-cyan border border-brand-cyan/25 focus:outline-hidden"
              />
            </div>

            <!-- Sequencer Pad Slider -->
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center justify-between font-mono text-[8px] xl:text-[9px]">
                <span class="text-white/60 uppercase">{{ t('sidebar.sequencerPad') }}</span>
                <span class="text-brand-cyan font-bold">{{ sequencerVolume() }}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                step="5"
                [value]="sequencerVolume()"
                (input)="onSequencerVolumeChange($event)"
                class="w-full h-1 rounded-full bg-brand-royal/40 appearance-none cursor-pointer accent-brand-cyan border border-brand-cyan/25 focus:outline-hidden"
              />
            </div>
          </div>
        }

        <!-- Secure Linkage channels -->
        <div class="flex items-center justify-between text-[#A0AEC0] font-mono text-[8px] xl:text-[9px] uppercase tracking-wider mt-0.5">
          <span>{{ t('sidebar.link') }}</span>
          <div class="flex gap-2.5">
            <a 
              href="mailto:andreaeduard.magri391@gmail.com" 
              aria-label="Direct Email Link"
              class="hover:text-brand-cyan transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </a>
            <a 
              href="https://github.com/Eiphilim-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Github Repo Link"
              class="hover:text-brand-cyan transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/andreaeduard-magr%C3%AC-2a1111333/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Link"
              class="hover:text-brand-cyan transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class SidebarComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);

  activeSection = input.required<SectionType>();
  sections = input.required<Section[]>();
  sectionChange = output<SectionType>({alias: 'onSectionChange'});

  mobileMenuOpen = signal<boolean>(false);
  isMusicPlaying = signal<boolean>(false);
  oceanVolume = signal<number>(Math.round(azureMusicDevice.getOceanWashVolume() * 100));
  sequencerVolume = signal<number>(Math.round(azureMusicDevice.getSequencerVolume() * 100));
  time = signal<Date>(new Date());
  private clockInterval?: any;

  lang = computed(() => this.langService.language());

  activeSectionLabel = computed(() => {
    const sec = this.activeSection();
    return this.t('nav.' + sec);
  });

  @HostListener('window:keydown.escape')
  onEscapePress() {
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  ngOnInit() {
    this.isMusicPlaying.set(azureMusicDevice.getStatus());
    this.clockInterval = setInterval(() => {
      this.time.set(new Date());
    }, 1000);
  }

  formattedTime = computed(() => {
    const d = this.time();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
  });

  t(key: string): string {
    return this.langService.t(key);
  }

  setLang(lang: Language) {
    this.langService.setLanguage(lang);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  selectSection(id: SectionType) {
    this.sectionChange.emit(id);
  }

  selectSectionMobile(id: SectionType) {
    this.sectionChange.emit(id);
    this.closeMobileMenu();
  }

  toggleMusic() {
    const isPlaying = azureMusicDevice.toggle();
    this.isMusicPlaying.set(isPlaying);
    if (isPlaying) {
      this.oceanVolume.set(Math.round(azureMusicDevice.getOceanWashVolume() * 100));
      this.sequencerVolume.set(Math.round(azureMusicDevice.getSequencerVolume() * 100));
    }
  }

  onOceanVolumeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) / 100;
    azureMusicDevice.setOceanWashVolume(value);
    this.oceanVolume.set(parseFloat(input.value));
  }

  onSequencerVolumeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) / 100;
    azureMusicDevice.setSequencerVolume(value);
    this.sequencerVolume.set(parseFloat(input.value));
  }

  getSectionMetatag(id: SectionType, idx: number) {
    const paddedIdx = (idx + 1).toString().padStart(2, '0');
    switch (id) {
      case 'home': return `${paddedIdx} // CORE`;
      case 'about': return `${paddedIdx} // ORIGIN`;
      case 'skills': return `${paddedIdx} // LOGIC`;
      case 'experience': return `${paddedIdx} // RECORD`;
      case 'projects': return `${paddedIdx} // ASSETS`;
      case 'contact': return `${paddedIdx} // LINK`;
      default: return `${paddedIdx} // DEPLOYMENT`;
    }
  }

  ngOnDestroy() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }
}
