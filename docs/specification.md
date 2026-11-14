# Specification

The criteria below describe observable behavior in the current source. Discrepancies from the deployed audit are recorded in [Verification history](verification-history.md).

## Boot sequence

- [ ] On a fresh mount with Motion High, the overlay advances through six status messages and fills its progress bar to completion before revealing the page.
- [ ] Clicking the skip button dismisses the overlay. Its label mentions Esc, but the component has no keyboard handler.
- [ ] If reduced motion is already enabled when the boot effect runs, it calls the completion callback immediately.

## Hero

- [ ] The August 2026 Financial Matrix shows income, allocated burn, available liquidity and savings velocity. Fresh seed values are ₹95,000, ₹77,080, ₹17,920 and 18.9%, respectively.
- [ ] Explore Trajectory and Spending Universe link to their section anchors.
- [ ] The ambient canvas draws particles and pointer-following light. Reduced mode freezes particle drift and reduces the particle count.

## Scroll-driven trajectory

- [ ] The four steps are You Earned, You Spent, You Saved and Savings Rate. They use finance-store values on render.
- [ ] High mode pins the section and maps scroll progress to the active step. Pager buttons also select steps.
- [ ] Reduced mode skips pinning and leaves the pager available.
- [ ] The Savings Rate panel compares the calculated rate with a fixed 30% benchmark. The current delta formatting and narrative discrepancy remain open.

## Spending Universe

- [ ] The map displays one bubble per seeded budget category, sized by the square root of its spend relative to the largest category.
- [ ] Hover reveals spend and share information. Clicking a bubble opens its category detail and the return control restores the map.
- [ ] The detail view includes allocated and spent amounts, transaction count, largest transaction and frequent merchant. Trend and peak-day text are fixed demo values.

## VEYRA Score

- [ ] The section shows the computed score out of 100, the tier and four component metrics. On the current seed the calculation yields 73 and STABLE.
- [ ] Clicking a signal or pressure point toggles its explanation. Signal titles and most explanatory copy are authored content.

## Cash-Flow River

- [ ] The section shows store income and the four configured branches for essentials, lifestyle, wealth and liquid buffer.
- [ ] Clicking a branch toggles its detail. Branch amounts are fixed at ₹27,000, ₹19,040, ₹25,000 and ₹23,960 respectively.

## Insights

- [ ] Four cards cover weekend spending, micro-outflows, food budget pacing and recurring commitments, with a corresponding evidence panel.
- [ ] In High mode scroll progress drives card selection in a pinned section. Pager buttons select cards in either motion mode.
- [ ] Copy and evidence come from fixed fixtures.

## Financial Command / Add Transaction

- [ ] The command view shows the macro overview, day scrubber, category budget usage and category-filterable ledger.
- [ ] Changing the scrubber changes cumulative outflows by the day-of-month part of each transaction date.
- [ ] Add Transaction opens a form with title, merchant, amount and an existing category. The submit handler requires a title and numeric amount and defaults an empty merchant to the title.
- [ ] Commit Entry stamps the current UTC date, prepends the entry to the in-memory ledger, increments the matching budget's stored spend and closes the form. The current category selection is retained.
- [ ] When spending exceeds income, savings and the savings rate display zero.

## Story Recap

- [ ] The navbar and command view open the nine-slide August recap.
- [ ] Segment buttons select slides. Previous, Next and the arrow keys navigate within the slide bounds. Replay returns to the first slide, and the close controls and Escape close the recap.
- [ ] Income, spend, top budget category, savings and score read store data at render. Weekend uplift and the July comparison are fixed copy.

## Planned boundaries

This phase documents the current client-side demo. The August seed is synthetic. Locally added entries live for the current page session. Backend and durable storage, a public HTTP API, real bank data or integrations, and authentication are outside the current scope. Future improvements are listed in [Tasks](tasks.md).
