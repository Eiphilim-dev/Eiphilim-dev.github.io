import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background-atmosphere',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'fixed inset-0 overflow-hidden pointer-events-none z-0 select-none'
  },
  template: `
    <!-- Ambient Base Glow -->
    <div class="absolute inset-0 bg-brand-deep"></div>

    <!-- Cinematic Heavy Slanted Structural Band -->
    <div 
      class="absolute -left-[20%] sm:-left-[10%] top-0 w-[60%] sm:w-[45%] h-full bg-linear-to-r from-brand-royal/12 via-brand-royal/4 to-transparent skew-x-[-12deg] origin-top"
    ></div>

    <div 
      class="absolute right-0 bottom-0 w-[50%] h-[60%] bg-radial-to-bl from-brand-royal/8 via-transparent to-transparent opacity-60"
    ></div>

    <!-- FLOATING GEOMETRIC SHARDS (Adapted for all screen-sizes) -->
    
    <!-- Shard 1 (Deep Left Accent - Responsive sizing) -->
    <div
      class="absolute w-[120px] h-[240px] sm:w-[200px] sm:h-[400px] bg-linear-to-b from-brand-cyan/12 to-transparent animate-shard-1"
      style="clip-path: polygon(20% 0%, 100% 40%, 80% 100%, 0% 80%); left: 8%; top: 8%; min-width: 100px;"
    ></div>

    <!-- Shard 2 (Deep Right Accent - Scaled down slightly on mobile to prevent clutter) -->
    <div
      class="absolute w-[180px] h-[80px] sm:w-[350px] sm:h-[150px] bg-linear-to-tr from-brand-royal/18 to-transparent animate-shard-2"
      style="clip-path: polygon(0% 20%, 90% 0%, 100% 80%, 10% 100%); right: 5%; bottom: 12%"
    ></div>

    <!-- Shard 3 (Center Ambient Cluster Accent) -->
    <div
      class="absolute w-[50px] h-[50px] sm:w-[90px] sm:h-[90px] bg-brand-cyan/15 animate-shard-3"
      style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); left: 35%; sm:left: 45%; bottom: 25%"
    ></div>

    <!-- Shard 4 (Foreground / Extra Depth-Layering, hidden on smaller screens for density optimization) -->
    <div
      class="hidden md:block absolute w-[140px] h-[280px] bg-linear-to-t from-brand-cyan/5 via-brand-royal/10 to-transparent animate-shard-1"
      style="clip-path: polygon(10% 25%, 90% 0%, 100% 75%, 20% 100%); right: 22%; top: 18%; animation-delay: -4s;"
    ></div>

    <!-- Floater 5 (Micro Tech Prism - Animates with shard-3 rotation but speeded up) -->
    <div
      class="absolute w-[30px] h-[30px] bg-brand-royal/40 animate-shard-3"
      style="clip-path: polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%); left: 15%; bottom: 50%; animation-duration: 9s; transform-origin: center;"
    ></div>

    <!-- Floating System-Spec Lines (Positioned safely, adaptive translation) -->
    <div class="absolute right-[-140px] sm:right-[-100px] top-[140px] sm:top-[180px] flex flex-col gap-2.5 opacity-15 sm:opacity-25 pointer-events-none">
      <div class="w-80 h-[2px] bg-brand-cyan"></div>
      <div class="w-96 h-[2px] bg-white ml-8 sm:ml-12"></div>
      <div class="w-72 h-[2px] bg-brand-royal"></div>
    </div>

    <!-- Technical Crosshair nodes providing tactical scale depth -->
    <div class="absolute left-6 top-6 sm:left-12 sm:top-12 flex items-center gap-1 opacity-20 text-brand-cyan font-mono text-[8px]">
      <span>[SYS_GRID]</span>
    </div>

    <!-- Grid Matrix Overlay (Clean futuristic telemetry touch) -->
    <div 
      class="absolute inset-0 bg-[linear-gradient(to_right,#1a4bcc06_1px,transparent_1px),linear-gradient(to_bottom,#1a4bcc08_1px,transparent_1px)] bg-[size:40px_40px] opacity-70"
    ></div>
  `
})
export class BackgroundAtmosphereComponent {}
