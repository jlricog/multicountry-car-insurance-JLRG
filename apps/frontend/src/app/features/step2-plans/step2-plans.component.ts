import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStoreService } from '../../services/wizard-store.service';
import { StrapiDataService } from '../../services/strapi-data.service';
import { InsurancePlan } from '../../models/insurance.models';

@Component({
  selector: 'app-step2-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2-plans.component.html',
  styleUrl: './step2-plans.component.css'
})
export class Step2PlansComponent implements OnInit {
  readonly store = inject(WizardStoreService);
  private strapiService = inject(StrapiDataService);

  plans = signal<InsurancePlan[]>([]);
  isLoading = signal<boolean>(true);
  showComparisonModal = signal<boolean>(false);

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans() {
    this.isLoading.set(true);
    const country = this.store.currentCountryCode();
    this.strapiService.getPlans(country).subscribe(plans => {
      this.plans.set(plans);
      this.isLoading.set(false);
    });
  }

  getCalculatedPrice(plan: InsurancePlan): number {
    const data = this.store.formData();
    let adjustmentFactor = 1.0;
    const currentYear = new Date().getFullYear();

    if (data) {
      if (data.vehicleYear && (currentYear - data.vehicleYear) > 10) {
        adjustmentFactor += 0.10;
      }
      if (data.birthDate) {
        const age = currentYear - new Date(data.birthDate).getFullYear();
        if (age < 25) {
          adjustmentFactor += 0.15;
        }
      }
    }

    return Math.round(plan.basePrice * adjustmentFactor);
  }

  isSelected(plan: InsurancePlan): boolean {
    return this.store.selectedPlan()?.id === plan.id;
  }

  isComparing(plan: InsurancePlan): boolean {
    return this.store.comparePlans().some(p => p.id === plan.id);
  }

  onSelectPlan(plan: InsurancePlan) {
    this.store.selectPlan(plan);
  }

  goBack() {
    this.store.setStep(1);
  }

  goToStep3() {
    if (this.store.selectedPlan()) {
      this.store.setStep(3);
    }
  }
}
