# Advanced Dog Viewer — UI Redesign Plan

## Goal

Transform Advanced Dog Viewer from a functional demo into a polished, reviewer-ready product with a premium cinematic gallery aesthetic.

The redesign may significantly change the visual layout and component composition, but all existing application functionality must remain intact.

The final application should feel:

- premium;
- cinematic;
- elegant;
- minimal;
- responsive;
- deliberate;
- smooth and polished;
- suitable for a portfolio and Senior Frontend technical review.

Photography must be the primary visual element.

---

# Approved Visual Reference

The approved redesign direction is:

**Concept C — Cinematic Gallery**

Local visual reference:

`Docs/Advanced-Dog-Viewer.png`

This image is intentionally excluded from Git and is used only as a local implementation reference.

It is the primary visual target for the redesign.

The implementation should reproduce its overall:

- visual direction;
- composition;
- hierarchy;
- spacing;
- typography;
- colours;
- hero treatment;
- gallery treatment;
- Favorites presentation;
- desktop/mobile character;
- interaction style.

The goal is not pixel-perfect copying of every generated detail.

The goal is to reproduce the same design language while adapting it correctly to the real application.

## Key Visual Decisions

- dark cinematic full-screen experience;
- photography is the dominant visual element;
- large immersive Main Dog hero;
- breed information integrated directly into the hero;
- restrained warm-gold accent;
- serif typography for editorial/display titles;
- sans-serif typography for controls and utility UI;
- compact dark/translucent controls;
- filters integrated into the top command area on desktop;
- horizontal filmstrip-style dog gallery;
- clearly highlighted selected dog;
- Load More positioned directly below the gallery;
- Favorites accessed from the header rather than permanently occupying page width;
- desktop Favorites uses a right-side drawer;
- mobile Favorites uses a bottom-sheet/fullscreen treatment;
- mobile preserves the cinematic hero + horizontal filmstrip concept;
- subtle borders, shadows and gradients instead of conventional dashboard cards;
- motion should feel restrained and premium rather than decorative.

## Important: Real Data Only

The visual reference defines appearance and composition.

It does NOT override application functionality or available API data.

Do not implement information visible in a generated concept unless that information actually exists in the application.

In particular, do not invent:

- dog age;
- dog size;
- temperament;
- activity level;
- descriptive biography;
- breed characteristics;
- metadata not provided by the current application/API.

The redesigned UI must display only data actually available to the application.

If the visual reference conflicts with existing application behaviour, preserve the real behaviour and adapt the visual design around it.

---

# Core Principles

## Preserve Business Logic

The redesign must not unnecessarily modify:

- `src/hooks/*`
- `src/api/*`
- `src/interfaces/*`
- `src/utils/*`

Existing functionality must remain intact:

- breed filtering;
- sub-breed filtering;
- dog count selection;
- Reset Filters;
- Refresh;
- Load More;
- duplicate prevention;
- known totals for specific breeds;
- Main Dog selection;
- Previous / Next navigation;
- Favorites;
- Favorites persistence;
- Favorites sorting;
- Favorites removal;
- Clear Favorites;
- loading states;
- error states;
- disabled states;
- accessibility behaviour.

Presentation components may be reorganized where necessary.

Existing data contracts should remain stable unless there is a concrete technical reason to change them.

---

# Design Direction

The application should feel closer to a premium photography experience than a traditional dashboard.

Avoid making the interface look like:

- a generic admin dashboard;
- a UI-kit demo;
- a tutorial project;
- a collection of unrelated cards;
- an excessively animated showcase.

Controls and navigation should support the photography rather than compete with it.

---

# Visual System

The approved reference image is authoritative for the overall visual feeling.

The values below are implementation starting points and may be adjusted slightly to better match the reference.

## Backgrounds

- Canvas: `#0d0f12`
- Surface: `#15181d`
- Raised surface: `#1b1f25`
- Muted surface: `#22272e`

## Text

- Primary: `#f4f1eb`
- Muted: `#9ca3ad`
- Subdued: `#6f7782`

## Accent

Use a restrained warm editorial gold.

Starting values:

- Accent: `#d7ae63`
- Accent hover: `#f0c979`
- Destructive: `#ef7f78`

The accent must be used sparingly.

Avoid excessive:

