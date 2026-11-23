import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStoreService } from '../../services/wizard-store.service';
import { CountryCode } from '../../models/insurance.models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly store = inject(WizardStoreService);

  selectCountry(code: CountryCode) {
    this.store.setCountry(code);
  }
}
