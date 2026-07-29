This is the core hero effect: the flame image is hidden by default and only revealed in a circular
“spotlight” that follows the user’s mouse (or finger, on touch devices), using a CSS mask driven by
JS-updated CSS variables.
Build a Hero section in React + TypeScript with a mouse-following spotlight
reveal effect. There are two stacked full-bleed background images: a base image
(transparent-base.png) always visible, and a flame image (transparent-flame.png)
stacked on top of it but hidden everywhere except inside a soft circular spotlight
that follows the cursor.
Requirements:
- Use a ref on the flame layer div and set two CSS custom properties, --x and --y, to
track cursor position.
- Support both mousemove and touchmove/touchstart events (passive listeners) so it
works on mobile.
- Smooth the cursor position with linear interpolation (lerp) inside a
requestAnimationFrame loop --- do not snap directly to raw mouse coordinates, ease
toward them each frame (e.g. smooth += (mouse - smooth) * 0.1).
- Default the spotlight to the center of the viewport on load, before any mouse
movement occurs.
- Apply a CSS radial-gradient mask-image to the flame layer using the --x and --y
variables as the center, so only a soft-edged circle around the cursor reveals the
flame image underneath.
- Clean up all event listeners and cancel the animation frame on unmount.
- Preload both images before rendering the hero content, and show a pulsing
skeleton/placeholder until both are loaded, then fade the real content in with a CSS
opacity transition.

Matching CSS to hand off alongside the prompt
.hero-reveal-img {
position: absolute;
inset: 0;
background-size: cover;
background-position: center;
-webkit-mask-image: radial-gradient(
circle 220px at var(--x, 50%) var(--y, 50%),
black 0%, black 55%, transparent 100%
);
mask-image: radial-gradient(
circle 220px at var(--x, 50%) var(--y, 50%),
black 0%, black 55%, transparent 100%
);
transition: mask-position 0.05s linear;
}


Animate a headline so it reveals word-by-word on page load, instead of appearing all at
once.
Requirements:
- Take the full headline string and split it into individual words.
- Clear the heading element’s text content, then dynamically create a <span> for each
word and append it to the heading.
- Give each span a shared CSS class (e.g. word-reveal) that defines a fade-up keyframe
animation (opacity 0 -> 1, translateY 100% -> 0%).
- Stagger the animation by setting an increasing animation-delay per word (e.g. index
* 0.05s) so words cascade in left to right instead of all animating at the same time.
- Preserve the space after each word so line-wrapping stays natural.
- Run this as a one-time effect on mount (not on every re-render).
5.1 Matching CSS keyframes to hand off
.word-reveal {
display: inline-block;
opacity: 0;
transform: translateY(100%);
animation: wordReveal 0.6s ease forwards;
}
@keyframes wordReveal {
to {
opacity: 1;
transform: translateY(0);
}
}


Coding Agent Prompt — CTA Button Animation
The “View Resume” button has a hover state where a background fill slides in and the arrow circle
shifts, giving it a tactile, premium feel.
Build a CTA button component with a layered hover animation.
Requirements:
- Structure: an outer link/button wrapper containing three children --- a background
fill span, a text span, and a circular icon span with an arrow SVG inside.
- Default state: pill-shaped button, light background, dark text, circular arrow icon
on the right in an accent color.
- On hover: the background-fill span scales/slides in from one side to fully cover
the button using a CSS transform transition (not a background-color transition, so it
animates directionally rather than just fading).
- On hover: the text color inverts to stay readable against the new fill, and the
arrow circle nudges slightly (translateX) to suggest forward motion.
- Use CSS transitions with an ease-out timing function around 0.3s--0.4s, so it feels
8
snappy but not instant.
- Keep it accessible: use a real <a> or <button> element, not a div with an onClick.