- gold borders;
- glowing effects;
- gradients;
- decorative highlights.

## Borders

Prefer subtle translucent borders.

Example:

`rgb(255 255 255 / 9%)`

## Typography

Display typography:

- `Iowan Old Style`
- `Baskerville`
- `Georgia`
- serif fallback

UI typography:

- system sans-serif stack

Use serif primarily for editorial/display content.

Controls, filters and utility text should remain sans-serif.

Do not add external web fonts during the initial redesign stages.

## Spacing

Use a consistent spacing scale:

- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64

## Radius

Starting direction:

- controls: `10–12px`;
- panels: `16px`;
- hero: `20–24px`.

## Shadows

Avoid traditional Material-style card shadows.

Prefer:

- subtle borders;
- soft ambient shadows;
- restrained depth.

---

# Dependencies

The redesign should initially introduce only the following dependencies.

## Motion

Package:

`motion`

Use for:

- drawer transitions;
- hero transitions;
- gallery entry/layout transitions;
- Favorites add/remove/reorder transitions;
- selected-state microinteractions;
- controlled button feedback.

Use:

`MotionConfig reducedMotion="user"`

Do not use Motion for effects that can be implemented cleanly with normal CSS transitions.

## Lucide

Package:

`lucide-react`

Use as the common icon system.

Replace hand-written inline SVG icons where appropriate.

Preserve:

- accessible labels;
- titles where useful;
- disabled states;
- `aria-pressed`;
- keyboard behaviour.

## Do Not Add By Default

Do not introduce:

- Tailwind;
- Material UI;
- Chakra;
- Bootstrap;
- another animation library;
- generic UI kits;
- unnecessary headless component libraries.

Any additional dependency requires a concrete reason.

---

# Target Layout

## Desktop

Use a wide cinematic canvas.

Target maximum content width:

approximately `1440–1560px`.

### Header

Create a compact premium command bar.

Left:

- Advanced Dog Viewer branding / wordmark.

Middle:

- filtering controls where appropriate.

Right:

- Refresh;
- Favorites trigger;
- Favorites count.

The header must not visually dominate the page.

### Main Dog Hero

Main Dog is the primary visual scene.

Direction:

- large photography;
- image-first composition;
- subtle dark gradient only where required for readability;
- breed/title integrated into the image composition;
- Previous / Next as minimal controls;
- Favorite action clearly available without dominating the hero.

Only real application data may be displayed.

### Gallery

Use the approved horizontal filmstrip direction from the visual reference.

The gallery should feel connected to the hero rather than like a separate dashboard section.

Requirements:

- horizontal image strip;
- clear selected dog;
- restrained hover/focus treatment;
- touch/swipe friendly behaviour;
- responsive card widths.

### Load More

Load More remains part of the application.

It should be positioned naturally below the filmstrip.

For specific breed/sub-breed filters, preserve:

`Showing X of Y`

For All Breeds, do not display a fake total.

### Favorites

Remove the permanent Favorites sidebar.

Favorites open from the header.

Desktop:

- right-side drawer;
- approximately `400–440px`;
- backdrop;
- smooth entrance/exit;
- independent internal scrolling when necessary.

---

# Tablet

Approximately `768–1100px`.

Expected adaptations:

- header may wrap or use two levels;
- brand/actions remain compact;
- filters may move below primary header controls;
- hero remains visually dominant;
- filmstrip remains horizontally navigable;
- Favorites drawer uses approximately `min(440px, 92vw)`.

Tablet must be intentionally designed rather than treated as a compressed desktop layout.

---

# Mobile

Use approximately `16px` page padding.

## Header

Keep essential information accessible:

- branding;
- Refresh;
- Favorites.

## Filters

Filters may stack, wrap or use a compact mobile composition.

They must remain easy to operate with touch.

## Hero

Preserve the cinematic character of the approved reference.

Do not use a rigid viewport-height rule.

Prefer responsive image sizing using:

- `aspect-ratio`;
- sensible `min-height`;
- sensible `max-height`.

The hero should remain visually dominant without consuming the entire small-screen viewport.

## Gallery

Preserve the horizontal filmstrip concept on mobile.

Do not automatically convert the design into a generic two-column card grid.

Requirements:

