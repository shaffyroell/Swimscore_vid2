import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1Input } from './components/Scene1Input';
import { Scene2Weighting } from './components/Scene2Weighting';
import { Scene3Aggregation } from './components/Scene3Aggregation';
import { Scene4Output } from './components/Scene4Output';
import { Scene5CTA } from './components/Scene5CTA';
import { colors } from './styles';

// SwimScore Meta Video - Main Composition
// Total Duration: 210 frames @ 30 FPS = 7 seconds
//
// Scene Breakdown:
// Scene 1: Input - Your Signals    (frames 0-60)     2s
// Scene 2: Weighting               (frames 60-105)   1.5s
// Scene 3: Aggregation             (frames 105-150)  1.5s
// Scene 4: Output - SwimScore      (frames 150-180)  1s
// Scene 5: CTA                     (frames 180-210)  1s

export const SwimScoreVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Scene 1: Input - Your fertility signals */}
      <Sequence from={0} durationInFrames={60}>
        <Scene1Input />
      </Sequence>

      {/* Scene 2: Weighting - Not all signals weigh the same */}
      <Sequence from={60} durationInFrames={45}>
        <Scene2Weighting />
      </Sequence>

      {/* Scene 3: Aggregation - Signals combine into score */}
      <Sequence from={105} durationInFrames={45}>
        <Scene3Aggregation />
      </Sequence>

      {/* Scene 4: Output - SwimScore reveal */}
      <Sequence from={150} durationInFrames={30}>
        <Scene4Output />
      </Sequence>

      {/* Scene 5: CTA - Get personalized plan */}
      <Sequence from={180} durationInFrames={30}>
        <Scene5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
