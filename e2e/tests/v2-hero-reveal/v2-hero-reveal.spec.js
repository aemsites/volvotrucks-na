import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';

// Define your custom values
const url = '/e2e/v2-hero-reveal/v2-hero-reveal';
const newCountdownDate = '2030-01-01T11:00:00-00:00';
const newRevealDate = '2030-01-01T10:00:00-00:00';

function customiseResponseWithCustomSectionMetadataValues(body, customSectionMetadataValues) { 
  // Load HTML with cheerio
  const $ = cheerio.load(body);
  // Find the section-metadata div
  $('.section-metadata > div').each((_, el) => {
    const label = $(el).find('div').first().text().trim();
    const valueDiv = $(el).find('div').eq(1);

    // check if any label is the key of the customSectionMetadataValues and replace by the value
    if (customSectionMetadataValues.hasOwnProperty(label)) {
      valueDiv.text(customSectionMetadataValues[label]);
    }
  });
  // Send back the modified HTML
  return $.html();
}

function interceptRequest(page, customSectionMetadataValues = null) {  
  // Intercept request
  if (customSectionMetadataValues) {
    page.route(url, async (route, request) => {
      const response = await page.request.fetch(request);
      const body = await response.text();
      const modifiedBody = customiseResponseWithCustomSectionMetadataValues(body, customSectionMetadataValues);
      await route.fulfill({
        status: 200,
        headers: {
          ...response.headers(),
          'content-type': 'text/html',
        },
        body: modifiedBody,
      });
    });
  }
}

test.beforeEach(async ({ page }) => {
  await page.clock.pauseAt(new Date('2030-01-01T09:00:00-00:00'));

  const customSectionMetadataValues = {
    'Countdown date': newCountdownDate,
    'Reveal date': newRevealDate,
  };

  interceptRequest(page, customSectionMetadataValues);

  await page.goto(url);
});

test.describe('Check hero timer values on page', () => {
  test('Check timer text on pages', async ({ page }) => {
    const labels = page.locator('.v2-hero-reveal-wrapper .v2-hero__countdown-label');
        
    await expect(labels.nth(0)).toHaveText('days');
    await expect(labels.nth(1)).toHaveText('hours');
    await expect(labels.nth(2)).toHaveText('minutes');
    await expect(labels.nth(3)).toHaveText('seconds');
  });

  test('Check clock values on pages', async ({ page }) => {
    const time = page.locator('.v2-hero-reveal-wrapper .v2-hero__countdown-number');
    await page.clock.fastForward(5000);

    await expect(time.nth(0)).toHaveText('00');
    await expect(time.nth(1)).toHaveText('01');
    await expect(time.nth(2)).toHaveText('59');
    await expect(time.nth(3)).toHaveText('55');

    await page.clock.fastForward(4000);

    await expect(time.nth(0)).toHaveText('00');
    await expect(time.nth(1)).toHaveText('01');
    await expect(time.nth(2)).toHaveText('59');
    await expect(time.nth(3)).toHaveText('51');
  });
});

test.describe('V2 Hero Reveal', () => {
  test('should have the component in the page', async ({ page }) => {
    // Check if the component is present by adding 2:00:01 to the clock to go past the reveal date
    await page.clock.fastForward(7200001);
    const heading = page.locator('.v2-hero-reveal-wrapper .v2-hero__title');
    const link = page.locator('.v2-hero-reveal-wrapper .v2-hero a');
    const image = page.locator('.v2-hero-reveal-wrapper img');

    await expect(heading).toHaveText('VOLVO I-TORQUE After Reveal text');
    await expect(link).toHaveAttribute('href', 'https://www.youtube.com/embed/D-DbrC4Jp08?color=white&rel=0&playsinline=1&enablejsapi=1&autoplay=1');
    await expect(link).toHaveText('Watch Now');
    await expect(image).toHaveAttribute('src', './media_1d490182ae8f4d283e12aa81005990780a7c7da81.jpg?width=750&format=jpg&optimize=medium');
  
  });

  test('should have the PRE reveal content', async ({ page }) => {
    const heading = page.locator('.v2-hero-reveal-wrapper .v2-hero__title');
    const link = page.locator('.v2-hero-reveal-wrapper .v2-hero a');
    const image = page.locator('.v2-hero-reveal-wrapper img');

    await expect(heading).toHaveText('VOLVO I-TORQUE Pre Reveal text');
    await expect(link).toHaveAttribute('href', '/block-library/blocks/v2-hero-reveal');
    await expect(link).toHaveText('Go to Event');
    await expect(image).toHaveAttribute('src', './media_1ecec526fc4ecc1673d9c14e6c0536e52107f1f23.jpg?width=750&format=jpg&optimize=medium');
  });
});