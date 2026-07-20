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
