---
name: remotion
description: Create videos programmatically with React. Reels, ads, carousels, explainers -- all code-driven. 30+ rule files for animations, transitions, timing, captions.
user-invocable: true
tools: [write, shell]
---

# Remotion Skill

This skill enables programmatic video creation using React and Remotion, perfect for social media content, ads, and animated explainers.

## Core Capabilities

**Video Formats:** MP4, GIF, PNG sequence, ProRes, WebM

**Animations:** spring() physics-based motion, keyframes, easing functions, transitions

**Media:** Images, audio, fonts, 3D models, Lottie animations, charts, text overlays

**Export:** Batch rendering, concurrent rendering, custom codecs

## Animation Rules (30+)

**Entrance Animations:**
- Fade in (opacity 0 → 1)
- Slide in (transform translateX/Y)
- Scale up (transform scale 0 → 1)
- Rotate in (transform rotate)
- Bounce in (spring physics)

**Transition Animations:**
- Crossfade (opacity transition)
- Slide transition (position change)
- Zoom transition (scale change)
- Wipe transition (clip-path animation)
- Dissolve (blur + opacity)

**Timing Rules:**
- Entrance: 300-500ms
- Transition: 400-600ms
- Emphasis: 200-300ms
- Exit: 300-500ms
- Total video: 15-60 seconds

**Caption Rules:**
- Font size: 48px minimum for legibility
- Duration: 3 seconds minimum per caption
- Positioning: Bottom 20% of frame
- Background: Semi-transparent for contrast
- Animation: Fade in/out with content

## Common Patterns

**Social Media Reels:**
- 9:16 aspect ratio (1080x1920)
- 15-60 seconds duration
- Captions for sound-off viewing
- Trending music/audio
- Fast cuts and transitions

**Product Ads:**
- 16:9 aspect ratio (1920x1080)
- 30-60 seconds duration
- Problem → Solution → CTA flow
- Product showcase with animations
- Clear call-to-action at end

**Explainer Videos:**
- 16:9 aspect ratio
- 60-120 seconds duration
- Narrator voiceover
- Animated diagrams and charts
- Step-by-step progression

**Testimonial Videos:**
- 9:16 or 1:1 aspect ratio
- 15-30 seconds duration
- Quote text overlay
- Background music
- Brand watermark

## Remotion Setup

```bash
npm install remotion
npm install @remotion/cli
```

**Project Structure:**
```
src/
  videos/
    MyVideo.tsx
    components/
      Scene.tsx
      Caption.tsx
      Transition.tsx
  index.ts
```

**Basic Component:**
```tsx
import { Composition } from 'remotion';
import MyVideo from './videos/MyVideo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
```

## When to Use This Skill

- "Create an Instagram ad"
- "Build a video intro"
- "Make an animated explainer"
- "Generate testimonial videos"
- "Create social media reels"
- "Build animated product demos"

## Example: AyuraHealth Video

**Type:** Explainer video
**Duration:** 60 seconds
**Aspect Ratio:** 16:9
**Flow:** Problem (health confusion) → Solution (AyuraHealth AI) → Features (dosha quiz, guidance, diet charts) → CTA (Try free assessment)
**Music:** Calm, ambient wellness music
**Captions:** Key benefits and features
**Animation:** Smooth transitions, spring physics for emphasis

