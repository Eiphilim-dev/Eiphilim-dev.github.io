import { Component, input, computed } from '@angular/core';
import { SectionType } from '../../types';

@Component({
  selector: 'app-protagonist-stage',
  standalone: true,
  template: `
    <div class="absolute right-0 bottom-0 top-0 w-full lg:w-[50%] h-full overflow-hidden select-none pointer-events-none z-[5]">
      <!-- Dynamic Water Sweep / Fluid wave backdrop -->
      <div
        class="absolute inset-0 bg-linear-to-bl from-brand-royal/15 via-brand-cyan/5 to-transparent skew-x-[-8deg] origin-right transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        [style.clipPath]="waveClipPath()"
        [style.opacity]="waveOpacity()"
      ></div>

      <!-- Floating Protagonist Graphic Frame -->
      <div
        class="absolute right-0 bottom-0 w-[280px] h-[380px] sm:w-[380px] sm:h-[500px] md:w-[460px] md:h-[600px] lg:w-[540px] lg:h-[720px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        [style.transform]="offsetsTransform()"
      >
        <!-- Layer 1: Cool background glow matching active state -->
        <div class="absolute inset-0 bg-radial-to-t from-brand-cyan/20 via-transparent to-transparent rounded-full blur-[100px] transform translate-y-24"></div>

        <!-- Layer 2: Main Image with a stylish cinematic scanline overlay -->
        <div class="relative w-full h-full clip-slant-card opacity-25 sm:opacity-40 lg:opacity-85 transition-opacity duration-300">
          <img
            src="./assets/images/p3_protagonist.png"
            alt="Azure Protocol Digital Protagonist"
            referrerpolicy="no-referrer"
            class="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(0,209,255,0.35)]"
          />

          <!-- Persona Style dynamic diagonal swipe lines across the avatar -->
          <div class="absolute inset-0 bg-linear-to-tr from-brand-deep/30 via-transparent to-brand-deep/10 pointer-events-none"></div>
          
          <div 
            class="absolute top-1/4 left-0 w-full h-[2px] bg-brand-cyan/60"
            style="animation: float-shard-3 8s ease-in-out infinite"
          ></div>

          <!-- Retro tech coordinate text overlapping the avatar -->
          <div class="absolute bottom-16 left-8 font-mono text-[8px] text-[#00D1FF]/40 tracking-[0.25em] leading-relaxed hidden sm:block">
            <span>AVATAR_RENDER_NODE // RUNNING</span><br />
            <span>SYS_COORD: 35.6895_N_139.6917_E</span><br />
            <span>METRIC_BOUND: ACTIVE_ENGAGEMENT</span>
          </div>
        </div>

        <!-- Layer 3: Stylized floating geometric glass fragments shifting in sync -->
        <div
          class="absolute w-[80px] h-[160px] bg-brand-cyan/15 border border-brand-cyan/30"
          style="clip-path: polygon(30% 0, 100% 20%, 70% 100%, 0 80%); left: 10%; top: 25%; animation: float-shard-1 6s ease-in-out infinite"
        ></div>

        <div
          class="absolute w-[120px] h-[90px] bg-brand-royal/20 border border-brand-cyan/25"
          style="clip-path: polygon(0 0, 90% 10%, 100% 90%, 10% 100%); right: 15%; bottom: 15%; animation: float-shard-2 8s ease-in-out infinite"
        ></div>
      </div>
    </div>
  `
})
export class ProtagonistStageComponent {
  activeSection = input.required<SectionType>();

  waveClipPath = computed(() => {
    // Dynamic transition mapping
    const sec = this.activeSection();
    return 'polygon(0% 0%, 100% 0%, 100% 100%, 35% 100%)';
  });

  waveOpacity = computed(() => {
    return 0.7;
  });

  offsetsTransform = computed(() => {
    const section = this.activeSection();
    let x = '10%';
    let y = '5%';
    let scale = 1.05;
    let rotate = -2;

    switch (section) {
      case 'home':
        x = '10%'; y = '5%'; scale = 1.05; rotate = -2;
        break;
      case 'about':
        x = '15%'; y = '0%'; scale = 0.95; rotate = 2;
        break;
      case 'skills':
        x = '5%'; y = '10%'; scale = 1.1; rotate = -4;
        break;
      case 'experience':
        x = '18%'; y = '-5%'; scale = 1.0; rotate = 0;
        break;
      case 'projects':
        x = '8%'; y = '8%'; scale = 1.08; rotate = -1;
        break;
      case 'contact':
        x = '12%'; y = '2%'; scale = 0.95; rotate = 3;
        break;
    }

    return `translate3d(${x}, ${y}, 0) scale(${scale}) rotate(${rotate}deg)`;
  });
}
