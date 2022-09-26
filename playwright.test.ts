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
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "home.png"
    );
    await (await findAllByRole("link", { name: "2 state machine" }))
      .first()
      .click();
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "two-state-initial.png"
    );
    await (await findByRole("button", { name: "Add to state count" })).click();
    await findByText("Count: 1");
    await findByText("Text: aa");
    await findByText("Change the current state of the machine: adding");
    await (await findByRole("button", { name: "Change current state" })).click();
    await findByText("Change the current state of the machine: subtracting");
    await (
      await findByRole("button", { name: "Subtract from state text" })
    ).click();
    await findByText("Count: 1");
    await findByText("Text: a");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "two-state-after.png"
    );
  });
});
