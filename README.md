# 🛡️ FrontendDevSuraJLRG - Multi-Country Car Insurance Quoting Application (Colombia 🇨🇴 & Chile 🇨🇱)

Digital car insurance quoting application built with **Angular 21+** (Standalone Components & Signals) and **Strapi 5** (Headless CMS), developed using an **Agentic AI Workflow**.

---

## 🚀 Quick Start (Single Command)

To run the entire application stack (Frontend + Strapi 5 Content Backend + Seed Data) using a single command:

```bash
docker compose up
```

Once running:
- **Frontend Application**: Open [http://localhost:4200](http://localhost:4200)
- **Strapi Content Backend**: Open [http://localhost:1337](http://localhost:1337)

---

## 🛠️ Architecture & Technology Stack

- **Frontend**: Angular 21 (`FrontendDevSuraJLRG`)
  - **100% Standalone Components** (Zero `NgModules`).
  - **Angular Signals** (`signal()`, `computed()`) for reactive state management.
  - **Native Control Flow** (`@if`, `@for`, `@switch`).
  - **Dynamic Reactive Form Engine**: Constructs forms on-the-fly based on JSON configurations fetched from Strapi.
- **Content Backend**: Strapi 5
  - Seed dataset pre-configured for Colombia (COP) and Chile (CLP).
  - Public API read permissions (`GET /api/form-fields`, `GET /api/plans`, `GET /api/terms-and-conditions`).
- **Security & Data Persistence**:
  - No write tokens or admin credentials exposed to the client bundle.
  - 100% synthetic/fictitious data; no real personal data or payment credentials used.
  - Pure frontend state persistence strategy with Signals; no external database required for user quotes.

---

## 🌟 Differentiator Features

1. **Smart Risk & Coverage Score Indicator (Step 1)**: Real-time risk score gauge (0-100) calculated dynamically based on policyholder age and vehicle model year.
2. **Side-by-Side Plan Comparison (Step 2)**: Interactive modal allowing users to compare 2 insurance plans side-by-side with coverage breakdowns.
3. **Digital Policy PDF Certificate & Scannable QR Code (Step 3)**: A downloadable A4-formatted PDF policy certificate and instant QR verification code for mobile users.
4. **Floating AI Assistant Widget**: Embedded quote assistant answering localized questions regarding coverage differences between Colombia and Chile.

---

## 📁 Repository Deliverables Directory Structure

```
FrontendDevSuraJLRG/
├── AGENTS.md                  # Global AI context & conventions (English)
├── FLOW.md                    # Agentic flow explanation & Mermaid diagram (English)
├── README.md                  # Project execution instructions & requirements (English)
├── docker-compose.yml         # Single-command orchestration
│
├── ADRs/                      # Architectural Decision Records
│   └── ADR-001-multi-country-content-strategy.md
├── specs/                     # Spec-Driven Development (SDD) specs
│   ├── US01-dynamic-form.md
│   ├── US02-plan-selection.md
│   └── US03-summary-payment.md
├── subagents/                 # AI Subagent definitions
│   ├── architect-agent.md
│   ├── spec-agent.md
│   ├── frontend-developer-agent.md
│   └── code-reviewer-agent.md
├── skills/                    # Custom AI skill
│   └── dynamic-form-builder.md
├── code-reviews/              # Code review evidence and security audit
│   └── code-review-audit.md
├── session-logs/              # Agent session logs and AI interactions
│   └── agent-sessions-export.md
└── apps/
    ├── frontend/              # Angular 21 Standalone & Signals app
    └── backend/               # Strapi 5 schemas and seed-data.json
```

---

## 📋 Requirements Compliance Matrix

| Requirement | Compliance Status | Implementation Details |
| :--- | :---: | :--- |
| **Angular 21 & Strapi 5** | ✅ Met | Built with Angular 21 Standalone, Signals, and Strapi 5 JSON models. |
| **Multi-Country Strategy** | ✅ Met | Single Angular build serving Colombia (COP/CC/Placa) and Chile (CLP/RUT/Patente). |
| **Dynamic Form Engine** | ✅ Met | Step 1 form generated dynamically from Strapi JSON with typed validators. |
| **Simulated Rating & Payment**| ✅ Met | Simulated risk surcharges (+10% old car, +15% young driver) and mock payment lock. |
| **Security & Public Role** | ✅ Met | No write tokens in browser; GET-only public API read permissions. |
| **Single Command Execution** | ✅ Met | Launches with `docker compose up`. |
| **Agentic Flow & Artifacts** | ✅ Met | `AGENTS.md`, `FLOW.md`, `subagents/`, `skills/`, `specs/`, `ADRs/`, `code-reviews/`, `session-logs/`. |