- horizontal swipe/scroll;
- clear selected item;
- appropriate touch targets;
- visible relationship between gallery and hero.

## Load More

Load More remains below the gallery and must be comfortable to use on touch devices.

## Favorites

Favorites should become:

- bottom sheet where appropriate;
- near-fullscreen/fullscreen panel on constrained devices when necessary.

Requirements:

- visible Close control;
- backdrop interaction;
- Escape where keyboard input is available;
- correct focus behaviour;
- no double scrolling.

---

# Accessibility Requirements

Accessibility must not regress during the redesign.

Preserve or improve:

- semantic buttons;
- form labels;
- keyboard navigation;
- `aria-label`;
- `aria-pressed`;
- disabled states;
- `focus-visible`;
- sufficient contrast;
- practical touch targets around at least `44x44px`;
- Escape behaviour for overlays;
- focus restoration after drawer close.

Favorites drawer must use appropriate dialog semantics.

When the drawer opens:

- focus should move into the drawer appropriately.

When it closes:

- focus should return to the Favorites trigger.

Background scrolling must be prevented while the drawer is open.

Reduced-motion preferences must be respected.

---

# Animation Principles

Animations should feel expensive, smooth and restrained.

They should communicate:

- selection;
- hierarchy;
- state changes;
- spatial relationships.

Avoid animation purely for decoration.

## Main Dog

When changing the selected dog:

- smooth cross-fade;
- small restrained positional or scale transition if appropriate;
- no dramatic slide across the entire screen;
- controls remain stable.

## Gallery

Use restrained animation for:

- selection;
- new Load More items;
- layout changes where useful.

Do not heavily stagger large batches.

For a batch such as 50 dogs, the final cards must not appear seconds after the first ones.

## Favorites Drawer

Use:

- backdrop fade;
- drawer slide/fade;
- mobile sheet transition.

## Favorites List

Use layout animation for:

- adding;
- removing;
- sorting/reordering.

Other favorite items should smoothly move into their new positions.

## Favorite Action

Initial implementation:

- icon feedback;
- subtle scale/color response;
- Favorites count/badge feedback.

Do NOT implement a complex image fly-to-favorites animation during the initial redesign.

A shared-element/fly-to-target effect may be evaluated as a final optional polish stage.

## Controls

Use CSS transitions for ordinary:

- hover;
- focus;
- color;
- border;
- background changes.

Use Motion `whileTap` only where it provides useful tactile feedback.

---

# Component Strategy

Keep existing responsibilities where practical.

Existing presentation components include:

- `DogFilters`;
- `SearchableSelect`;
- `MainDog`;
- `DogGallery`;
- `Favorites`.

They may receive major presentation changes without moving business logic into them.

## FavoritesDrawer

Add:

`FavoritesDrawer`

Responsibilities:

- drawer presentation;
- open/close lifecycle;
- backdrop;
- responsive drawer/sheet behaviour;
- dialog semantics;
- focus handling;
- scroll locking;
- Motion entrance/exit.

It must NOT own Favorites business logic.

## Avoid Premature Abstractions

Do not create generic components such as:

- `Card`;
- `Button`;
- `Panel`;
- `Modal`;
- generic animation wrappers;

unless repeated real usage clearly justifies them during implementation.

---

# Implementation Strategy

The redesign must be implemented incrementally.

Do not redesign the entire application in one large change.

Each stage must be:

1. implemented;
2. visually reviewed;
3. functionally reviewed;
4. corrected if necessary;
5. checked;
6. committed;

before moving to the next stage.

The approved visual reference should be inspected before implementing each visually significant stage.

---

# Stage 1 — Visual Foundation and App Shell

## Goal

Establish the new design system and overall application structure without deeply redesigning content components.

## Tasks

- install `motion`;
- install `lucide-react`;
- add global dark design tokens;
- establish typography;
- establish spacing/radius/border conventions;
- add global `focus-visible` treatment;
- add reduced-motion baseline;
- add `MotionConfig reducedMotion="user"`;
- redesign the application shell;
- redesign the header;
- replace header inline SVG icons with Lucide where applicable;
- add Favorites trigger with count;
- improve desktop/tablet/mobile shell responsiveness.

## Do Not Yet

Do not deeply redesign:

