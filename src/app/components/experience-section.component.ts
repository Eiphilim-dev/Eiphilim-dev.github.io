import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { 
  experienceDataEN, 
  experienceDataIT, 
  certificationsDataEN, 
  certificationsDataIT 
} from '../../portfolioData';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-6 py-4 animate-content-fade">
      <!-- Group Title -->
      <div class="relative">
        <h2 class="font-heading text-3xl sm:text-4xl text-white uppercase inline-block pb-2 border-b-2 border-brand-cyan tracking-wide clip-section-title pr-16 bg-brand-royal/10">
          {{ t('experience.title') }}
        </h2>
      </div>

      <!-- Two Column Layout on Desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        
        <!-- Left Column: Employment Timeline (7 Cols) -->
        <div class="lg:col-span-7 flex flex-col gap-4">
          <div class="flex items-center gap-2 mb-2 text-brand-cyan">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <h3 class="font-heading text-sm text-white uppercase tracking-wider">
              {{ t('experience.workTitle') }}
            </h3>
          </div>

          <div class="relative border-l-2 border-brand-royal/30 ml-3 pl-6 flex flex-col gap-6">
            @for (job of experienceData(); track job.id) {
              <div 
                [class]="'relative group p-4 sm:p-5 rounded-xs transition-all duration-300 ' + 
                  (job.id === 'exp-open-to-work' 
                    ? 'bg-linear-to-br from-brand-royal/40 via-brand-dark/80 to-brand-deep border-2 border-brand-cyan/70 shadow-[0_0_25px_rgba(0,209,255,0.2)]' 
                    : 'bg-brand-dark/30 border border-brand-royal/15 hover:border-brand-cyan/25')"
              >
                <!-- Visual timeline node (special radar pulse for actively seeking job) -->
                @if (job.id === 'exp-open-to-work') {
                  <div class="absolute -left-[33px] top-5 w-3.5 h-3.5 bg-emerald-400 transform rotate-45 border-2 border-brand-deep shadow-[0_0_14px_#34d399] z-10 animate-pulse"></div>
                  <div class="absolute -left-[38px] top-3.5 w-6 h-6 bg-emerald-400/25 rounded-full animate-ping pointer-events-none"></div>
                } @else {
                  <div class="absolute -left-[31px] top-6 w-3 h-3 bg-brand-cyan transform rotate-45 border border-brand-deep group-hover:scale-125 transition-transform"></div>
                }

                <!-- Active Seeking Employment Highlight Banner -->
                @if (job.id === 'exp-open-to-work') {
                  <div class="flex items-center justify-between bg-emerald-500/15 border border-emerald-400/40 px-2.5 py-1.5 mb-3 rounded-xs">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                      <span class="font-mono text-[9px] sm:text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
                        {{ lang() === 'it' ? 'STATO ATTIVO // IN CERCA DI LAVORO' : 'ACTIVE STATUS // OPEN TO WORK' }}
                      </span>
                    </div>
                    <span class="font-mono text-[9px] sm:text-[10px] text-brand-cyan uppercase tracking-wider font-bold">
                      {{ lang() === 'it' ? 'DISPONIBILE SUBITO' : 'IMMEDIATE START' }}
                    </span>
                  </div>
                }
                
                <!-- Job Metadata -->
                <div class="flex flex-wrap items-start justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                  <div>
                    <h4 class="font-heading text-xs sm:text-sm text-white uppercase tracking-wider leading-tight group-hover:text-brand-cyan transition-colors">
                      {{ job.role }}
                    </h4>
                    <span [class]="'font-mono text-[10px] uppercase tracking-wider mt-0.5 inline-block font-semibold ' + 
                      (job.id === 'exp-open-to-work' ? 'text-emerald-400' : 'text-brand-cyan')">
                      {{ job.company }}
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5 font-mono text-[10px] text-white/70 bg-black/40 px-2 py-0.5 rounded-xs border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-cyan/80 font-mono"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span class="font-mono">{{ job.period }}</span>
                  </div>
                </div>

                <!-- Achievements List -->
                <ul class="flex flex-col gap-1.5 list-none m-0 p-0">
                  @for (bullet of job.description; track bullet; let bIdx = $index) {
                    <li class="flex gap-2 text-white/80 text-xs sm:text-[13px] leading-relaxed">
                      <span class="text-brand-cyan font-bold select-none pr-0.5 mt-0.5 font-mono">
                        //
                      </span>
                      <span>{{ bullet }}</span>
                    </li>
                  }
                </ul>

                <!-- Tech tags used in job -->
                <div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                  @for (skill of job.skills; track skill) {
                    <span [class]="'font-mono text-[9px] px-1.5 py-0.5 ' + 
                      (job.id === 'exp-open-to-work' 
                        ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-bold' 
                        : 'bg-brand-royal/20 text-brand-cyan border border-brand-royal/30')">
                      {{ skill }}
                    </span>
                  }
                </div>

                <!-- Direct CTA for Open to Work -->
                @if (job.id === 'exp-open-to-work') {
                  <div class="mt-3.5 pt-3 border-t border-brand-cyan/25 flex flex-wrap items-center justify-between gap-2">
                    <span class="font-mono text-[9px] text-emerald-400/90 font-medium uppercase tracking-wider">
                      {{ lang() === 'it' ? '// Apertura a colloqui · Sempre pronto a imparare nuove tecnologie' : '// Open to interviews · Always eager to learn new technologies' }}
                    </span>
                    <a 
                      href="mailto:andreaeduard.magri391@gmail.com"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-cyan hover:bg-white text-brand-deep font-mono text-[10px] font-black uppercase tracking-wider rounded-xs transition-all duration-300 shadow-[0_0_12px_rgba(0,209,255,0.3)] hover:scale-105"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      <span>{{ lang() === 'it' ? 'INVIA PROPOSTA LAVORATIVA' : 'DISCUSS OPPORTUNITY' }}</span>
                    </a>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Right Column: Certifications (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <div class="flex items-center gap-2 mb-2 text-brand-cyan">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            <h3 class="font-heading text-sm text-white uppercase tracking-wider">
              {{ t('experience.certTitle') }}
            </h3>
          </div>

          <div class="flex flex-col gap-3">
            @for (cert of certificationsData(); track cert.id) {
              <div class="bg-brand-dark/60 border border-brand-royal/30 p-4 rounded-xs clip-slant-card relative flex flex-col justify-between hover:border-brand-cyan/30 transition-all duration-300 group">
                <div class="flex items-start gap-3">
                  <div class="p-1.5 bg-brand-royal/20 border border-brand-royal/30 rounded-xs mt-0.5 group-hover:bg-brand-cyan/10 transition-colors text-brand-cyan shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <div class="flex flex-col">
                    <h4 class="font-heading text-xs text-white uppercase tracking-wider leading-tight group-hover:text-brand-cyan transition-colors">
                      {{ cert.name }}
                    </h4>
                    <span class="font-mono text-[10px] text-white/50 tracking-wide mt-1">
                      Issuer: {{ cert.issuer }}
                    </span>
                    <span class="font-mono text-[10px] text-white/40 mt-0.5">
                      Date Accepted: {{ cert.date }}
                    </span>
                  </div>
                </div>

                @if (cert.credentialId) {
                  <div class="mt-3 bg-black/40 border border-white/5 px-2.5 py-1 rounded-sm flex items-center justify-between font-mono text-[9px] text-white/40 font-light">
                    <span>CREDENTIAL_ID:</span>
                    <span class="text-brand-cyan font-semibold select-all font-mono">
                      {{ cert.credentialId }}
                    </span>
                  </div>
                }
              </div>
            }

            <!-- Custom specification stamp -->
            <div class="mt-2 text-right border-t border-brand-royal/10 pt-4">
              <div class="inline-flex items-center gap-1.5 font-mono text-[8px] text-white/30 uppercase tracking-widest bg-brand-dark px-3 py-1 border border-white/5">
                <span>{{ t('experience.certVerified') }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ExperienceSectionComponent {
  private langService = inject(LanguageService);

  t(key: string): string {
    return this.langService.t(key);
  }

  lang = computed(() => this.langService.language());

  experienceData = computed(() => {
    return this.lang() === 'it' ? experienceDataIT : experienceDataEN;
  });

  certificationsData = computed(() => {
    return this.lang() === 'it' ? certificationsDataIT : certificationsDataEN;
  });
}
