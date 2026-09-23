import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { portfolioOwner } from '../../portfolioData';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-6 py-4 animate-content-fade">
      <!-- Group Title -->
      <div class="relative">
        <h2 class="font-heading text-3xl sm:text-4xl text-white uppercase inline-block pb-2 border-b-2 border-brand-cyan tracking-wide clip-section-title pr-16 bg-brand-royal/10">
          {{ t('about.title') }}
        </h2>
      </div>

      <!-- Main Narrative Columns -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
        <!-- Core narrative block (8 cols) -->
        <div class="md:col-span-8 flex flex-col gap-4 text-white/80 text-sm sm:text-base leading-relaxed font-light">
          <p>
            {{ t('about.p1') }}
          </p>
          <p>
            {{ t('about.p2') }}
          </p>
          <p>
            {{ t('about.p3') }}
          </p>
        </div>

        <!-- Floating geometric info box (4 cols) -->
        <div class="md:col-span-4 bg-brand-dark/80 border border-brand-royal/40 p-5 rounded-xs clip-slant-card relative flex flex-col justify-between shadow-xl">
          <div class="absolute top-0 right-0 py-0.5 px-3 bg-brand-royal text-white font-mono text-[8px] uppercase tracking-widest font-bold">
            {{ t('about.specTitle') }}
          </div>
          
          <div class="flex flex-col gap-3 mt-2">
            <span class="font-mono text-brand-cyan text-[10px] uppercase tracking-wider">PORTFOLIO PROTOCOL:</span>
            
            <div class="flex flex-col gap-1 font-mono text-xs text-white/70">
              <div class="flex justify-between border-b border-white/5 py-1">
                <span class="text-white/40">NAME:</span>
                <span class="font-medium text-white font-bold">Andreaeduard Magri</span>
              </div>
              <div class="flex justify-between border-b border-white/5 py-1">
                <span class="text-white/40">VERSION:</span>
                <span class="font-medium text-brand-cyan font-bold">1.1.0_STABLE</span>
              </div>
              <div class="flex justify-between border-b border-white/5 py-1">
                <span class="text-white/40">ENGINE:</span>
                <span class="font-medium text-white">VITE // ANGULAR</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-white/40">LOCATION:</span>
                <span class="font-medium text-white">{{ localizedLocation() }}</span>
              </div>
            </div>
          </div>

          <div class="border border-brand-cyan/20 bg-brand-cyan/5 p-3 rounded-xs mt-4">
            <div class="flex items-center gap-1.5 text-brand-cyan text-[10px] uppercase font-mono font-bold tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
              <span>{{ t('about.status') }}</span>
            </div>
            <p class="font-sans text-[11px] text-white/70 italic mt-1 leading-tight">
              {{ t('about.statusText') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Philosophy / Values section with Cards -->
      <div class="mt-6">
        <h3 class="font-heading text-lg text-white uppercase tracking-wider mb-4">
          {{ t('about.principlesTitle') }}
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          @for (p of principles(); track p.title; let i = $index) {
            <div class="bg-brand-dark/40 border border-brand-royal/20 hover:border-brand-cyan/40 p-4 rounded-xs transition-colors duration-300 flex flex-col gap-2 relative group">
              <!-- Subtle top index indicator -->
              <div class="absolute top-2 right-2 font-mono text-[9px] text-brand-cyan/40 uppercase">
                OP-{{i + 1}}
              </div>
              
              <div class="w-8 h-8 rounded-full bg-brand-royal/30 flex items-center justify-center border border-brand-royal/40 group-hover:border-brand-cyan/30 transition-colors text-brand-cyan">
                <!-- Icon placement matching React models -->
                @if (i % 3 === 0) {
                  <!-- Hammer -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0-.83-.83-.83-2.17 0-3L12 9"></path><path d="M17.64 15 22 10.64"></path><path d="m21 16-5-5"></path><path d="M8 4c.6 0 1 .4 1 1v1h3c.6 0 1 .4 1 1v3H6V7c0-.6.4-1 1-1h1V5c0-.6.4-1 1-1Z"></path></svg>
                } @else if (i % 3 === 1) {
                  <!-- Eye -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                } @else {
                  <!-- Shield -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                }
              </div>
              
              <h4 class="font-heading text-xs uppercase tracking-wider text-white mt-1 group-hover:text-brand-cyan transition-colors">
                {{ p.title }}
              </h4>
              <p class="font-sans text-xs text-white/60 leading-normal">
                {{ p.desc }}
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class AboutSectionComponent {
  private langService = inject(LanguageService);

  t(key: string): string {
    return this.langService.t(key);
  }

  lang = computed(() => this.langService.language());

  localizedLocation = computed(() => {
    return this.lang() === 'it' ? portfolioOwner.location.it : portfolioOwner.location.en;
  });

  principles = computed(() => {
    return this.t('about.principles') || [];
  });
}
