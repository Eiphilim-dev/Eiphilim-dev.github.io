console.log('APPLICATION_INGRESS_START');
import './index.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection()
  ]
}).then(() => {
  console.log('[Azure Protocol] Core initialized successfully.');
}).catch((err) => {
  console.error('[Azure Protocol] Bootstrap Error:', err);
  const subText = document.getElementById('init-status-sub');
  const errBox = document.getElementById('init-error-details');
  if (subText) {
    subText.style.color = '#FF4D6D';
    subText.textContent = 'BOOTSTRAP FAILED: ' + (err?.message || err);
  }
  if (errBox) {
    errBox.style.display = 'block';
    errBox.textContent = 'BOOTSTRAP EXCEPTION:\n' + (err?.stack || String(err));
  }
});
