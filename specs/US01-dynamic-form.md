# Technical Spec: US-01 Policyholder and Vehicle Data Form

## Goal
Provide a dynamic wizard step 1 form that captures policyholder and vehicle data according to country-specific rules configured in Strapi.

## Acceptance Criteria & Functional Rules
1. **Country Context Selection**:
   - The user selects or lands on Colombia (`CO`) or Chile (`CL`).
   - Fields render dynamically sorted by their `order` property.
2. **Colombia Rules**:
   - Document Type: CC / CE.
   - License Plate regex: `^[A-Za-z]{3}[0-9]{3}$|^[A-Za-z]{3}[0-9]{2}[A-Za-z]{1}$` (e.g., AAA123 or AAA12A).
3. **Chile Rules**:
   - Document Type: RUT.
   - RUT regex: `^[0-9]{7,8}-[0-9kK]{1}$` (e.g., 12345678-K).
   - License Plate (Patente) regex: `^[A-Za-z]{2}[0-9]{4}$|^[A-Za-z]{4}[0-9]{2}$` (e.g., BBBB12).
4. **General Business Validations**:
   - Policyholder age must be >= 18 years (calculated from `birthDate`).
   - Vehicle year must be between 2005 and 2026.
5. **State Persistence**:
   - Navigating to Step 2 and back to Step 1 MUST preserve all previously entered form values.

## Technical Implementation
- Component: `Step1FormComponent` (Angular 21 Standalone).
- Form Engine: `ReactiveFormsModule` with dynamically generated `FormGroup`.
- Signal State: `WizardStore` signal holds current form data.
