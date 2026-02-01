import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1Hero } from './components/Scene1Hero';
import { Scene2Metrics } from './components/Scene2Metrics';
import { Scene3ClearStage } from './components/Scene3ClearStage';
import { Scene4Profiles } from './components/Scene4Profiles';
import { Scene5Plan } from './components/Scene5Plan';
import { colors } from './styles';

// SwimScore Meta Video - Main Composition
// Total Duration: 510 frames @ 30 FPS = 17 seconds
//
// Scene Breakdown:
// Scene 1: Hero Statement     (frames 0-50)      ~1.7s
// Scene 2: What We Measure    (frames 50-130)    ~2.7s
// Scene 3: Clear Stage        (frames 130-150)   ~0.7s
// Scene 4: Profile Cards      (frames 150-330)   ~6s (3 profiles × 2s each)
// Scene 5: Personalized Plans (frames 330-510)   ~6s (3 plans × 2s each)

export const SwimScoreVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Scene 1: Hero Statement */}
      <Sequence from={0} durationInFrames={50}>
        <Scene1Hero />
      </Sequence>

      {/* Scene 2: What We Measure - Metric Cards */}
      <Sequence from={50} durationInFrames={80}>
        <Scene2Metrics />
      </Sequence>

      {/* Scene 3: Clear the Stage */}
      <Sequence from={130} durationInFrames={20}>
        <Scene3ClearStage />
      </Sequence>

      {/* Scene 4: Profile Baseball Cards (3 profiles × 60 frames = 180 frames) */}
      <Sequence from={150} durationInFrames={180}>
        <Scene4Profiles />
      </Sequence>

      {/* Scene 5: Personalized Plans (3 plans × 60 frames = 180 frames) */}
      <Sequence from={330} durationInFrames={180}>
        <Scene5Plan />
      </Sequence>
    </AbsoluteFill>
  );
};
