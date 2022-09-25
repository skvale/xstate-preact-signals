import { test as baseTest, expect } from "@playwright/test";
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures,
} from "@playwright-testing-library/test/fixture";

const test = baseTest.extend<TestingLibraryFixtures>(fixtures);

test.describe.parallel("Site", () => {
  test("shows machine content", async ({
    page,
    queries: { findAllByText, findByText, findByRole },
  }) => {
    await page.goto("/");
    await findAllByText("Home");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "home.png"
    );
    await (await findByRole("link", { name: "2 state machine" })).click();
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "two-state-initial.png"
    );
    await (await findByRole("button", { name: "Update state count" })).click();
    await findByText("Count: 1");
    await findByText("Text: aa");
    await (await findByRole("button", { name: "adding" })).click();
    await findByRole("button", { name: "subtracting" });
    await (await findByRole("button", { name: "Update state text" })).click();
    await findByText("Count: 1");
    await findByText("Text: a");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "two-state-after.png"
    );
  });
});
