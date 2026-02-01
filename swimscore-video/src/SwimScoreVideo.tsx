import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1Hero } from './components/Scene1Hero';
import { Scene2Metrics } from './components/Scene2Metrics';
import { Scene3ClearStage } from './components/Scene3ClearStage';
import { Scene4Profiles } from './components/Scene4Profiles';
import { Scene5Plan } from './components/Scene5Plan';
import { colors } from './styles';

// SwimScore Meta Video - Main Composition
// Total Duration: 285 frames @ 30 FPS = 9.5 seconds
//
// Scene Breakdown:
// Scene 1: Hero Statement     (frames 0-45)
// Scene 2: What We Measure    (frames 45-105)
// Scene 3: Clear Stage        (frames 105-125)
// Scene 4: Profile Cards      (frames 125-205)
// Scene 5: Personalized Plan  (frames 205-285)

export const SwimScoreVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Scene 1: Hero Statement (frames 0-45) */}
      <Sequence from={0} durationInFrames={45}>
        <Scene1Hero />
      </Sequence>

      {/* Scene 2: What We Measure - Metric Cards (frames 45-105) */}
      <Sequence from={45} durationInFrames={60}>
        <Scene2Metrics />
      </Sequence>

      {/* Scene 3: Clear the Stage (frames 105-125) */}
      <Sequence from={105} durationInFrames={20}>
        <Scene3ClearStage />
      </Sequence>

      {/* Scene 4: Profile Baseball Cards (frames 125-205) */}
      <Sequence from={125} durationInFrames={80}>
        <Scene4Profiles />
      </Sequence>

      {/* Scene 5: Personalized Plan (frames 205-285) */}
      <Sequence from={205} durationInFrames={80}>
        <Scene5Plan />
      </Sequence>
    </AbsoluteFill>
  );
};
