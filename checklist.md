# Checklist

- [x] Create a minimal Next.js sample project.
- [x] Implement the technical scroll interaction section.
- [x] Add responsive layout and reduced-motion handling.
- [x] Verify install/build commands.
- [x] Convert grouped step visuals into sequential image-text scenes.
- [x] Verify the updated sequential scroll build.
- [x] Add the adjusted main page hero with one-time typing overlay animation.
- [x] Add scroll-triggered fade-in animation to main sections.
- [x] Keep the technical section scroll interaction style in the main page flow.
- [x] Verify the animated main page build.
- [x] Switch the main page to Figma-first pixel matching.
- [x] Create replaceable SmartM2M image asset slots.
- [x] Verify at least 99% visual similarity against the Figma screenshot.
- [x] Apply the attached per-character text reveal effect to the hero headline.
- [x] Restore scroll-triggered fade-in for the full-page sections.
- [x] Verify the updated interaction build.
- [x] Strengthen scroll fade-in interaction.
- [x] Add delayed red 5px cursor follower.
- [x] Add technical section sticky scroll interaction with six image slots and three fixed text groups.
- [x] Restore the native mouse pointer and resize follower dot to 10px with 50% opacity.
- [x] Slow down technical scene transitions with long scroll hold intervals.
- [x] Adjust hero and technical typography closer to the Figma weight and size.
- [x] Restore only the technical section visual style toward the Figma reference.
- [x] Capture the local technical section for review before deployment.
- [x] Add the technical title icon box and bottom scroll/mouse cue.
- [x] Shorten the technical sticky scroll timing so each wheel step advances the cards.
- [x] Move the technical scroll cue back to the Figma-like independent bottom area.
- [x] Add full-page-like wheel snapping for each technical image scene.
- [x] Assetize the technical scroll mouse icon for replacement.
- [x] Match the technical scroll cue line and text styling to the Figma reference.
- [x] Reduce the technical scroll cue size against the Figma reference.
- [x] Add vertical motion to the technical mouse icon.
- [x] Compare the current local page against Figma node 1441:5486.
- [x] Apply the Figma node 1431:19835 core-results start view.
- [x] Verify the updated page with build and local visual capture.
- [x] Compare the history section against the current Figma reference.
- [x] Update the history section asset or placement to match Figma.
- [x] Compare only the hero section against the latest Figma reference.
- [x] Add a replaceable hero video layer with darken blend mode.
- [x] Verify hero typography color and weight against Figma.
- [x] Build, push to GitHub, and deploy to Vercel.
- [x] Rebuild the hero section as separated publishing layers instead of a full screenshot.
- [x] Keep the hero typing text visible after the reveal finishes.
- [x] Match the hero video frame to the Figma-sized visual area with darken blend mode.
- [x] Verify the rebuilt hero at the relaxed 97% similarity target.
- [x] Push the completed publishing pass and deploy it to Vercel.
- [x] Align the hero title font size with the Figma node 1431:19835 reference.
- [x] Match the hero left rail width and x position to the Figma reference.
- [x] Change the hero navigation from centered to left-aligned Figma spacing.
- [x] Recheck hero title font weight against the supplied current/Figma crops.
- [x] Change the hero title typing effect to dark text overlaying a persistent faint title layer.
- [x] Replace the history reference image with a structured accordion section.
- [x] Show only red-dot history items while collapsed.
- [x] Reveal black-dot history items with a soft section-level animation when expanded.
- [x] Keep history expansion scoped so only one range is open at a time.

## Next Work Plan

### Current design correction request

- [x] Reduce font sizes and weights in the affected sections closer to the Figma desktop reference.
- [x] Replace the rendered technical interaction with a static design-only publishing section.
- [x] Rebuild the result section as a static dark design block and remove the overlapped/blurred motion state.
- [x] Reposition the partner logos and correct their image size and spacing.
- [x] Rebuild the news section publishing to match the Figma card layout and spacing.
- [x] Replace the full-image footer render with DOM publishing, except for replaceable visual/logo assets.
- [x] Run `npm.cmd run build`.
- [x] Capture the updated desktop screen for review.

### News and footer 98% publishing correction

