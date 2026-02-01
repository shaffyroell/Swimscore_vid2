import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1Hook } from './components/Scene1Hook';
import { Scene2Tension } from './components/Scene2Tension';
import { Scene3Reality } from './components/Scene3Reality';
import { Scene4Aggregation } from './components/Scene4Aggregation';
import { Scene5Brand } from './components/Scene5Brand';
import { Scene6CTA } from './components/Scene6CTA';
import { colors } from './styles';

// SwimScore TikTok Video - Main Composition
// Total Duration: 240 frames @ 30 FPS = 8 seconds
//
// Scene Breakdown:
// Scene 1: Hook             (frames 0-30)      1s    "It takes two."
// Scene 2: Tension          (frames 30-60)     1s    "Only one gets checked."
// Scene 3: Reality          (frames 60-120)    2s    Signal rows appear
// Scene 4: Aggregation      (frames 120-165)   1.5s  Rows converge, accent appears
// Scene 5: Brand            (frames 165-210)   1.5s  SwimScore™ reveal
// Scene 6: CTA              (frames 210-240)   1s    "Get personalized plan"

export const SwimScoreVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Scene 1: Hook - "It takes two." */}
      <Sequence from={0} durationInFrames={30}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Tension - "Only one gets checked." */}
      <Sequence from={30} durationInFrames={30}>
        <Scene2Tension />
      </Sequence>

      {/* Scene 3: Reality - Signal rows appear */}
      <Sequence from={60} durationInFrames={60}>
        <Scene3Reality />
      </Sequence>

      {/* Scene 4: Aggregation - Rows converge */}
      <Sequence from={120} durationInFrames={45}>
        <Scene4Aggregation />
      </Sequence>

      {/* Scene 5: Brand - SwimScore™ */}
      <Sequence from={165} durationInFrames={45}>
        <Scene5Brand />
      </Sequence>

      {/* Scene 6: CTA - Get personalized plan */}
      <Sequence from={210} durationInFrames={30}>
        <Scene6CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
