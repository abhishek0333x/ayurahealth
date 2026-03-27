---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with bold aesthetics, distinctive typography, and micro-interactions. No more generic AI slop.
user-invocable: true
tools: [read, write, edit, shell]
---

# Frontend Design Skill

This skill guides the creation of production-grade frontend interfaces that avoid generic patterns and deliver distinctive, memorable user experiences.

## Core Principles

1. **Bold Aesthetic Direction** — Choose a specific design movement (brutalist, editorial, luxury, retro-futuristic, minimalist, maximalist, etc.) and commit fully to it.

2. **Distinctive Typography** — Never use Arial or Inter. Select font pairings that reinforce your aesthetic:
   - Display font: Bold, distinctive, sets the tone
   - Body font: Readable, complements the display font
   - Example: Playfair Display + Inter, Cormorant Garamond + Lato, IBM Plex Mono + Space Grotesk

3. **Constrained Color Palettes** — Use 1 primary color + 1 accent color + neutrals (black, white, grays)
   - Primary: Main brand color, used sparingly for emphasis
   - Accent: Complementary color for CTAs, highlights
   - Neutrals: Backgrounds, text, borders

4. **Micro-interactions** — Every interactive element should have:
   - Hover states (color change, scale, shadow)
   - Focus states (visible ring or outline)
   - Active states (pressed appearance)
   - Transitions (smooth, 200-300ms)

5. **Skeleton Loading States** — Never use spinners. Use skeleton screens that match the layout of content being loaded.

## Implementation Checklist

- [ ] Aesthetic direction chosen and documented
- [ ] Typography system defined (display + body fonts)
- [ ] Color palette defined (1 primary + 1 accent + neutrals)
- [ ] All interactive elements have hover/focus/active states
- [ ] Loading states use skeleton screens, not spinners
- [ ] Responsive design tested on mobile, tablet, desktop
- [ ] Accessibility: contrast ratios meet WCAG AA standards
- [ ] No generic centered layouts; prefer asymmetric/sidebar/grid structures

## When to Use This Skill

- "Build me a landing page"
- "Design a dashboard"
- "Create a marketing site"
- "Redesign this interface to look more premium"
- "Make this look less generic"

## Example: AyuraHealth Frontend

**Aesthetic:** Editorial + Luxury (nature-inspired, refined)
**Typography:** Playfair Display (headers) + Lato (body)
**Colors:** Forest Green (#1a4d2e) + Gold (#d4a574) + Cream (#f5f1e8)
**Micro-interactions:** Smooth hover effects on buttons, cards, and links
**Loading:** Skeleton screens for health data sections