- Main Dog;
- Gallery;
- Filters;
- Favorites list.

The application may look visually transitional after this stage.

That is acceptable.

---

# Stage 2 — Favorites Drawer

## Goal

Remove the permanent sidebar and move Favorites into a responsive overlay.

## Tasks

Create:

- `FavoritesDrawer.tsx`;
- `FavoritesDrawer.module.css`.

Implement:

- desktop right drawer;
- backdrop;
- mobile bottom sheet/fullscreen adaptation;
- Motion open/close;
- Close button;
- backdrop close;
- Escape close;
- focus movement;
- focus restoration;
- scroll locking;
- dialog semantics.

Move the existing Favorites presentation into the drawer without changing Favorites business logic.

## Verify

- select favorite;
- remove favorite;
- clear favorites;
- sort favorites;
- persistence;
- current favorite indication;
- Favorites count;
- drawer open/close.

---

# Stage 3 — Main Dog Hero

## Goal

Make the selected dog the visual centre of the product.

This is one of the most visually important redesign stages.

## Tasks

Redesign `MainDog` as the cinematic hero shown in the approved reference.

Include:

- large responsive image;
- breed/title treatment;
- subtle readable overlay where necessary;
- Favorite action;
- Previous;
- Next;
- disabled navigation states;
- premium icon controls using Lucide.

Add restrained selected-dog transitions using Motion.

## Requirements

- no layout jumps;
- navigation controls remain stable during image transitions;
- Favorite behaviour remains unchanged;
- responsive image sizing;
- correct mobile behaviour;
- only real application data is displayed.

Visually review this stage carefully before continuing.

---

# Stage 4 — Filters and Searchable Selects

## Goal

Replace the form/dashboard feeling with compact controls consistent with the cinematic design.

## Tasks

Redesign:

- `DogFilters`;
- `SearchableSelect`.

Preserve:

- breed selection;
- sub-breed selection;
- search;
- dog count;
- Reset Filters;
- disabled states;
- keyboard behaviour;
- Escape;
- outside click;
- accessibility.

Use Lucide for appropriate:

- chevrons;
- reset;
- utility icons.

Desktop should follow the integrated command-bar direction shown in the approved reference where practical.

Tablet/mobile may wrap or stack controls.

Avoid heavy panel/card styling.

---

# Stage 5 — Gallery and Load More

## Goal

Turn the dog list into the approved cinematic horizontal filmstrip.

## Tasks

Redesign `DogGallery`.

Implement:

- horizontal filmstrip;
- image-forward thumbnails;
- responsive thumbnail sizing;
- restrained selected state;
- hover/focus interaction;
- touch/swipe behaviour;
- smooth Load More appearance.

Preserve:

- current dog selection;
- `aria-pressed`;
- accumulated dogs;
- Load More behaviour;
- known total;
- `Showing X of Y`;
- loading;
- disabled state;
- duplicate prevention.

Motion must animate presentation only.

Never reorder or mutate the source dogs array for animation.

Avoid long stagger sequences.

---

# Stage 6 — Favorites Content Polish

## Goal

Make the contents of the Favorites drawer match the quality of the new application.

## Tasks

Redesign:

- Favorites header;
- count;
- sort controls;
- clear/reset controls;
- favorite items;
- empty state.

Add Motion layout animation for:

- add;
- remove;
- sorting/reorder.

Preserve all existing Favorites behaviour.

Other favorite items should smoothly reposition when the list changes.

---

# Stage 7 — Application States

## Goal

Make non-happy-path states feel intentionally designed.

Review and redesign:

- initial loading;
- breeds loading;
- query error;
- Load More error;
- empty gallery;
- empty Favorites;
- disabled navigation;
- disabled Load More;
- loading Load More;
- disabled filters where applicable.

Avoid large layout jumps between states.

Do not hide actionable errors behind animations.

---

# Stage 8 — Responsive and Accessibility Pass

## Goal

Treat responsiveness and accessibility as product requirements rather than final patches.

Review at minimum:

## Desktop

- wide desktop;
- regular laptop.

## Tablet

- landscape;
- portrait.

## Mobile

- narrow mobile;
- regular mobile;
- tall mobile;
- small-height viewport.

## Verify

