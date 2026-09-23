import { Component, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionType } from '../../types';
import { LanguageService } from '../services/language.service';
import { portfolioOwner } from '../../portfolioData';

@Component({
  selector: 'app-home-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-8 py-4 animate-content-fade">
      <!-- Visual Slanted Accent Banner / Big Header -->
      <div class="relative mt-2 lg:mt-6">
        <h2 class="font-heading text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-white uppercase select-none">
          AZURE<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-cyan/80 to-brand-royal font-black">
            PROTOCOL
          </span>
        </h2>
        <div class="absolute right-0 top-0 hidden md:block text-right select-none opacity-30 font-mono text-[10px] text-white/60 leading-relaxed">
          <span>HOST_INGRESS // STABLE</span><br />
          <span class="text-brand-cyan font-bold">MATRIX_VER // v1.1.0 STABLE</span><br />
          <span>FRAME_LOC // ITALY_IT</span>
        </div>
      </div>

      <!-- Subtitles & Spec Row -->
      <div class="flex flex-wrap items-center gap-4 bg-brand-dark/60 border border-brand-royal/30 p-4 rounded-xs clip-slant-card shadow-lg">
        <div class="flex items-center gap-2 text-brand-cyan">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <span class="font-mono text-xs sm:text-sm uppercase tracking-widest font-bold">
            {{ localizedTitle() }}
          </span>
        </div>
        <div class="h-4 w-[1px] bg-white/20 hidden sm:block"></div>
        <div class="flex items-center gap-2 text-white/70">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/40">
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <span class="font-mono text-[10px] sm:text-xs uppercase tracking-wider">
            {{ localizedLocation() }}
          </span>
        </div>
      </div>

      <!-- Hero Quote / Abstract Philosophy -->
      <div class="max-w-2xl mt-1">
        <p class="text-white/80 text-base sm:text-lg leading-relaxed font-light">
          {{ t('home.introPhilosophy') }}
        </p>
      </div>

      <!-- Grid: Active Directive and Recent archives side-by-side -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4 items-stretch">
        <!-- Core Objective Card (Left 7 Cols) -->
        <div class="md:col-span-7 relative group overflow-hidden bg-white/5 border-l-4 border-brand-cyan p-6 flex flex-col justify-between shadow-xl backdrop-blur-xs">
          <div>
            <!-- Slanted decoration tag -->
            <div class="absolute top-0 right-0 py-1 px-4 bg-brand-cyan text-brand-deep font-mono text-[9px] uppercase tracking-widest font-black clip-slanted">
              ACTIVE_DIRECTIVE
            </div>
            
            <h3 class="font-heading text-xs uppercase tracking-widest text-[#00D1FF] mb-4">
              {{ t('home.activeFocus') }}
            </h3>
            <p class="text-white/90 text-sm sm:text-base leading-relaxed mb-6 font-light">
              {{ activeFocusText() }}
            </p>
          </div>

          <!-- Dynamic Navigation button inside page -->
          <button
            (click)="triggerNavigate('projects')"
            class="inline-flex max-w-xs items-center gap-2 px-5 py-2.5 bg-brand-cyan hover:bg-brand-royal text-brand-deep hover:text-white font-heading text-xs tracking-wider uppercase transition-all duration-300 transform skew-x-[-12deg] group-hover:scale-102 cursor-pointer outline-none shadow-md border-none"
          >
            <span class="inline-block transform skew-x-[12deg] font-bold">
              {{ t('home.pipeline') }}
            </span>
            <!-- Arrow right -->
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transform skew-x-[12deg]">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <!-- Recent Archives registry (Right 5 Cols) -->
        <div class="md:col-span-5 bg-brand-dark/40 border border-brand-royal/25 p-6 rounded-xs flex flex-col justify-between relative shadow-lg">
          <div>
            <h3 class="text-white/40 text-[9px] font-mono tracking-widest uppercase mb-4">
              {{ t('home.archives') }}
            </h3>
            
            <div class="space-y-4 font-mono text-xs">
              <div (click)="triggerNavigate('projects')" class="flex justify-between items-end border-b border-white/10 pb-2 mb-1 group cursor-pointer hover:border-brand-cyan/44 transition-colors">
                <span class="text-[#A0AEC0] group-hover:text-white transition-colors uppercase tracking-tight">Project // EMPLOYEE_MGMT</span>
                <span class="text-[#00D1FF] font-bold text-[10px]">03.25</span>
              </div>
              
              <div (click)="triggerNavigate('about')" class="flex justify-between items-end border-b border-white/10 pb-2 mb-1 group cursor-pointer hover:border-brand-cyan/44 transition-colors">
                <span class="text-[#A0AEC0] group-hover:text-white transition-colors uppercase tracking-tight">System // SECURE_GATEWAY</span>
                <span class="text-[#00D1FF] font-bold text-[10px]">12.24</span>
              </div>
            </div>
          </div>

          <div class="border border-brand-cyan/20 bg-brand-cyan/5 p-3 rounded-xs mt-4 text-[10px] text-white/60 leading-tight font-mono">
            <span class="text-brand-cyan font-bold block mb-0.5">{{ t('home.registry') }}</span>
            {{ t('home.statusText') }}
          </div>
        </div>
      </div>

      <!-- Subtle specs strip -->
      <div class="mt-6 flex items-center justify-between font-mono text-[9px] text-white/40 border-t border-white/5 pt-4">
        <span>SPEC_CODE: INK-2204_MGR</span>
        <span>NO_COOKIES_NO_TELEMETRY</span>
        <span class="text-brand-cyan/60 uppercase">SYSTEM STABLE</span>
      </div>
    </div>
  `
})
export class HomeSectionComponent {
  langService = inject(LanguageService);
  onNavigate = output<SectionType>({alias: 'onNavigate'});

  t(key: string): string {
    return this.langService.t(key);
  }

  lang = computed(() => this.langService.language());

  localizedTitle = computed(() => {
    return this.lang() === 'it' 
      ? "Sviluppatore Full-Stack · AI Engineer · Backend Java" 
      : "Full-Stack Developer · AI Engineer · Java Backend";
  });

  localizedLocation = computed(() => {
    return this.lang() === 'it' ? portfolioOwner.location.it : portfolioOwner.location.en;
  });

  activeFocusText = computed(() => {
    return this.lang() === 'it' 
      ? "Attivamente alla ricerca di opportunità come Sviluppatore Full-Stack, AI Engineer e Backend Java. Sempre pronto a imparare nuove tecnologie, paradigmi e strumenti con entusiasmo e dedizione costante."
      : "Actively seeking opportunities as Full-Stack Developer, AI Engineer, and Java Backend. Always eager to learn new technologies, frameworks, and architectures with relentless curiosity.";
  });

  triggerNavigate(sec: SectionType) {
    this.onNavigate.emit(sec);
  }
}
