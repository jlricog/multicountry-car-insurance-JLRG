import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WizardStoreService } from '../../services/wizard-store.service';
import { StrapiDataService } from '../../services/strapi-data.service';
import { TermsAndConditions } from '../../models/insurance.models';

@Component({
  selector: 'app-step3-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step3-summary.component.html',
  styleUrl: './step3-summary.component.css'
})
export class Step3SummaryComponent implements OnInit {
  readonly store = inject(WizardStoreService);
  private strapiService = inject(StrapiDataService);

  terms = signal<TermsAndConditions | undefined>(undefined);

  ngOnInit() {
    this.loadTerms();
  }

  loadTerms() {
    const country = this.store.currentCountryCode();
    this.strapiService.getTerms(country).subscribe(t => this.terms.set(t));
  }

  formData(): Record<string, any> | null {
    return this.store.formData() as Record<string, any> | null;
  }

  selectedPlan() {
    return this.store.selectedPlan();
  }

  // Mask document number (e.g. 12345678-K -> 1234****-K)
  getMaskedDocument(docNum?: string): string {
    if (!docNum) return '';
    if (docNum.length <= 4) return '****';

    const visibleStart = docNum.slice(0, 4);
    const visibleEnd = docNum.length > 8 ? docNum.slice(-2) : docNum.slice(-1);
    return `${visibleStart}****${visibleEnd}`;
  }

  goBackToForm() {
    this.store.setStep(1);
  }

  goBackToPlans() {
    this.store.setStep(2);
  }

  onPay(simulateFail = false) {
    if (this.store.isTermsAccepted() && !this.store.isPaymentProcessing()) {
      this.store.processSimulatedPayment(simulateFail).catch(() => {
        // Payment error state handled via store.paymentError signal
      });
    }
  }

  downloadPdfSummary(tx: any) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Poliza_${tx.quoteNumber}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 24px; background: #ffffff; }
          .policy-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px; }
          .logo { font-size: 22px; font-weight: 800; color: #1e3a8a; display: flex; align-items: center; gap: 8px; }
          .badge { background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; border: 1px solid #86efac; text-transform: uppercase; }
          .policy-title { font-size: 18px; font-weight: 800; text-align: center; margin-bottom: 24px; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
          .info-table th, .info-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
          .info-table th { background: #f8fafc; color: #475569; font-weight: 600; width: 38%; }
          .info-table td { color: #0f172a; font-weight: 500; }
          .price-box { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 12px; text-align: right; margin-bottom: 24px; }
          .price-title { font-size: 11px; color: #166534; font-weight: 700; text-transform: uppercase; tracking-wider: 1px; }
          .price-value { font-size: 24px; font-weight: 800; color: #15803d; margin-top: 4px; }
          .footer-section { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
          .qr-box { border: 1px solid #cbd5e1; padding: 12px; border-radius: 12px; text-align: center; background: #f8fafc; }
          .seal { border: 2px dashed #94a3b8; padding: 12px 24px; border-radius: 12px; color: #475569; font-size: 11px; text-align: center; font-weight: 700; background: #f8fafc; }
        </style>
      </head>
      <body>
        <div class="policy-header">
          <div class="logo">🛡️ Insurtech Multi-País</div>
          <div class="badge">✓ Póliza Emmitida & Vigente</div>
        </div>

        <div class="policy-title">Certificado Oficial de Póliza de Seguro Automotriz</div>

        <table class="info-table">
          <tr><th>Número de Póliza</th><td><strong>${tx.quoteNumber}</strong></td></tr>
          <tr><th>País de Cobertura</th><td>${tx.country.flag} ${tx.country.name} (${tx.country.code})</td></tr>
          <tr><th>Fecha de Emisión</th><td>${tx.timestamp}</td></tr>
          <tr><th>Tomador del Seguro</th><td>${tx.formData.fullName}</td></tr>
          <tr><th>Documento de Identidad</th><td>${tx.formData.documentType} ${tx.formData.documentNumber}</td></tr>
          <tr><th>Placa / Patente del Vehículo</th><td><strong style="color: #2563eb; font-size: 14px;">${tx.formData.licensePlate}</strong></td></tr>
          <tr><th>Marca y Año del Vehículo</th><td>${tx.formData.vehicleMake} (Modelo ${tx.formData.vehicleYear})</td></tr>
          <tr><th>Plan Contratado</th><td><strong>${tx.selectedPlan.name}</strong></td></tr>
        </table>

        <div class="price-box">
          <div class="price-title">Total Pagado (Simulado)</div>
          <div class="price-value">${tx.country.symbol} ${tx.selectedPlan.calculatedPrice.toLocaleString()} ${tx.selectedPlan.currency}</div>
        </div>

        <div class="footer-section">
          <div class="qr-box">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="#0f172a">
              <rect x="10" y="10" width="25" height="25"/>
              <rect x="65" y="10" width="25" height="25"/>
              <rect x="10" y="65" width="25" height="25"/>
              <rect x="45" y="45" width="10" height="10"/>
              <rect x="65" y="65" width="15" height="15"/>
            </svg>
            <div style="font-size: 9px; color: #64748b; margin-top: 4px; font-weight: 600;">Verificación Digital QR</div>
          </div>

          <div class="seal">
            SELLO DIGITAL DE EMISIÓN<br>
            <span style="font-size: 9px; font-weight: 400; color: #64748b;">Aprobado en entorno de pruebas Insurtech System</span>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
