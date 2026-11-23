import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country, StrapiFormField, InsurancePlan, TermsAndConditions, CountryCode } from '../models/insurance.models';

@Injectable({
  providedIn: 'root'
})
export class StrapiDataService {
  private seedData = {
    countries: [
      { code: 'CO' as CountryCode, name: 'Colombia', currency: 'COP', symbol: '$', flag: '🇨🇴' },
      { code: 'CL' as CountryCode, name: 'Chile', currency: 'CLP', symbol: '$', flag: '🇨🇱' }
    ],
    formFields: [
      {
        id: 'co-1',
        name: 'fullName',
        label: 'Nombre Completo del Tomador',
        type: 'text' as const,
        required: true,
        order: 1,
        country: 'CO' as CountryCode,
        helpText: 'Ingresa tu nombre tal como aparece en tu documento',
        errorMessage: 'El nombre es obligatorio'
      },
      {
        id: 'co-2',
        name: 'documentType',
        label: 'Tipo de Documento',
        type: 'select' as const,
        required: true,
        order: 2,
        country: 'CO' as CountryCode,
        options: [
          { label: 'Cédula de Ciudadanía (CC)', value: 'CC' },
          { label: 'Cédula de Extranjería (CE)', value: 'CE' }
        ],
        errorMessage: 'Selecciona un tipo de documento'
      },
      {
        id: 'co-3',
        name: 'documentNumber',
        label: 'Número de Cédula',
        type: 'text' as const,
        required: true,
        validationRegex: '^[0-9]{7,10}$',
        order: 3,
        country: 'CO' as CountryCode,
        helpText: 'Sin puntos ni guiones',
        errorMessage: 'Ingresa un número de cédula válido (7 a 10 dígitos)'
      },
      {
        id: 'co-4',
        name: 'birthDate',
        label: 'Fecha de Nacimiento',
        type: 'date' as const,
        required: true,
        order: 4,
        country: 'CO' as CountryCode,
        errorMessage: 'Debes ser mayor de edad (18 años) para cotizar'
      },
      {
        id: 'co-5',
        name: 'licensePlate',
        label: 'Placa del Vehículo',
        type: 'text' as const,
        required: true,
        validationRegex: '^[A-Za-z]{3}[0-9]{3}$|^[A-Za-z]{3}[0-9]{2}[A-Za-z]{1}$',
        order: 5,
        country: 'CO' as CountryCode,
        helpText: 'Ejemplo: AAA123 o AAA12A',
        errorMessage: 'Formato de placa colombiana inválido (Ej: AAA123)'
      },
      {
        id: 'co-6',
        name: 'vehicleYear',
        label: 'Año del Vehículo',
        type: 'number' as const,
        required: true,
        min: 2005,
        max: 2026,
        order: 6,
        country: 'CO' as CountryCode,
        helpText: 'Vehículos entre 2005 y 2026',
        errorMessage: 'El año debe estar entre 2005 y 2026'
      },
      {
        id: 'co-7',
        name: 'vehicleMake',
        label: 'Marca del Vehículo',
        type: 'select' as const,
        required: true,
        order: 7,
        country: 'CO' as CountryCode,
        options: [
          { label: 'Chevrolet', value: 'Chevrolet' },
          { label: 'Renault', value: 'Renault' },
          { label: 'Toyota', value: 'Toyota' },
          { label: 'Mazda', value: 'Mazda' },
          { label: 'Nissan', value: 'Nissan' }, 
          { label: 'Audi', value: 'Audi' },
          { label: 'Volvo', value: 'Volvo' },
          { label: 'BMW', value: 'BMW' },
          { label: 'Mercedes', value: 'Mercedes' },
          { label: 'Tesla', value: 'Tesla' },
          { label: 'Peugeot', value: 'Peugeot' },
          { label: 'Hyundai', value: 'Hyundai' },
          { label: 'Suzuki', value: 'Suzuki' },

        ],
        errorMessage: 'Selecciona la marca de tu vehículo'
      },
      {
        id: 'cl-1',
        name: 'fullName',
        label: 'Nombre Completo del Asegurado',
        type: 'text' as const,
        required: true,
        order: 1,
        country: 'CL' as CountryCode,
        helpText: 'Ingresa tu nombre completo',
        errorMessage: 'El nombre es obligatorio'
      },
      {
        id: 'cl-2',
        name: 'documentType',
        label: 'Tipo de Documento',
        type: 'select' as const,
        required: true,
        order: 2,
        country: 'CL' as CountryCode,
        options: [
          { label: 'RUT Chileno', value: 'RUT' }
        ],
        errorMessage: 'Selecciona el documento'
      },
      {
        id: 'cl-3',
        name: 'documentNumber',
        label: 'RUT',
        type: 'text' as const,
        required: true,
        validationRegex: '^[0-9]{7,8}-[0-9kK]{1}$',
        order: 3,
        country: 'CL' as CountryCode,
        helpText: 'Ejemplo: 12345678-K',
        errorMessage: 'Ingresa un RUT válido con guión y dígito verificador (Ej: 12345678-K)'
      },
      {
        id: 'cl-4',
        name: 'birthDate',
        label: 'Fecha de Nacimiento',
        type: 'date' as const,
        required: true,
        order: 4,
        country: 'CL' as CountryCode,
        errorMessage: 'Debes ser mayor de 18 años'
      },
      {
        id: 'cl-5',
        name: 'licensePlate',
        label: 'Patente del Vehículo',
        type: 'text' as const,
        required: true,
        validationRegex: '^[A-Za-z]{2}[0-9]{4}$|^[A-Za-z]{4}[0-9]{2}$',
        order: 5,
        country: 'CL' as CountryCode,
        helpText: 'Ejemplo: BB1234 o BBBB12',
        errorMessage: 'Formato de patente chilena inválido (Ej: BBBB12)'
      },
      {
        id: 'cl-6',
        name: 'vehicleYear',
        label: 'Año del Modelo',
        type: 'number' as const,
        required: true,
        min: 2005,
        max: 2026,
        order: 6,
        country: 'CL' as CountryCode,
        helpText: 'Modelos 2005 a 2026',
        errorMessage: 'El año debe estar entre 2005 y 2026'
      },
      {
        id: 'cl-7',
        name: 'vehicleMake',
        label: 'Marca del Auto',
        type: 'select' as const,
        required: true,
        order: 7,
        country: 'CL' as CountryCode,
        options: [
          { label: 'Hyundai', value: 'Hyundai' },
          { label: 'Suzuki', value: 'Suzuki' },
          { label: 'Peugeot', value: 'Peugeot' },
          { label: 'Chevrolet', value: 'Chevrolet' },
          { label: 'Renault', value: 'Renault' },
          { label: 'Toyota', value: 'Toyota' },
          { label: 'Mazda', value: 'Mazda' },
          { label: 'Nissan', value: 'Nissan' }, 
          { label: 'Audi', value: 'Audi' },
          { label: 'Volvo', value: 'Volvo' },
          { label: 'BMW', value: 'BMW' },
          { label: 'Mercedes', value: 'Mercedes' },
          { label: 'Tesla', value: 'Tesla' },
        ],
        errorMessage: 'Selecciona la marca'
      }
    ],
    plans: [
      {
        id: 'plan-co-1',
        name: 'Plan Básico Esencial',
        description: 'Protección fundamental contra daños a terceros y grúa de asistencia.',
        basePrice: 1200000,
        currency: 'COP',
        country: 'CO' as CountryCode,
        isRecommended: false,
        isActive: true,
        order: 1,
        coverages: ['Responsabilidad Civil 500M COP', 'Grúa 24/7 (hasta 3 eventos/año)', 'Asistencia Jurídica Básica'],
        benefits: ['Atención telefónica prioritaria']
      },
      {
        id: 'plan-co-2',
        name: 'Plan Plus Protección Total',
        description: 'Nuestra cobertura más elegida por conductores en Colombia.',
        basePrice: 2500000,
        currency: 'COP',
        country: 'CO' as CountryCode,
        isRecommended: true,
        isActive: true,
        order: 2,
        coverages: ['Responsabilidad Civil 1.500M COP', 'Pérdida Total por Daños o Hurto', 'Vehículo de Reemplazo (15 días)', 'Grúa y Cerrajería Ilimitada'],
        benefits: ['Conductor elegido 4 veces al año', 'Descuento en revisión técnico-mecánica']
      },
      {
        id: 'plan-co-3',
        name: 'Plan Premium VIP',
        description: 'Cobertura sin deducible y asistencia de lujo ante cualquier imprevisto.',
        basePrice: 4100000,
        currency: 'COP',
        country: 'CO' as CountryCode,
        isRecommended: false,
        isActive: true,
        order: 3,
        coverages: ['Responsabilidad Civil 3.000M COP', 'Daños Parciales Cero Deducible', 'Vehículo de Reemplazo Categoría SUV', 'Amparo de Llantas y Vidrios'],
        benefits: ['Conductor elegido ilimitado', 'Revisión preventiva a domicilio']
      },
      {
        id: 'plan-cl-1',
        name: 'Plan Esencial Urbano',
        description: 'La cobertura mínima obligatoria con asistencia en ruta.',
        basePrice: 350000,
        currency: 'CLP',
        country: 'CL' as CountryCode,
        isRecommended: false,
        isActive: true,
        order: 1,
        coverages: ['Responsabilidad Civil UF 500', 'Asistencia en Ruta 24h', 'Defensa Legal'],
        benefits: ['Remolque urbano hasta 50 km']
      },
      {
        id: 'plan-cl-2',
        name: 'Plan Full Protegido',
        description: 'Equilibrio perfecto de cobertura con bajo deducible para Chile.',
        basePrice: 680000,
        currency: 'CLP',
        country: 'CL' as CountryCode,
        isRecommended: true,
        isActive: true,
        order: 2,
        coverages: ['Pérdida Total / Parcial (Deducible UF 3)', 'Auto de Reemplazo 10 días', 'Cobertura Trasandina (Paso a Argentina)', 'Asistencia en Ruta Ilimitada'],
        benefits: ['Chofer de reemplazo 3 eventos', 'Revisión técnica a domicilio']
      },
      {
        id: 'plan-cl-3',
        name: 'Plan Elite Cero Deducible',
        description: 'Máxima tranquilidad sin pagar deducible en caso de siniestro.',
        basePrice: 990000,
        currency: 'CLP',
        country: 'CL' as CountryCode,
        isRecommended: false,
        isActive: true,
        order: 3,
        coverages: ['Todo Riesgo Cero Deducible (UF 0)', 'Auto de Reemplazo Gama Alta 20 días', 'Cobertura Robo Accesorios USD 2,000', 'Asistencia Internacional'],
        benefits: ['Chofer de reemplazo ilimitado', 'Servicio VIP de grúa preferencial']
      }
    ],
    termsAndConditions: [
      {
        country: 'CO' as CountryCode,
        title: 'Términos y Condiciones de Póliza Auto Colombia',
        content: 'Al aceptar esta propuesta, el tomador declara bajo gravedad de juramento que la información sobre la placa, documento de identidad y estado del vehículo es verídica. Póliza regulada por la Superintendencia Financiera de Colombia.'
      },
      {
        country: 'CL' as CountryCode,
        title: 'Términos y Condiciones de Seguro Automotriz Chile',
        content: 'El asegurado acepta que las coberturas contratadas rigen bajo el código de comercio chileno y normativa CMF (Comisión para el Mercado Financiero). El vehículo debe contar con revisión técnica al día.'
      }
    ]
  };

  getCountries(): Observable<Country[]> {
    return of(this.seedData.countries);
  }

  getFormFields(country: CountryCode): Observable<StrapiFormField[]> {
    const fields = this.seedData.formFields
      .filter(f => f.country === country)
      .sort((a, b) => a.order - b.order);
    return of(fields);
  }

  getPlans(country: CountryCode): Observable<InsurancePlan[]> {
    const plans = this.seedData.plans
      .filter(p => p.country === country && p.isActive)
      .sort((a, b) => a.order - b.order);
    return of(plans);
  }

  getTerms(country: CountryCode): Observable<TermsAndConditions | undefined> {
    const term = this.seedData.termsAndConditions.find(t => t.country === country);
    return of(term);
  }
}
