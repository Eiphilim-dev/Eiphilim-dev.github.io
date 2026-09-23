import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { contactChannels } from '../../portfolioData';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-6 py-4 animate-content-fade">
      <!-- Title -->
      <div class="relative">
        <h2 class="font-heading text-3xl sm:text-4xl text-white uppercase inline-block pb-2 border-b-2 border-brand-cyan tracking-wide clip-section-title pr-16 bg-brand-royal/10">
          {{ t('contact.title') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        
        <!-- Left Column: Social nodes (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <div>
            <h3 class="font-heading text-sm text-white uppercase tracking-wider mb-2">
              {{ t('contact.channelGreet') }}
            </h3>
            <p class="text-white/70 text-xs sm:text-[13px] leading-relaxed font-light mb-4 text-[#A0AEC0]">
              {{ t('contact.channelSub') }}
            </p>
          </div>

          <div class="flex flex-col gap-3">
            @for (channel of channels; track channel.name; let cIdx = $index) {
              <div 
                class="bg-brand-dark/40 border border-brand-royal/20 p-4 rounded-xs flex items-center justify-between group hover:border-brand-cyan/30 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-brand-royal/20 text-brand-cyan border border-brand-royal/30 rounded-xs">
                    <!-- Icon -->
                    @if (channel.iconName.toLowerCase() === 'mail') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    } @else if (channel.iconName.toLowerCase() === 'github') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    } @else if (channel.iconName.toLowerCase() === 'linkedin') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    }
                  </div>
                  <div class="flex flex-col">
                    <span class="font-mono text-[9px] text-white/40 uppercase tracking-widest leading-none">
                      {{ channel.name }} //
                    </span>
                    <a 
                      [href]="channel.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="font-mono text-[13px] text-white hover:text-brand-cyan transition-colors font-medium mt-1 select-all"
                    >
                      {{ channel.value }}
                    </a>
                  </div>
                </div>

                <button
                  (click)="handleCopy(channel.value, cIdx)"
                  [attr.aria-label]="'Copy ' + channel.name + ' to clipboard'"
                  class="p-1.5 bg-black/40 text-white/50 hover:text-brand-cyan border border-white/5 hover:border-brand-cyan/20 rounded-xs transition-colors cursor-pointer outline-hidden border-none"
                >
                  @if (copiedIndex() === cIdx) {
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-brand-cyan"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  }
                </button>
              </div>
            }
          </div>

          <div class="mt-2 border border-brand-royal/10 bg-brand-royal/5 p-4 rounded-xs font-mono text-[11px] text-white/60 leading-relaxed">
            <span class="text-brand-cyan font-bold block mb-1">CONTRACT SPECIFICATIONS:</span>
            @if (lang() === 'it') {
              * Disponibile per contratti indipendenti o consulenze<br />
              * Standard di codice: Sistemi a compilazione rigorosa di livello 1<br />
              * Ambito di distribuzione primario: Architetture CDN globali
            } @else {
              * Independent/Consulting arrangements welcomed<br />
              * Code standards: Tier-1 strict compilation systems<br />
              * Primary deployment scope: Global CDN architecture
            }
          </div>
        </div>

        <!-- Right Column: Dynamic submission form (7 Cols) -->
        <div class="lg:col-span-7">
          <div class="bg-brand-dark/60 border border-brand-royal/20 p-5 rounded-xs clip-slant-card shadow-2xl relative">
            <div class="absolute top-0 right-0 py-0.5 px-3 bg-brand-royal text-white font-mono text-[8px] uppercase tracking-widest font-bold">
              TRANSMITTER_INTERFACE
            </div>

            @if (!submitted()) {
              <form [formGroup]="contactForm" (ngSubmit)="handleSubmit()" class="flex flex-col gap-4 mt-2">
                <div class="font-mono text-[9px] text-brand-cyan/60 uppercase tracking-wider mb-2">
                   Initialize query packet fields:
                </div>

                <!-- Input row 1 -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label for="name" class="font-mono text-[10px] text-white/50 uppercase">
                      {{ t('contact.formName') }} *
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      formControlName="name"
                      [placeholder]="lang() === 'it' ? 'es. Andrea Magri' : 'e.g. Robin Banks'"
                      class="bg-black/60 border border-brand-royal/30 text-white text-xs p-2.5 rounded-xs focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-hidden transition-colors"
                    />
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label for="email" class="font-mono text-[10px] text-white/50 uppercase">
                      {{ t('contact.formEmail') }} *
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      formControlName="email"
                      placeholder="e.g. generic@domain.com"
                      class="bg-black/60 border border-brand-royal/30 text-white text-xs p-2.5 rounded-xs focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-hidden transition-colors"
                    />
                  </div>
                </div>

                <!-- Input row 2 -->
                <div class="flex flex-col gap-1.5">
                  <label for="subject" class="font-mono text-[10px] text-white/50 uppercase">
                    {{ t('contact.formSubject') }}
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    formControlName="subject"
                    [placeholder]="lang() === 'it' ? 'es. Richiesta Consulenza Sviluppo Java' : 'e.g. Relational Analytics Consultation'"
                    class="bg-black/60 border border-brand-royal/30 text-white text-xs p-2.5 rounded-xs focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-hidden transition-colors"
                  />
                </div>

                <!-- Textarea -->
                <div class="flex flex-col gap-1.5">
                  <label for="message" class="font-mono text-[10px] text-white/50 uppercase">
                    {{ t('contact.formMessage') }} *
                    <span class="text-[9px] text-white/30 lowercase pl-1">(minimally 10 characters)</span>
                  </label>
                  <textarea 
                    id="message"
                    formControlName="message"
                    rows="4"
                    [placeholder]="lang() === 'it' ? 'Scrivi qui i dettagli del messaggio...' : 'Provide inquiry specifications here...'"
                    class="bg-black/60 border border-brand-royal/30 text-white text-xs p-2.5 rounded-xs resize-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-hidden transition-colors"
                  ></textarea>
                </div>

                <!-- Action button -->
                <div class="mt-2 text-right">
                  <button
                    type="submit"
                    [disabled]="isSubmitting() || contactForm.invalid"
                    class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-cyan hover:bg-brand-royal text-brand-deep hover:text-white disabled:bg-white/5 disabled:border-white/10 disabled:text-white/30 font-heading text-xs tracking-wider uppercase transition-all duration-300 transform skew-x-[-12deg] cursor-pointer outline-hidden shadow-md disabled:cursor-not-allowed border-none select-none"
                  >
                    <span class="inline-block transform skew-x-[12deg] font-bold font-mono">
                      {{ isSubmitting() ? t('contact.formSending') : t('contact.formSend') }}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transform skew-x-[12deg]"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </div>
              </form>
            } @else {
              <div 
                class="flex flex-col items-center justify-center py-10 text-center gap-3 mt-2"
              >
                <div class="w-12 h-12 bg-brand-cyan/20 text-brand-cyan border border-brand-cyan rounded-full flex items-center justify-center font-mono text-[18px]">
                  ✓
                </div>
                <h4 class="font-heading text-base text-white uppercase tracking-wider mt-2">
                  {{ lang() === 'it' ? "TRASMISSIONE COMPLETATA" : "TRANSMISSION COMPLETED" }}
                </h4>
                <div class="max-w-md font-mono text-[11px] text-white/60 leading-relaxed bg-black/40 border border-brand-royal/20 p-3 rounded-xs flex flex-col gap-1 mb-4">
                  <span>PACKET_SENDER // {{ contactForm.get('name')?.value }}</span>
                  <span>RETURN_ADR   // {{ contactForm.get('email')?.value }}</span>
                  <span>STATUS_CODE  // 202_ACCEPTED</span>
                </div>
                <p class="font-sans text-xs text-white/50 max-w-sm">
                  {{ lang() === 'it' 
                    ? "Inoltro completato con successo! Il messaggio è stato preparato. Puoi anche inviarlo direttamente con il tuo client email qui sotto:"
                    : "Transmission verified! Your enquiry is ready. You can also send it directly via your mail client below:" }}
                </p>
                <div class="flex flex-wrap items-center justify-center gap-3 mt-1">
                  <a 
                    [href]="getMailtoLink()"
                    class="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-cyan hover:bg-white text-brand-deep font-mono text-[10px] font-black uppercase tracking-wider rounded-xs transition-colors shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <span>{{ lang() === 'it' ? 'APRI NEL CLIENT EMAIL' : 'OPEN IN MAIL CLIENT' }}</span>
                  </a>
                  <button
                    (click)="resetForm()"
                    class="font-mono text-[10px] text-white/60 hover:text-brand-cyan uppercase outline-hidden cursor-pointer border border-white/10 px-3 py-2 rounded-xs bg-black/30"
                  >
                    // {{ lang() === 'it' ? 'NUOVO MESSAGGIO' : 'NEW MESSAGE' }}
                  </button>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class ContactSectionComponent {
  private langService = inject(LanguageService);

  copiedIndex = signal<number | null>(null);
  submitted = signal(false);
  isSubmitting = signal(false);

  channels = contactChannels;

  // Reactive Form Initialization
  contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    subject: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] })
  });

  t(key: string): string {
    return this.langService.t(key);
  }

  lang = computed(() => this.langService.language());

  handleCopy(text: string, index: number) {
    navigator.clipboard.writeText(text);
    this.copiedIndex.set(index);
    setTimeout(() => this.copiedIndex.set(null), 2000);
  }

  handleSubmit() {
    if (this.contactForm.invalid) return;

    // Securely trim inputs
    const name = this.contactForm.get('name')?.value?.trim() || '';
    const email = this.contactForm.get('email')?.value?.trim() || '';
    const subject = this.contactForm.get('subject')?.value?.trim() || '';
    const message = this.contactForm.get('message')?.value?.trim() || '';

    this.contactForm.patchValue({ name, email, subject, message }, { emitEvent: false });

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitted.set(true);
    }, 800);
  }

  getMailtoLink(): string {
    const name = this.contactForm.get('name')?.value || '';
    const email = this.contactForm.get('email')?.value || '';
    const rawSub = this.contactForm.get('subject')?.value || 'Portfolio Contact // Handshake Protocol';
    const rawMsg = this.contactForm.get('message')?.value || '';
    
    const subject = encodeURIComponent(`[Portfolio] ${rawSub}`);
    const body = encodeURIComponent(`Mittente / From: ${name}\nEmail: ${email}\n\nMessaggio / Message:\n${rawMsg}`);
    return `mailto:andreaeduard.magri391@gmail.com?subject=${subject}&body=${body}`;
  }

  resetForm() {
    this.contactForm.reset();
    this.submitted.set(false);
  }
}
