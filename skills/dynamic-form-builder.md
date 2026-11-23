---
name: dynamic-form-builder
description: Skill for generating dynamic Angular Reactive Forms with Signals from Strapi JSON field configurations.
---

# Dynamic Form Builder Skill

## Overview
This skill provides reusable patterns to convert dynamic JSON form field definitions from Strapi 5 into strongly-typed Angular Reactive Forms (`FormGroup`, `FormControl`) with Signal integration.

## Field Schema Definition
```typescript
export interface StrapiFormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'checkbox';
  required: boolean;
  validationRegex?: string;
  min?: number;
  max?: number;
  errorMessage: string;
  helpText?: string;
  order: number;
  country: 'CO' | 'CL' | 'ALL';
  options?: { label: string; value: string }[];
}
```

## Mapping Engine Pattern
1. Sort fields by `order` property.
2. Filter fields by current `country` signal context.
3. Construct `FormControl` with appropriate `Validators`:
   - `Validators.required` if `field.required` is true.
   - `Validators.pattern(field.validationRegex)` if regex is present.
   - Custom age validator for birth date fields (policyholder must be legal age >= 18).
   - Custom vehicle year validator (max next year, min 20 years old).
4. Expose form values via Angular Signals for instant reactivity.
