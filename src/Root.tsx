import React from 'react';
import { Composition } from 'remotion';
import { SwimScoreVideo } from './SwimScoreVideo';

// Video configuration
// Resolution: 1080 × 1920 (9:16 portrait for mobile/social)
// FPS: 30
// Duration: 240 frames (8 seconds)

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SwimScoreVideo"
        component={SwimScoreVideo}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
