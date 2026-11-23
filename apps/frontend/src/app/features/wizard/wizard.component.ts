import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Step1FormComponent } from '../step1-form/step1-form.component';
import { Step2PlansComponent } from '../step2-plans/step2-plans.component';
import { Step3SummaryComponent } from '../step3-summary/step3-summary.component';
import { WizardStoreService } from '../../services/wizard-store.service';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    Step1FormComponent,
    Step2PlansComponent,
    Step3SummaryComponent
  ],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent {
  readonly store = inject(WizardStoreService);
  showAiWidget = signal<boolean>(false);
  aiResponse = signal<string>('');

  toggleWidget() {
    this.showAiWidget.set(!this.showAiWidget());
  }

  askAi(question: string) {
    if (question.includes('Diferencias')) {
      this.aiResponse.set(
        'En Colombia la póliza se cotiza en COP con Cédula/Placa. En Chile se cotiza en CLP con RUT/Patente y opción de deducible UF.'
      );
    } else {
      this.aiResponse.set(
        'El precio base de Strapi se ajusta en tiempo real con un recargo del 10% si el vehículo supera 10 años o 15% si el tomador es menor de 25 años.'
      );
    }
  }
}
