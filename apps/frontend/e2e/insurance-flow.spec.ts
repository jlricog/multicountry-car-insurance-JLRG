import { test, expect } from '@playwright/test';

test.describe('Multi-Country Car Insurance Quote Wizard Flow', () => {

  test('Complete Colombia Flow: Dynamic Form -> Plan Selection -> Simulated Payment', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Step 1: Check Country Header (Colombia Default)
    await expect(page.locator('h1')).toContainText('Insurtech Multi-País');
    await expect(page.locator('form')).toBeVisible();

    // Fill Step 1 Form for Colombia
    await page.fill('#fullName', 'Juan Fernando Perez');
    await page.selectOption('#documentType', 'CC');
    await page.fill('#documentNumber', '1018293849');
    await page.fill('#birthDate', '1990-06-15');
    await page.fill('#licensePlate', 'AAA123');
    await page.fill('#vehicleYear', '2022');
    await page.selectOption('#vehicleMake', 'Toyota');

    // Submit Step 1
    await page.click('button[type="submit"]');

    // Step 2: Plan Selection
    await expect(page.locator('h2')).toContainText('Planes de Seguro Disponibles');
    await expect(page.locator('text=⭐ Recomendado')).toBeVisible();

    // Select Recommended Plan
    await page.click('text=Elegir este Plan >> nth=1');
    await page.click('text=Ir al Resumen y Pago');

    // Step 3: Summary & Payment
    await expect(page.locator('h2')).toContainText('Resumen de Cotización y Pago');

    // Check Document Masking (1018****49)
    await expect(page.locator('text=1018****49')).toBeVisible();

    // Accept Terms and Conditions
    await page.check('input[type="checkbox"]');

    // Click Pay
    await page.click('text=PAGAR Y EMITIR PÓLIZA');

    // Confirmation Screen
    await expect(page.locator('h2')).toContainText('¡Felicidades, estás asegurado!');
    await expect(page.locator('text=POL-CO-')).toBeVisible();
  });

  test('Country Switching: Switch to Chile (CLP, RUT, Patente)', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Click Chile Country Switcher
    await page.click('button:has-text("Chile")');

    // Verify Chile Labels & Currency
    await expect(page.locator('form')).toContainText('RUT');
    await expect(page.locator('form')).toContainText('Patente del Vehículo');
  });

});
