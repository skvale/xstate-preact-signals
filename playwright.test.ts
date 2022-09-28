import { test as baseTest, expect } from "@playwright/test";
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures,
} from "@playwright-testing-library/test/fixture";

const test = baseTest.extend<TestingLibraryFixtures>(fixtures);

test.describe.parallel("Site", () => {
  test("shows machine content", async ({
    page,
    queries: { findAllByText, findByText, findByRole, findAllByRole },
  }) => {
    await page.goto("/");
    await findAllByText("Home");
    await page.screenshot({ animations: "disabled" }).then((screenshot) => {
      expect(screenshot).toMatchSnapshot("home.png");
    });

    await findAllByRole("link", { name: "2 state machine" }).then((elements) =>
      elements.first().click()
    );
    await page.screenshot({ animations: "disabled" }).then((screenshot) => {
      expect(screenshot).toMatchSnapshot("two-state-initial.png");
    });

    await findByRole("button", { name: "Add to state count" }).then((e) =>
      e.click()
    );
    await findByText("Count: 1");
    await findByText("Text: aa");
    await findByText("Change the current state of the machine: adding");
    await findByRole("button", { name: "Change current state" }).then((e) =>
      e.click()
    );
    await findByText("Change the current state of the machine: subtracting");
    await findByRole("button", { name: "Subtract from state text" }).then((e) =>
      e.click()
    );
    await findByText("Count: 1");
    await findByText("Text: a");
    await page.screenshot({ animations: "disabled" }).then((screenshot) => {
      expect(screenshot).toMatchSnapshot("two-state-after.png");
    });
  });
});
