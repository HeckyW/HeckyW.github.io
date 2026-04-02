# Design System Document: The Scholarly Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Curated Archive**
This design system moves away from the "template" look of academic portfolios toward a high-end, editorial experience. It treats research not as a list of links, but as a curated collection of intellectual contributions. 

To achieve this, we break the rigid, centered grid. We embrace **intentional asymmetry**, where large serif display type creates a heavy visual anchor, balanced by vast expanses of `surface` (#F9F9F7) whitespace. Elements should feel like they are laid out on a physical desk—overlapping slightly, varying in depth, and prioritized through tonal shifts rather than lines.

---

## 2. Colors & Surface Philosophy
The palette is rooted in organic, paper-like tones. We avoid pure blacks and harsh grays to maintain a "warm scholarly" atmosphere.

*   **Primary (#635d5a):** A deep, warm stone used for primary actions and high-level headings.
*   **Secondary (#6b5d44):** A sophisticated bronze/beige for accents and secondary interaction points.
*   **Surface Hierarchy:**
    *   `surface` (#F9F9F7): The primary "paper" background.
    *   `surface-container-low` (#f2f4f2): Used for large structural blocks or sidebar backgrounds.
    *   `surface-container-highest` (#dee4e0): Used for interactive elements like hover states or "sticky" navigation.

**The "No-Line" Rule**
Traditional 1px borders are strictly prohibited for sectioning. To separate a research abstract from a publication list, use a background shift (e.g., placing a `surface-container-low` block against the `surface` background). Let the "edges" of the content be defined by the change in tone, not a drawn line.

**The Glass & Gradient Rule**
For floating navigation or "Quick View" modals, use a **Glassmorphism** approach:
*   Background: `surface` at 70% opacity.
*   Backdrop-blur: `12px`.
*   This ensures the researcher’s work remains visible beneath the UI, creating a sense of layered transparency.

---

## 3. Typography
The typographic pairing is a dialogue between the tradition of the archive (`Newsreader`) and the clarity of modern data (`Inter`).

*   **Display & Headlines (Newsreader):** Use these for titles and section headers. High-contrast serifs convey authority. Use `display-lg` (3.5rem) for hero statements with negative letter-spacing (-0.02em) to create a "custom-set" editorial feel.
*   **Body & Titles (Inter):** Use for long-form research descriptions. Inter’s neutral architecture provides a functional counterpoint to the emotive serif headings.
*   **Labels (Inter):** Reserved for metadata (e.g., "Published 2023", "DOI: 10.1..."). These should always be in `label-md` or `label-sm`, often in all-caps with increased letter-spacing (+0.05em) to mimic archival cataloging.

---

## 4. Elevation & Depth
We eschew the "material" look of floating shadows. Depth in this system is environmental and soft.

*   **Tonal Layering:** To highlight a "Featured Publication," do not use a shadow. Place the content in a `surface-container-lowest` (#ffffff) card nested within a `surface-container-low` (#f2f4f2) section. This creates a "lift" that feels like a sheet of paper resting on a darker desk.
*   **Ambient Shadows:** If a floating element (like a mobile menu) is required, use a signature ambient shadow:
    *   `box-shadow: 0 20px 40px rgba(45, 52, 50, 0.06);` (using a tinted `on-surface` color rather than black).
*   **The Ghost Border:** If a boundary is required for accessibility (e.g., input fields), use the `outline-variant` token at 15% opacity. It should be barely perceptible, serving only as a subtle guide.

---

## 5. Components

### Buttons
*   **Primary:** Background `primary` (#635d5a), text `on-primary` (#fff6f1). Use `rounded-md` (0.375rem). Avoid "pill" shapes; the slight corner radius feels more structured and academic.
*   **Tertiary (Editorial Link):** No background. Text in `secondary` (#6b5d44) with a `1px` underline that sits 4px below the baseline. On hover, the underline increases to `2px`.

### Cards & Research Items
*   **Rule:** Forbid divider lines between list items. 
*   **Layout:** Use `spacing-12` (4rem) between items. Use a `surface-container-low` vertical accent bar (2px wide) to the left of a "Selected Work" to denote importance without boxing it in.

### Inputs & Search
*   **Style:** Minimalist. Only a bottom border using `outline-variant` (#adb3b0) at 20% opacity. 
*   **Focus State:** The bottom border transitions to `primary` (#635d5a) with a subtle `surface-tint` glow.

### Additional Component: The "Citation Chip"
*   For DOI or Journal names. Use `secondary-container` (#f3e0c0) background with `on-secondary-container` (#5d5037) text. Use `rounded-sm` (0.125rem) to mimic the look of a library call-number tag.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Align your "Display" headers to the left, but shift your "Body" text to a 60% width container on the right. The tension creates sophistication.
*   **Use Massive Margins:** When in doubt, add more whitespace. Use `spacing-24` (8.5rem) between major sections.
*   **Layer Context:** Allow images (e.g., scan of a paper) to slightly overlap the edge of a `surface-container` block.

### Don't:
*   **Don't use 100% Black:** Never use `#000000`. Use `on-surface` (#2d3432) for all primary text to keep the "ink-on-paper" warmth.
*   **Don't use Box Shadows on Cards:** Use background color shifts instead. Shadows are only for floating functional UI (modals, menus).
*   **Don't use Center-Alignment for Body Text:** Academic writing is dense; left-alignment is required for readability. Only "Display" headers should ever be considered for centering, and even then, only sparingly.