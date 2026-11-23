# ADR-001: Multi-Country Content Differentiation Strategy

## Status
Accepted

## Context
The business requires launching a single front-end application to sell digital car insurance in both Colombia and Chile.
Key requirements:
- Form fields, document types, license plate validations, currencies, insurance plans, and terms & conditions vary by country.
- Non-technical business users must be able to add, remove, or reorder fields and plans from Strapi without triggering code deployments.
- The same application build must serve both countries seamlessly.

## Alternatives Considered

### Option A: Separate Codebases / Builds per Country
- **Pros**: Independent deployments per country.
- **Cons**: High code duplication, hard to maintain shared wizard logic, requires redeployments for field changes.

### Option B: Hardcoded Internationalization (i18n) Files in Frontend
- **Pros**: Easy to implement in Angular.
- **Cons**: Requires developer deployment every time business wants to change a field, plan, or price. Violates core assessment requirement.

### Option C: Single Build with Dynamic Strapi 5 Content Filtering by Country Context (SELECTED)
- **Pros**:
  - Zero frontend code changes required when business updates fields or plans in Strapi.
  - A single Angular 21 application build serves both Colombia and Chile based on active country context.
  - Form rules, dynamic regexes, and plan offerings are fetched via public REST API endpoints filtered by country (`?country=CO` or `?country=CL`).
  - Highly scalable for adding new countries (e.g. Peru, Mexico) in the future.
- **Cons**: Requires initial setup of dynamic reactive form rendering engine in Angular.

## Decision
We adopt **Option C**: A single Angular 21 application build backed by Strapi 5, where all country-specific content (form fields, plans, currencies, legal terms) is requested dynamically based on a reactive `country` signal.

## Consequences
- The frontend implements a `DynamicFormComponent` that constructs Angular Reactive FormControls on-the-fly based on Strapi JSON.
- Strapi models include a mandatory `country` property (`CO` | `CL` | `ALL`).
- Public API security: All endpoints exposed to the browser are GET-only read routes.
