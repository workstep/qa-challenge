import { screen } from "@testing-library/dom"
import db from "db"

beforeEach(async () => {
  await db.$reset()
})

test("uses jest-dom", () => {
  document.body.innerHTML = `
    <span data-testid="not-empty"><span data-testid="empty"></span></span>
    <div data-testid="visible">Visible Example</div>
  `

  expect(screen.queryByTestId("not-empty")).not.toBeEmptyDOMElement()
  expect(screen.getByText("Visible Example")).toBeVisible()
})