- [x] Pull Figma context for news node `1431:24893` and footer node `1431:24953`.
- [x] Download only individual Figma image/icon assets needed for news and footer, not full-section screenshots.
- [x] Match the news title, more button, card order, image crops, featured card, progress bar, and arrow controls.
- [x] Match the footer logo/line/TOP button, company address grid, solutions/services columns, contact row, and copyright.
- [x] Run `npm.cmd run build`.
- [x] Capture local review images for news/footer and compare visually against Figma.

### History source data replacement

- [x] Inspect all four history tabs on the source page.
- [x] Confirm that `strong` marks the red-dot featured items.
- [x] Replace the history data with every source-page year and item.
- [x] Render non-`strong` entries with black dots when expanded.
- [x] Run `npm.cmd run build`.
- [x] Commit the verified history data update.

### History accordion deployment verification

- [x] Reproduce the deployed accordion behavior across all four groups.
- [x] Identify the stale summarized production data as the missing-detail cause.
- [x] Verify open and close behavior for every group with the full data.
- [x] Deploy commit `6782e89` to Vercel production.
- [x] Confirm the production alias serves the updated history behavior.

### Sticky history collapse control

- [x] Keep the expanded group's collapse control visible while scrolling.
- [x] Stop the sticky control at the end of its history group.
- [x] Adjust the sticky offset for desktop and mobile headers.
- [x] Run `npm.cmd run build`.
- [x] Verify and deploy the production interaction.

### Figma gap review before continuing Part 1

- [ ] Re-baseline Part 1 against the latest Figma frame `1431:19835` at 1920x7786.
- [ ] Keep the review captures in `G:\내 드라이브\project\smartM2M\figma-gap-review`.
- [ ] Use `figma-1920-latest.png` as the visual source of truth for desktop static publishing.
- [ ] Use `vercel-1920-current.png` only as the current deployed-state comparison.
- [ ] Treat the previous Part 1 pass as incomplete until the differences below are resolved and reviewed.

#### Global layout differences

- [ ] Recheck total page height against Figma 7786px.
- [ ] Recheck section y positions against Figma: hero 0, technical 1285, result area after technical, history 3987, news 6245, footer 7061.
- [ ] Remove unintended scroll/fade states from the static review capture so all sections appear in their intended Figma-visible state.
- [ ] Verify that the left vertical rail remains aligned and visually continuous across the full page.
- [ ] Confirm each section's background treatment before detailed component work, especially dotted backgrounds, white gradients, dark result area, and footer background.

#### Hero differences

- [ ] Confirm the hero title default static state matches Figma, with dark headline text visible rather than a faded reveal frame.
- [ ] Recheck the hero object size, y position, and crop against the Figma screenshot.
- [ ] Recheck CTA pill position, width, color, and arrow placement.
- [ ] Recheck header logo size, navigation spacing, right contact/menu area, and left rail labels.
- [ ] Completion condition: the first 1285px of the deployed page should visually match the Figma hero without relying on an animation timing moment.

#### Technical section differences

- [ ] Restore the technical dashboard image visibility. The current deployed capture shows the main visual area almost blank compared with Figma.
- [ ] Match the technical dotted background density, origin, and section width.
- [ ] Match the technical title block position, icon, eyebrow, and `기술력` heading size.
- [ ] Match the dashboard frame size, shadow stack, x position, and y position.
- [ ] Match the right text block style with red icon, red highlighted title background, body text, and three tab buttons.
- [ ] Match the scroll cue position and size while keeping it static for Part 1.
- [ ] Completion condition: the technical section must look like the Figma static frame before reintroducing sticky scene transitions in Part 2.

#### Result and partner-logo differences

- [ ] Restore the result section as a dark section rather than the current washed-out gray blurred state.
- [ ] Match the result section top y position, height, rounded bottom corners, and dark background crop.
- [ ] Match the left title copy, body copy, and large ring visual placement.
- [ ] Match the result card column positions, card size, spacing, and visible card crop.
- [ ] Move the partner logo rows to the Figma position and spacing below the result section.
- [ ] Completion condition: result and partner logos should read as one continuous Figma block, not as a blurred transition state.

#### History differences

