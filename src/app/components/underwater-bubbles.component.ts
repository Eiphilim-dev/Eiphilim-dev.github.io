import { Component, ElementRef, AfterViewInit, OnDestroy, viewChild } from '@angular/core';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobbleSpeed: number;
  wobbleRange: number;
  wobbleOffset: number;
  opacity: number;
}

@Component({
  selector: 'app-underwater-bubbles',
  standalone: true,
  host: {
    class: 'absolute inset-0 pointer-events-none z-1 block w-full h-full overflow-hidden'
  },
  template: `
    <canvas 
      #bubbleCanvas
      class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
    ></canvas>
  `
})
export class UnderwaterBubblesComponent implements AfterViewInit, OnDestroy {
  canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('bubbleCanvas');
  
  private animationId?: number;
  private resizeObserver?: ResizeObserver;
  private bubbles: Bubble[] = [];
  private maxBubbles = 40;

  ngAfterViewInit() {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        let { width, height } = entry.contentRect;
        if (width <= 0) width = canvas.parentElement?.clientWidth || window.innerWidth;
        if (height <= 0) height = canvas.parentElement?.clientHeight || window.innerHeight;
        
        canvas.width = width;
        canvas.height = height;
        
        if (this.bubbles.length === 0 && width > 0 && height > 0) {
          this.generateBubbles(width, height);
        }
      }
    });

    if (canvas.parentElement) {
      this.resizeObserver.observe(canvas.parentElement);
    }

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    this.generateBubbles(canvas.width, canvas.height);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.bubbles.forEach((bubble) => {
        // Gracefully wrap or redistribute bubbles if canvas width is resized narrower
        if (bubble.x > canvas.width) {
          bubble.x = Math.random() * canvas.width;
        }
        bubble.y -= bubble.speed;
        bubble.wobbleOffset += bubble.wobbleSpeed;
        const currentX = bubble.x + Math.sin(bubble.wobbleOffset) * bubble.wobbleRange;

        ctx.save();
        ctx.strokeStyle = `rgba(0, 209, 255, ${bubble.opacity})`;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0, 209, 255, 0.3)';

        ctx.beginPath();
        ctx.arc(currentX, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.7})`;
        ctx.beginPath();
        ctx.arc(
          currentX - bubble.radius * 0.3, 
          bubble.y - bubble.radius * 0.3, 
          bubble.radius * 0.15, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();

        if (bubble.y < -30) {
          Object.assign(bubble, this.createSingleBubble(canvas.width, canvas.height, false));
        }
      });

      this.animationId = requestAnimationFrame(tick);
    };

    tick();
  }

  private generateBubbles(w: number, h: number) {
    this.bubbles = [];
    for (let i = 0; i < this.maxBubbles; i++) {
      this.bubbles.push(this.createSingleBubble(w, h, true));
    }
  }

  private createSingleBubble(w: number, h: number, randomY: boolean = false): Bubble {
    const radius = 2 + Math.random() * 8;
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 15,
      radius,
      speed: 0.35 + Math.random() * 0.9,
      wobbleSpeed: 0.01 + Math.random() * 0.03,
      wobbleRange: 1 + Math.random() * 6,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: 0.15 + Math.random() * 0.35
    };
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
