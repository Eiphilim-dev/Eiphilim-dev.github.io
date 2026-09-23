import { Component, signal, ElementRef, viewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section, SectionType } from '../types';
import { BackgroundAtmosphereComponent } from './components/background-atmosphere.component';
import { UnderwaterBubblesComponent } from './components/underwater-bubbles.component';
import { ProtagonistStageComponent } from './components/protagonist-stage.component';
import { SidebarComponent } from './components/sidebar.component';
import { HomeSectionComponent } from './components/home-section.component';
import { AboutSectionComponent } from './components/about-section.component';
import { SkillsSectionComponent } from './components/skills-section.component';
import { ExperienceSectionComponent } from './components/experience-section.component';
import { ProjectsSectionComponent } from './components/projects-section.component';
import { ContactSectionComponent } from './components/contact-section.component';

const SECTIONS: Section[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundAtmosphereComponent,
    UnderwaterBubblesComponent,
    ProtagonistStageComponent,
    SidebarComponent,
    HomeSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    ContactSectionComponent
  ],
  template: `
    <!-- Outer viewport responsive container with 100dvh support -->
    <div class="relative flex flex-col lg:flex-row h-[100dvh] w-full overflow-hidden bg-brand-deep text-white font-sans selection:bg-brand-cyan selection:text-brand-deep">
      
      <!-- Dynamic drifting background shapes -->
      <app-background-atmosphere></app-background-atmosphere>

      <!-- Under-water drifting shimmers & bubble physics engine -->
      <app-underwater-bubbles></app-underwater-bubbles>

      <!-- High-contrast animated geometric protagonist layer backing the panels -->
      <app-protagonist-stage [activeSection]="activeSection()"></app-protagonist-stage>

      <!-- Slanted sidebar representing the navigation control console (mobile bar + desktop side rail) -->
      <app-sidebar 
        [activeSection]="activeSection()" 
        (onSectionChange)="handleSectionChange($event)" 
        [sections]="sections" 
      ></app-sidebar>

      <!-- Primary content stage with auto-scroll-to-top & responsive padding -->
      <main 
        #mainStage
        class="relative flex-grow min-w-0 h-full overflow-y-auto z-10 px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-12 xl:py-12 2xl:px-16 2xl:py-16 focus:outline-hidden scroll-smooth"
        [id]="'panel-' + activeSection()"
        role="tabpanel"
        [attr.aria-labelledby]="'tab-' + activeSection()"
        tabIndex="0"
      >
        <!-- Responsive display constraint width boundary -->
        <div class="w-full max-w-4xl 2xl:max-w-5xl mx-auto pb-12 lg:pb-8">
          @switch (activeSection()) {
            @case ('home') {
              <app-home-section (onNavigate)="handleSectionChange($event)"></app-home-section>
            }
            @case ('about') {
              <app-about-section></app-about-section>
            }
            @case ('skills') {
              <app-skills-section></app-skills-section>
            }
            @case ('experience') {
              <app-experience-section></app-experience-section>
            }
            @case ('projects') {
              <app-projects-section></app-projects-section>
            }
            @case ('contact') {
              <app-contact-section></app-contact-section>
            }
          }
        </div>
      </main>

      <!-- Visual Slanted Margin border framing the screen edge on desktop -->
      <div class="absolute right-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-brand-cyan/20 via-brand-royal/40 to-transparent pointer-events-none z-20 hidden lg:block"></div>
    </div>
  `
})
export class AppComponent {
  activeSection = signal<SectionType>('home');
  sections = SECTIONS;
  mainStage = viewChild<ElementRef<HTMLElement>>('mainStage');

  handleSectionChange(id: SectionType) {
    this.activeSection.set(id);
    // Smoothly reset scroll position to top whenever changing sections
    setTimeout(() => {
      const el = this.mainStage()?.nativeElement;
      if (el) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 10);
  }

  // Keyboard navigation shortcuts (1-6 keys for switching tabs)
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Avoid capturing keyboard shortcuts if typing inside an input or textarea
    const target = event.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }

    const keyIndex = parseInt(event.key, 10);
    if (!isNaN(keyIndex) && keyIndex >= 1 && keyIndex <= this.sections.length) {
      const targetSection = this.sections[keyIndex - 1];
      if (targetSection) {
        this.handleSectionChange(targetSection.id);
      }
    }
  }
}