- [ ] Compare the current accordion DOM state against the Figma default visible state.
- [ ] Ensure the first history group opens by default if Figma shows the 2025~2024 details expanded.
- [ ] Match history container width, left year column, item line heights, dot colors, divider lines, and right `전체보기` button position.
- [ ] Match the white translucent group background and section padding.
- [ ] Completion condition: the deployed default history state should match the Figma default history state before adding interaction polish.

#### News differences

- [ ] Replace placeholder news thumbnails with the exact Figma news assets or updated exported crops.
- [ ] Match the news section title position, `SMARTM2M NEWS` eyebrow, `소식` heading, and `더보기` link.
- [ ] Match news card size, crop, horizontal offset, gap, and order.
- [ ] Fix the visible duplicate/right-edge overflow so the static frame matches the Figma composition.
- [ ] Match the progress bar width, active segment width, and arrow buttons.
- [ ] Completion condition: the news section should match Figma as a static carousel frame before adding carousel controls in Part 2.

#### Footer differences

- [ ] Recheck footer height against the latest Figma footer instance of 603px.
- [ ] Match logo opacity, horizontal divider, company columns, copy sizes, spacing, and top button position.
- [ ] Confirm footer is visible within the 7786px Figma frame without extra blank space.
- [ ] Completion condition: footer must align with the Figma bottom frame and not appear as a stale cropped reference.

#### Part 1 revised completion gate

- [ ] Run `npm.cmd run build`.
- [ ] Capture a fresh 1920x7786 deployed or local screenshot after fixes.
- [ ] Place the fixed screenshot beside the Figma reference in `G:\내 드라이브\project\smartM2M\figma-gap-review`.
- [ ] Complete Part 1 only when the user approves the desktop static match and says to proceed to interaction work.

### Part 1. Figma static publishing

- [x] Confirm the latest Figma source URL, target node, or approved desktop reference capture.
- [x] Compare the current GitHub code against the confirmed Figma reference section by section.
- [x] Publish the desktop 1920px layout from hero to footer before adding new interaction work.
- [x] Match section order, spacing, typography scale, colors, imagery, buttons, cards, and visual hierarchy to the Figma reference.
- [x] Clearly separate temporary full-section image references from sections already converted to DOM publishing.
- [x] Run `npm.cmd run build` after static publishing adjustments.
- [x] Capture the local desktop page and prepare it for user review beside the Figma reference.
- [ ] Complete Part 1 only when the static desktop page is approved as close enough to Figma to start interaction work.

### Part 2. Desktop interaction pass

- [ ] Add or refine the hero text reveal interaction without changing the approved desktop layout.
- [ ] Add or refine the desktop cursor follower while preserving the native pointer.
- [ ] Add or refine scroll-triggered fade-in effects for major sections.
- [ ] Add or refine the technical section sticky scroll sequence in the intended scene order.
- [ ] Add or refine repeated motion for result cards and partner logo rows without making the motion visually noisy.
- [ ] Preserve `prefers-reduced-motion` behavior for motion-sensitive users.
- [ ] Recheck that interaction work did not noticeably shift the approved Figma-aligned layout.
- [ ] Run `npm.cmd run build` after interaction adjustments.
- [ ] Verify the desktop page in the browser with real scrolling and motion.
- [ ] Complete Part 2 only when desktop interactions work as intended and the design remains approved.

### Part 3. Responsive and final delivery

- [ ] Convert the approved desktop page into responsive layouts for desktop, tablet, and mobile.
- [ ] Verify at least the 1920px, 1440px, 1024px, 768px, and 390px viewport widths.
- [ ] Ensure text does not overflow buttons, cards, navigation, or section containers.
- [ ] Ensure mobile navigation, hero, technical section, result cards, partner logos, and history accordion remain usable.
- [ ] Simplify desktop-only interactions on mobile when needed instead of forcing the same sticky or wide-screen behavior.
- [ ] Ensure images and videos crop around their important visual subjects on all checked viewport widths.
- [ ] Preserve basic accessibility for labels, button states, alt text, and reduced-motion behavior.
- [ ] Run `npm.cmd run build` as the final verification.
- [ ] Create a meaningful commit after the final verified work unit.
- [ ] Complete Part 3 only when the page is usable across the target viewport widths and ready for deployment.
