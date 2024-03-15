import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://es.wikipedia.org/wiki/Wikipedia:Portada');
  await page.getByRole('link', { name: 'Ver código fuente' }).click();
  await page.getByRole('link', { name: 'Acceder' }).click();
  await page.getByPlaceholder('Escribe tu nombre de usuario').click();
  await page.getByPlaceholder('Escribe tu nombre de usuario').fill('diego');
  await page.getByPlaceholder('Escribe tu contraseña').click();
  await page.getByPlaceholder('Escribe tu contraseña').fill('diego');
  await page.getByRole('button', { name: 'Acceder' }).click();
});