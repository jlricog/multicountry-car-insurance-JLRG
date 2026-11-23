import { Injectable, signal, computed } from '@angular/core';
import { CountryCode, Country, QuoteFormData, InsurancePlan, QuoteTransaction } from '../models/insurance.models';

@Injectable({
  providedIn: 'root'
})
export class WizardStoreService {
  // Signals state
  readonly currentCountryCode = signal<CountryCode>('CO');
  readonly currentStep = signal<number>(1);
  readonly formData = signal<QuoteFormData | null>(null);
  readonly selectedPlan = signal<InsurancePlan | null>(null);
  readonly isTermsAccepted = signal<boolean>(false);
  readonly isPaymentProcessing = signal<boolean>(false);
  readonly transactionResult = signal<QuoteTransaction | null>(null);
  readonly comparePlans = signal<InsurancePlan[]>([]);

  readonly activeCountry = computed<Country>(() => {
    return this.currentCountryCode() === 'CO'
      ? { code: 'CO', name: 'Colombia', currency: 'COP', symbol: '$', flag: '🇨🇴' }
      : { code: 'CL', name: 'Chile', currency: 'CLP', symbol: '$', flag: '🇨🇱' };
  });

  // Computed Risk Score (0-100) based on vehicle year and policyholder age
  readonly riskScore = computed<number>(() => {
    const data = this.formData();
    if (!data) return 50;

    let score = 75; // Baseline high protection score
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - (data.vehicleYear || currentYear);

    // Adjust score based on vehicle age
    if (vehicleAge > 10) score -= 20;
    else if (vehicleAge > 5) score -= 10;

    // Adjust score based on policyholder age
    if (data.birthDate) {
      const birth = new Date(data.birthDate);
      const age = currentYear - birth.getFullYear();
      if (age < 25) score -= 15;
    }

    return Math.max(30, Math.min(98, score));
  });

  setCountry(code: CountryCode) {
    if (this.currentCountryCode() !== code) {
      this.currentCountryCode.set(code);
      this.currentStep.set(1);
      this.formData.set(null);
      this.selectedPlan.set(null);
      this.transactionResult.set(null);
      this.comparePlans.set([]);
    }
  }

  setStep(step: number) {
    this.currentStep.set(step);
  }

  saveStep1Data(data: QuoteFormData) {
    this.formData.set(data);
  }

  selectPlan(plan: InsurancePlan) {
    // Calculate adjusted price based on risk rule
    const data = this.formData();
    let adjustmentFactor = 1.0;
    const currentYear = new Date().getFullYear();

    if (data) {
      if (data.vehicleYear && (currentYear - data.vehicleYear) > 10) {
        adjustmentFactor += 0.10; // +10% surcharge for older vehicles
      }
      if (data.birthDate) {
        const age = currentYear - new Date(data.birthDate).getFullYear();
        if (age < 25) {
          adjustmentFactor += 0.15; // +15% young driver surcharge
        }
      }
    }

    const calculatedPrice = Math.round(plan.basePrice * adjustmentFactor);
    this.selectedPlan.set({ ...plan, calculatedPrice });
  }

  togglePlanComparison(plan: InsurancePlan) {
    const current = this.comparePlans();
    const exists = current.some(p => p.id === plan.id);
    if (exists) {
      this.comparePlans.set(current.filter(p => p.id !== plan.id));
    } else if (current.length < 2) {
      this.comparePlans.set([...current, plan]);
    }
  }

  setTermsAccepted(accepted: boolean) {
    this.isTermsAccepted.set(accepted);
  }

  processSimulatedPayment(): Promise<QuoteTransaction> {
    this.isPaymentProcessing.set(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isPaymentProcessing.set(false);
        const country = this.activeCountry();
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const quoteNum = `POL-${country.code}-${new Date().getFullYear()}-${randomNum}`;

        const transaction: QuoteTransaction = {
          quoteNumber: quoteNum,
          country: country,
          formData: this.formData()!,
          selectedPlan: this.selectedPlan()!,
          riskScore: this.riskScore(),
          timestamp: new Date().toLocaleString(),
          paymentStatus: 'SUCCESS'
        };

        this.transactionResult.set(transaction);
        resolve(transaction);
      }, 1500);
    });
  }

  resetWizard() {
    this.currentStep.set(1);
    this.formData.set(null);
    this.selectedPlan.set(null);
    this.isTermsAccepted.set(false);
    this.transactionResult.set(null);
    this.comparePlans.set([]);
  }
}
