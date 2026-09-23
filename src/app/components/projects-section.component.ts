import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { projectsDataEN, projectsDataIT } from '../../portfolioData';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-6 py-4 animate-content-fade">
      <!-- Group Title -->
      <div class="relative">
        <h2 class="font-heading text-3xl sm:text-4xl text-white uppercase inline-block pb-2 border-b-2 border-brand-cyan tracking-wide clip-section-title pr-16 bg-brand-royal/10">
          {{ t('projects.title') }}
        </h2>
      </div>

      <!-- Grid of Projects -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-4">
        @for (project of projectsData(); track project.id; let idx = $index) {
          <div class="group relative bg-brand-dark/70 border border-brand-royal/30 hover:border-brand-cyan/45 p-5 rounded-xs clip-slant-card flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,209,255,0.15)] min-h-[460px]">
            <!-- Top row: Project index stamp and period -->
            <div class="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5">
              <span class="font-mono text-brand-cyan text-[10px] uppercase tracking-widest font-bold">
                PRJ_NODE_0{{ idx + 1 }}
              </span>
              <span class="font-mono text-[9px] text-white/40 uppercase tracking-wider">
                {{ t('projects.period') }} {{ project.period }}
              </span>
            </div>

            <!-- Core Metadata -->
            <div class="flex flex-col gap-2">
              <h3 class="font-heading text-lg text-white uppercase tracking-wider group-hover:text-brand-cyan transition-colors truncate">
                {{ project.title }}
              </h3>
              
              <div class="inline-flex max-w-max items-center gap-1.5 px-2 py-0.5 bg-brand-royal/20 border border-brand-royal/30 rounded-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-cyan"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                <span class="font-mono text-[9px] text-brand-cyan uppercase tracking-wider font-semibold">
                  Role: {{ project.role }}
                </span>
              </div>

              <p class="font-sans text-xs sm:text-[13px] text-white/70 leading-relaxed font-light mt-2 min-h-[72px]">
                {{ project.description }}
              </p>
            </div>

            <!-- Key Metric section -->
            <div class="my-3.5 bg-black/40 border border-white/5 p-3 rounded-xs flex gap-2.5 items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-cyan shrink-0 mt-0.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              <div class="flex flex-col gap-0.5">
                <span class="font-mono text-[9px] text-white/40 uppercase tracking-widest leading-none">{{ t('projects.perf') }}</span>
                <span class="font-mono text-[11px] text-brand-cyan font-semibold leading-snug">
                  {{ project.metrics }}
                </span>
              </div>
            </div>

            <!-- Feature spec outline -->
            <div class="flex flex-col gap-1.5 mb-4 items-stretch">
              <span class="font-mono text-[9px] text-white/40 uppercase tracking-wider">{{ t('projects.core') }}</span>
              <ul class="flex flex-col gap-1 list-none pl-0 m-0">
                @for (feature of project.features; track feature) {
                  <li class="flex gap-1.5 text-white/60 text-[11px] leading-tight select-none">
                    <span class="text-brand-cyan font-mono">▶</span>
                    <span>{{ feature }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- Footer with Stack and Controls -->
            <div class="flex flex-col gap-3 pt-3 border-t border-white/5 mt-auto">
              <!-- Stack tags -->
              <div class="flex flex-wrap gap-1">
                @for (t of project.tech; track t) {
                  <span class="font-mono text-[8px] bg-brand-royal/10 text-brand-cyan/80 px-1.5 py-0.5 rounded-sm border border-brand-royal/10">
                    {{ t }}
                  </span>
                }
              </div>

              <!-- Ingress buttons -->
              <div class="flex items-center gap-3 font-mono text-[11px]">
                @if (project.github) {
                  <a 
                    [href]="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-b from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 text-white hover:text-brand-cyan border border-white/10 hover:border-brand-cyan/20 rounded-xs transition-all duration-300 transform skew-x-[-12deg] grow justify-center outline-hidden select-none cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform skew-x-[12deg]"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    <span class="transform skew-x-[12deg] tracking-wider uppercase font-semibold">REPOSIT_REG</span>
                  </a>
                }
                @if (project.link) {
                  <a 
                    [href]="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-cyan hover:bg-brand-royal text-brand-deep hover:text-white border border-transparent rounded-xs transition-all duration-300 transform skew-x-[-12deg] grow justify-center outline-hidden select-none cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform skew-x-[12deg]"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    <span class="transform skew-x-[12deg] tracking-wider uppercase font-semibold font-bold">INITIAL_RUN</span>
                  </a>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProjectsSectionComponent {
  private langService = inject(LanguageService);

  t(key: string): string {
    return this.langService.t(key);
  }

  lang = computed(() => this.langService.language());

  projectsData = computed(() => {
    return this.lang() === 'it' ? projectsDataIT : projectsDataEN;
  });
}
