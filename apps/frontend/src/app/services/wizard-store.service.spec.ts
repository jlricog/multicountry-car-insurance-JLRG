import { TestBed } from '@angular/core/testing';
import { WizardStoreService } from './wizard-store.service';
import { InsurancePlan } from '../models/insurance.models';

describe('WizardStoreService (Angular 21 Signals)', () => {
  let service: WizardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WizardStoreService]
    });
    service = TestBed.inject(WizardStoreService);
  });

  it('should initialize with Colombia (CO) as default country', () => {
    expect(service.currentCountryCode()).toBe('CO');
    expect(service.activeCountry().currency).toBe('COP');
    expect(service.currentStep()).toBe(1);
  });

  it('should reset wizard when switching country from CO to CL', () => {
    service.setStep(2);
    service.setCountry('CL');

    expect(service.currentCountryCode()).toBe('CL');
    expect(service.activeCountry().currency).toBe('CLP');
    expect(service.currentStep()).toBe(1);
    expect(service.formData()).toBeNull();
    expect(service.selectedPlan()).toBeNull();
  });

  it('should calculate risk score dynamically based on vehicle year', () => {
    service.saveStep1Data({
      fullName: 'Juan Perez',
      documentType: 'CC',
      documentNumber: '1018293849',
      birthDate: '1995-05-15',
      licensePlate: 'AAA123',
      vehicleYear: 2010, // Older vehicle (> 10 years)
      vehicleMake: 'Chevrolet'
    });

    expect(service.riskScore()).toBeLessThan(75);
  });

  it('should apply young driver surcharge (+15%) to calculated plan price', () => {
    service.saveStep1Data({
      fullName: 'Carlos Gomez',
      documentType: 'CC',
      documentNumber: '1018293849',
      birthDate: '2004-01-01', // Age 22 (< 25 years old)
      licensePlate: 'BBB456',
      vehicleYear: 2024,
      vehicleMake: 'Toyota'
    });

    const mockPlan: InsurancePlan = {
      id: 'plan-1',
      name: 'Plan Plus',
      description: 'Test Plan',
      basePrice: 1000000,
      currency: 'COP',
      country: 'CO',
      isRecommended: true,
      isActive: true,
      order: 1,
      coverages: ['Responsabilidad Civil'],
      benefits: ['Grúa']
    };

    service.selectPlan(mockPlan);

    // Expected 1,000,000 * 1.15 = 1,150,000
    expect(service.selectedPlan()?.calculatedPrice).toBe(1150000);
  });
});
