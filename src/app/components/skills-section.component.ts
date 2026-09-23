import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { skillsCategoriesEN, skillsCategoriesIT } from '../../portfolioData';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-6 py-4 animate-content-fade">
      <!-- Title -->
      <div class="relative">
        <h2 class="font-heading text-3xl sm:text-4xl text-white uppercase inline-block pb-2 border-b-2 border-brand-cyan tracking-wide clip-section-title pr-16 bg-brand-royal/10">
          {{ t('skills.title') }}
        </h2>
      </div>

      <!-- Main Grid: Left is Skill Categories list, Right is Detailed Inspector block -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        
        <!-- Categories (8 Cols) -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <p class="text-white/70 text-sm font-light">
            {{ t('skills.introText') }}
          </p>

          <div class="flex flex-col gap-6">
            @for (category of skillsCategories(); track category.title; let catIdx = $index) {
              <div class="bg-brand-dark/40 border border-brand-royal/20 p-4 rounded-xs flex flex-col gap-3 transition-colors duration-300">
                <!-- Category Header -->
                <div class="flex items-center justify-between border-b border-brand-royal/10 pb-2">
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2">
                      <!-- Category icon -->
                      @if (isDigital(category.title)) {
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-cyan"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>
                      } @else if (isLanguage(category.title)) {
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-cyan"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                      } @else {
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-cyan"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                      }
                      
                      <h3 class="font-heading text-sm text-white uppercase tracking-wider">
                        {{ category.title }}
                      </h3>
                    </div>
                    <span class="text-[10px] text-white/55 font-sans mt-0.5 font-light">
                      {{ getCategorySub(category.title) }}
                    </span>
                  </div>
                  <span class="font-mono text-[9px] text-brand-cyan/60 hidden sm:inline">
                    CAT_REG_0{{catIdx + 1}}
                  </span>
                </div>

                <!-- Skills Level list -->
                <div class="flex flex-col gap-3">
                  @for (skill of category.skills; track skill.name; let skIdx = $index) {
                    @let isSelected = isSkillSelected(catIdx, skIdx);
                    <button
                      (click)="selectSkill(catIdx, skIdx)"
                      [class]="'text-left bg-transparent border-none p-0 cursor-pointer w-full group outline-hidden ' + 
                        (isSelected ? 'text-brand-cyan' : 'text-white')"
                    >
                      <div class="flex items-center justify-between font-mono text-xs mb-1">
                        <span class="group-hover:text-brand-cyan transition-colors truncate pr-2 font-medium">
                          {{ skill.name }}
                        </span>
                        <span class="text-brand-cyan font-bold font-mono">
                          {{ skill.level }}%
                        </span>
                      </div>
                      
                      <!-- Progress bar track -->
                      <div class="h-2 bg-black/40 rounded-xs border border-brand-royal/20 overflow-hidden relative">
                        <div 
                          [style.width.%]="skill.level"
                          [class]="'h-full bg-linear-to-r transition-all duration-300 ' + 
                            (isSelected 
                              ? 'from-brand-cyan to-brand-cyan/80 shadow-[0_0_8px_rgba(0,209,255,0.4)]' 
                              : 'from-brand-royal to-brand-cyan/60 group-hover:from-brand-cyan group-hover:to-brand-cyan')"
                        ></div>
                      </div>
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Dynamic Inspector Block (4 Cols) -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="sticky top-4 bg-gradient-to-b from-brand-royal/20 to-brand-dark/90 border-2 border-brand-cyan/30 p-5 rounded-xs clip-slant-card shadow-2xl flex flex-col justify-between min-h-[360px] relative">
            <div class="absolute top-0 right-0 py-0.5 px-3 bg-brand-cyan text-brand-deep font-mono text-[8px] uppercase tracking-widest font-black">
              {{ t('skills.inspectorTitle') }}
            </div>
            
            <!-- Inspector content -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-1.5 text-brand-cyan font-mono text-[9px] uppercase tracking-wider mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <span>{{ t('skills.results') }}</span>
              </div>

              <div class="flex flex-col gap-1 border-b border-white/10 pb-3">
                <span class="font-mono text-white/40 text-[9px] uppercase">REGISTER_NAME //</span>
                <span class="font-heading text-base sm:text-lg text-white leading-tight uppercase tracking-wider flex items-center gap-1">
                  {{ currentSkill().name }}
                </span>
                <span class="font-mono text-[10px] text-brand-cyan mt-1">
                  CATEGORY: {{ currentCategory().title.toUpperCase() }}
                </span>
              </div>

              <div class="flex flex-col gap-1">
                <span class="font-mono text-white/40 text-[9px] uppercase">SPEC_LOG //</span>
                <p class="font-sans text-xs text-white/80 leading-relaxed font-light mt-1 whitespace-pre-wrap">
                  {{ currentSkill().info || "No detailed log comments defined. This registry represents expert proficiency in practical software pipeline deployments." }}
                </p>
              </div>
            </div>

            <!-- Micro progress gauge inside inspect panel -->
            <div class="mt-6 border-t border-white/10 pt-3">
              <div class="flex justify-between font-mono text-[10px] text-white/40 mb-1">
                <span>{{ t('skills.efficiency') }}</span>
                <span class="text-brand-cyan font-semibold font-mono">{{ currentSkill().level }}/100</span>
              </div>
              <div class="h-1 bg-black/60 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-brand-cyan transition-all duration-500"
                  [style.width.%]="currentSkill().level"
                ></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class SkillsSectionComponent {
  private langService = inject(LanguageService);

  selectedIndices = signal({ catIdx: 0, skIdx: 0 });

  t(key: string): string {
    return this.langService.t(key);
  }

  lang = computed(() => this.langService.language());

  skillsCategories = computed(() => {
    return this.lang() === 'it' ? skillsCategoriesIT : skillsCategoriesEN;
  });

  safeIndices = computed(() => {
    const categories = this.skillsCategories();
    const indices = this.selectedIndices();
    const catIdx = Math.min(indices.catIdx, categories.length - 1);
    const currentCategory = categories[catIdx];
    const skIdx = Math.min(indices.skIdx, currentCategory.skills.length - 1);
    return { catIdx, skIdx };
  });

  currentCategory = computed(() => {
    const idx = this.safeIndices().catIdx;
    return this.skillsCategories()[idx];
  });

  currentSkill = computed(() => {
    const { catIdx, skIdx } = this.safeIndices();
    return this.skillsCategories()[catIdx].skills[skIdx];
  });

  isDigital(title: string): boolean {
    const lower = title.toLowerCase();
    return lower.includes('digital') || lower.includes('competenze digitali');
  }

  isLanguage(title: string): boolean {
    const lower = title.toLowerCase();
    return lower.includes('language') || lower.includes('lingua') || lower.includes('linguistiche');
  }

  getCategorySub(title: string): string {
    const lower = title.toLowerCase();
    if (this.isDigital(title)) {
      return this.t('skills.category.digitalDesc');
    } else if (this.isLanguage(title)) {
      return this.t('skills.category.langDesc');
    } else {
      return this.t('skills.category.softDesc');
    }
  }

  isSkillSelected(catIdx: number, skIdx: number): boolean {
    const indices = this.safeIndices();
    return indices.catIdx === catIdx && indices.skIdx === skIdx;
  }

  selectSkill(catIdx: number, skIdx: number) {
    this.selectedIndices.set({ catIdx, skIdx });
  }
}