- no horizontal overflow;
- no clipped controls;
- sensible hero dimensions;
- filmstrip usability;
- filter usability;
- drawer/sheet sizing;
- independent scrolling;
- keyboard navigation;
- `focus-visible`;
- dialog focus flow;
- Escape;
- backdrop behaviour;
- touch target sizes;
- color contrast;
- reduced motion.

---

# Stage 9 — Motion and Interaction Polish

## Goal

Review all animations together after the product layout is stable.

Tune:

- durations;
- easing/springs;
- hover feedback;
- tap feedback;
- hero transition;
- drawer transition;
- Favorites reorder;
- Gallery appearance;
- Favorites badge feedback.

Remove any animation that:

- feels slow;
- distracts from photography;
- delays interaction;
- causes layout instability;
- exists only to demonstrate Motion.

The UI should feel smooth rather than animated.

---

# Stage 10 — Optional Premium Effect

Only after all previous stages are complete and stable, evaluate whether a more advanced Favorite transition adds genuine value.

Possible experiment:

- subtle shared-element/fly-to-favorites feedback.

Requirements:

- must not complicate Favorites business logic;
- must work with the drawer closed;
- must not depend on fragile manual coordinate calculations where avoidable;
- must respect reduced motion;
- must not delay interaction;
- must degrade gracefully.

If the effect looks gimmicky or introduces significant complexity, do not ship it.

Stage 10 is optional.

---

# Final Verification

Before considering the redesign complete, verify that all functionality that existed before the redesign still works.

## Dogs

- initial load;
- All Breeds;
- breed filter;
- sub-breed filter;
- dog count;
- Reset Filters;
- Refresh;
- Load More;
- specific breed total;
- final partial batch;
- Load More exhaustion;
- no duplicate images.

## Selection

- Gallery selection;
- Main Dog;
- Previous;
- Next;
- first-item boundary;
- last-item boundary;
- selection reset after dataset changes.

## Favorites

- add;
- remove;
- select;
- clear;
- sorting;
- current favorite state;
- persistence after browser reload;
- count;
- drawer open/close.

## Async Behaviour

- initial loading;
- Load More loading;
- errors;
- disabled controls;
- stale Load More isolation after filter changes;
- stale Load More isolation after Refresh;
- parallel Load More protection.

## Responsive

- desktop;
- tablet;
- mobile;
- small viewport height;
- no horizontal overflow.

## Accessibility

- keyboard;
- `focus-visible`;
- Escape;
- drawer focus return;
- labels;
- pressed states;
- disabled states;
- reduced motion;
- touch targets.

---

# Development Rules

For every redesign stage:

1. Read this file before making changes.
2. Inspect `Docs/Advanced-Dog-Viewer.png` before visually significant changes.
3. Read the current relevant source files before editing.
4. Change only what the current stage requires.
5. Preserve existing behaviour unless this plan explicitly changes presentation.
6. Do not perform unrelated refactoring.
7. Do not change the data/business layer without a concrete reason.
8. Do not introduce abstractions only for hypothetical future use.
9. Keep animations restrained.
10. Prefer CSS for simple visual transitions.
11. Use Motion where lifecycle/layout animation provides real value.
12. Do not invent application data to match the visual reference.
13. Review the result visually before starting the next stage.

After implementation of each stage, project checks are run manually before committing.

Expected checks:

`pnpm format:check`

`pnpm lint`

`pnpm build`

Relevant manual UI scenarios for the current stage must also be tested.

Do not combine multiple redesign stages into one implementation step unless they are technically inseparable.

---

# Definition of Done

The redesign is complete when:

- the application matches the approved Cinematic Gallery direction;
- the application has a coherent premium visual identity;
- photography dominates the experience;
- desktop, tablet and mobile layouts feel intentionally designed;
- Favorites no longer consume permanent desktop space;
- the horizontal filmstrip works naturally on desktop and mobile;
- Load More remains clear and fully functional;
- interactions are smooth without feeling excessive;
- all existing functionality remains intact;
- accessibility has not regressed;
- there are no obvious responsive issues;
- loading/error/empty states match the visual system;
- animations respect reduced-motion preferences;
- no fake API data has been introduced;
- the code remains understandable and proportionate to the size of the application;
- the project feels appropriate to show during a Senior Frontend interview or portfolio review.
