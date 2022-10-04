import { test as baseTest, expect } from '@playwright/test';
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures,
} from '@playwright-testing-library/test/fixture';

const test = baseTest.extend<TestingLibraryFixtures>(fixtures);

test.describe('Site', () => {
  test('shows machine content', async ({ page, screen }) => {
    await page.goto('/');
    await screen.findAllByText('Home');
    await page.screenshot().then((screenshot) => {
      expect(screenshot).toMatchSnapshot('home.png');
    });

    await screen
      .findAllByRole('link', { name: '2 state machine' })
      .then((elements) => elements.first().click());
    await page.screenshot().then((screenshot) => {
      expect(screenshot).toMatchSnapshot('two-state-initial.png');
    });

    await screen
      .findByRole('button', { name: 'Add to state count' })
      .then((e) => e.click());
    await screen.findByText('Count: 1');
    await screen.findByText('Text: aa');
    await screen.findByText('Change the current state of the machine: adding');
    await screen
      .findByRole('button', { name: 'Change current state' })
      .then((e) => e.click());
    await screen.findByText(
      'Change the current state of the machine: subtracting'
    );
    await screen
      .findByRole('button', { name: 'Subtract from state text' })
      .then((e) => e.click());
    await screen.findByText('Count: 1');
    await screen.findByText('Text: a');
    await page.screenshot().then((screenshot) => {
      expect(screenshot).toMatchSnapshot('two-state-after.png');
    });
  });
});
