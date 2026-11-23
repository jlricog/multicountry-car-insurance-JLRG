# Strapi 5 Content Backend - Multi-Country Car Insurance

This directory contains the seed configuration and schemas for Strapi 5.

## Seed Data Structure
The dataset in `seed-data.json` includes:
- **Countries**: Colombia (`CO`) and Chile (`CL`).
- **Form Fields**: Configured per country with dynamic validation regexes, options, help text, and labels.
- **Plans**: Differentiated by currency (`COP` vs `CLP`), featuring highlighted "Recommended" flags and coverage items.
- **Terms & Conditions**: Localized texts per country.

## Public Security Strategy
- Public API permissions: **GET only** for `/api/form-fields`, `/api/plans`, `/api/terms-and-conditions`.
- No write permissions or admin tokens are exposed to the client application.
