# AGENTS.md - Global AI Context & System Instructions for FrontendDevSuraJLRG

## Project Overview
This repository contains `FrontendDevSuraJLRG`, a multi-country car insurance quoting application for Colombia and Chile.
- **Frontend**: Angular 21 (Standalone Components, Signals, `@if`/`@for`, Reactive Forms).
- **Backend / Content Management**: Strapi 5 (Headless CMS).
- **Containerization**: Docker & Docker Compose (`docker compose up`).

## Global Guidelines for AI Subagents
All AI agents, tools, and code generators working in this repository MUST strictly follow these rules:

### 1. Angular 21 Standards
- Use **Standalone Components ONLY**. `NgModules` are strictly prohibited.
- Use **Angular Signals** (`signal()`, `computed()`, `effect()`) for state management.
- Use **Built-in Control Flow** (`@if`, `@else`, `@for`, `@switch`). Never use `*ngIf` or `*ngFor`.
- Enforce strict TypeScript types. Never use `any`.

### 2. Strapi 5 Content Integration
- Strapi is the single source of truth for form fields, plans, coverages, terms & conditions, and country configuration.
- **Security Rule**: No Strapi write tokens are exposed to the browser. Only public read APIs (`find`, `findOne`) are allowed.
- Dynamic form fields MUST be generated dynamically from Strapi JSON specifications without requiring frontend deployments when fields change.

### 3. Multi-Country Strategy
- **Colombia (CO)**: Currency COP, Document Cédula (CC/CE), License Plate (Placa).
- **Chile (CL)**: Currency CLP, Document RUT, License Plate (Patente).
- The same application build serves both countries by switching the country context.

### 4. Spec-Driven Development (SDD) Workflow
1. User Story -> 2. Technical Spec (`specs/`) -> 3. ADR Record (`ADRs/`) -> 4. Code Implementation -> 5. Automated Tests -> 6. Code Review.
