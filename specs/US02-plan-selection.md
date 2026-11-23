# Technical Spec: US-02 Insurance Plan Selection

## Goal
Display available insurance plans for the selected country, highlight recommended plans, apply price adjustment rules based on vehicle data, and allow selecting a single plan.

## Acceptance Criteria & Functional Rules
1. **Plan Filtering**:
   - Show only active (`isActive: true`) plans published for the current country (`COP` for Colombia, `CLP` for Chile).
   - Sort plans by `order` property.
2. **Recommended Plan Highlight**:
   - Plans with `isRecommended: true` MUST display a prominent visual badge and border accent.
3. **Price Calculation Rule**:
   - Base price from Strapi is dynamically adjusted:
     - Vehicle year <= 2015: +10% risk surcharge.
     - Policyholder age < 25: +15% young driver surcharge.
4. **Interactive Features (Differentiators)**:
   - **Risk Score Bar**: Visual indicator displaying recommended coverage score based on vehicle age.
   - **Side-by-Side Comparison**: Ability to select two plans to compare coverages side-by-side.
5. **Empty State**:
   - If no active plans exist for a country, display a friendly empty state message.

## Technical Implementation
- Component: `Step2PlansComponent` (Angular 21 Standalone).
- State: Selected plan stored in `WizardStore` signal.
