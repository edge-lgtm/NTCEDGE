import { test, expect } from '@playwright/test';

test.describe('NTC EDGE Portal Verification', () => {
  test('Home Page Visual Check', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/NTC EDGE Portal/);
    await page.screenshot({ path: 'screenshots/home.png', fullPage: true });
  });

  test('Services Page Content Check', async ({ page }) => {
    await page.goto('/services/');
    await expect(page.locator('h1')).toHaveText('NTC Services');
    // The memory mentions 4 official service categories.
    // 'Certificates', 'Permits and Licenses', 'Equipment / Registration Services', and 'Other Public Transactions'.
    await expect(page.locator('.card')).toHaveCount(4);
    await page.screenshot({ path: 'screenshots/services.png', fullPage: true });
  });

  test('Announcements Page Verification', async ({ page }) => {
    await page.goto('/announcements/');
    await expect(page.locator('h1')).toHaveText('Official Announcements');

    // Check if the new announcement is present
    const announcementTitle = 'National Telecommunications Commission Launches NTC EDGE: Advancing Digital Governance for a More Responsive Public Service';
    const announcementLink = page.locator(`a:has-text("${announcementTitle}")`).first();
    await expect(announcementLink).toBeVisible();

    // Navigate to the announcement
    await announcementLink.click();

    // Verify content requirements: 3 paragraphs, agency names, and official tagline
    const content = page.locator('article');
    await expect(content).toContainText('National Telecommunications Commission');
    await expect(content).toContainText('NTC EDGE');
    await expect(content).toContainText('Electronic Data Governance and Evaluation');
    await expect(content).toContainText('Bringing NTC services closer to you.');

    // Verify there are at least 3 paragraphs in the article
    const paragraphs = content.locator('p');
    await expect(paragraphs).toHaveCount(3);

    await page.screenshot({ path: 'screenshots/new-announcement.png', fullPage: true });
  });

  test('Apply Wizard Multi-step Navigation', async ({ page }) => {
    await page.goto('/apply/');

    // Step 1
    await expect(page.locator('#step-1 h3')).toHaveText('Select Digital Service');
    await page.selectOption('#service_type', 'radio-operator');
    await page.click('#next-btn');

    // Step 2
    await expect(page.locator('#step-2 h3')).toHaveText('Select Regional Office');
    await page.selectOption('#region_apply', 'NCR');
    await page.click('#next-btn');

    // Step 3
    await expect(page.locator('#step-3 h3')).toHaveText('Processing Mode');
    await page.click('#next-btn');

    // Step 4
    await expect(page.locator('#step-4 h3')).toHaveText('Applicant Details');
    await page.fill('#applicant_name', 'Test Applicant');
    await page.fill('#applicant_email', 'test@example.com');
    await page.click('#next-btn');

    // Step 5
    await expect(page.locator('#step-5 h3')).toHaveText('Upload Documents');
    await page.click('#next-btn');

    // Step 6
    await expect(page.locator('#step-6 h3')).toHaveText('Review Your Application');
    await page.click('#next-btn');

    // Step 7
    await expect(page.locator('#step-7 h3')).toHaveText('Terms and Conditions');
    await page.check('#terms-agree');
    await page.click('#next-btn');

    // Final Success Check
    await expect(page.locator('#success-modal')).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'screenshots/apply-success.png' });
  });

  test('Track Application Search', async ({ page }) => {
    await page.goto('/track/');
    await page.fill('input[placeholder="e.g. NTC-2024-08152"]', 'NTC-2024-08152');
    await page.click('button:has-text("Track Application")');
    await expect(page.locator('#track-result')).toBeVisible();
    await expect(page.locator('#track-result h2')).toHaveText('NTC-2024-08152');
    await page.screenshot({ path: 'screenshots/track-result.png' });
  });
});
