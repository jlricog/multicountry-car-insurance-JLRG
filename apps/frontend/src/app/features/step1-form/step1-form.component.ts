import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { WizardStoreService } from '../../services/wizard-store.service';
import { StrapiDataService } from '../../services/strapi-data.service';
import { StrapiFormField } from '../../models/insurance.models';

@Component({
  selector: 'app-step1-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step1-form.component.html',
  styleUrl: './step1-form.component.css'
})
export class Step1FormComponent implements OnInit {
  readonly store = inject(WizardStoreService);
  private strapiService = inject(StrapiDataService);
  private fb = inject(FormBuilder);

  fields = signal<StrapiFormField[]>([]);
  isLoading = signal<boolean>(true);
  formGroup!: FormGroup;

  ngOnInit() {
    this.loadFieldsAndBuildForm();
  }

  loadFieldsAndBuildForm() {
    this.isLoading.set(true);
    const country = this.store.currentCountryCode();

    this.strapiService.getFormFields(country).subscribe(fields => {
      this.fields.set(fields);
      this.buildForm(fields);
      this.isLoading.set(false);
    });
  }

  private buildForm(fields: StrapiFormField[]) {
    const controlsConfig: { [key: string]: any } = {};
    const previousValues: Record<string, any> = (this.store.formData() as Record<string, any>) || {};

    fields.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.validationRegex) {
        validators.push(Validators.pattern(new RegExp(field.validationRegex)));
      }

      if (field.min !== undefined && field.type === 'number') {
        validators.push(Validators.min(field.min));
      }

      if (field.max !== undefined && field.type === 'number') {
        validators.push(Validators.max(field.max));
      }

      if (field.name === 'birthDate') {
        validators.push(this.legalAgeValidator);
      }

      const initialValue = previousValues[field.name] !== undefined ? previousValues[field.name] : '';
      controlsConfig[field.name] = [initialValue, validators];
    });

    this.formGroup = this.fb.group(controlsConfig);

    // Subscribe to form changes to update store in real time
    this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {
        this.store.saveStep1Data(val);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.formGroup.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(field: StrapiFormField): string {
    const control = this.formGroup.get(field.name);
    if (!control || !control.errors) return '';

    if (control.errors['legalAge']) {
      return field.errorMessage || 'Debes ser mayor de 18 años para cotizar';
    }

    return field.errorMessage || 'Campo inválido';
  }

  // Custom Legal Age Validator (>= 18 years)
  private legalAgeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 ? null : { legalAge: true };
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.store.saveStep1Data(this.formGroup.value);
      this.store.setStep(2);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
