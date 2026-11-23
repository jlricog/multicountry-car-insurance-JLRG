export type CountryCode = 'CO' | 'CL';

export interface Country {
  code: CountryCode;
  name: string;
  currency: string;
  symbol: string;
  flag: string;
}

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface StrapiFormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'checkbox';
  required: boolean;
  validationRegex?: string;
  min?: number;
  max?: number;
  order: number;
  country: CountryCode;
  helpText?: string;
  errorMessage: string;
  options?: FormFieldOption[];
}

export interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  calculatedPrice?: number;
  currency: string;
  country: CountryCode;
  isRecommended: boolean;
  isActive: boolean;
  order: number;
  coverages: string[];
  benefits: string[];
}

export interface TermsAndConditions {
  country: CountryCode;
  title: string;
  content: string;
}

export interface QuoteFormData {
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  licensePlate: string;
  vehicleYear: number;
  vehicleMake: string;
  [key: string]: any;
}

export interface QuoteTransaction {
  quoteNumber: string;
  country: Country;
  formData: QuoteFormData;
  selectedPlan: InsurancePlan;
  riskScore: number;
  timestamp: string;
  paymentStatus: 'SUCCESS' | 'FAILED' | 'PENDING';
}
