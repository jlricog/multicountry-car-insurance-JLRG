# Technical Spec: US-03 Summary and Payment

## Goal
Display a complete quote summary, mask sensitive policyholder document numbers, present localized terms & conditions from Strapi, and execute a simulated payment with PDF/QR policy generation.

## Acceptance Criteria & Functional Rules
1. **Quote Summary Display**:
   - Shows policyholder details, vehicle info, chosen plan name, and final calculated price.
2. **Document Masking**:
   - Document number MUST be masked: e.g. `12345678-K` -> `1234****-K` or `1018293849` -> `1018****49`.
3. **Terms and Conditions**:
   - Text is dynamically loaded from Strapi based on country context.
   - Pay button remains DISABLED until user checks "I accept terms and conditions".
4. **Payment Submission & Double-Click Protection**:
   - Clicking "Pay" locks button and shows spinner to prevent duplicate payments.
   - Simulates API call with success/failure handling.
5. **Confirmation & PDF/QR Generation (Differentiator)**:
   - On success, displays a generated quote/policy number (e.g. `POL-CO-2026-94821`).
   - Offers an instant **Download Policy Summary (PDF)** button and displays a scannable **QR Code**.

## Technical Implementation
- Component: `Step3SummaryComponent` (Angular 21 Standalone).
- State: Finalized transaction status in `WizardStore`.
