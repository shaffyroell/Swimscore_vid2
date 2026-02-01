import React from 'react';
import { Composition } from 'remotion';
import { SwimScoreVideo } from './SwimScoreVideo';

// Video configuration
// Resolution: 1080 × 1920 (9:16 portrait for mobile/social)
// FPS: 30
// Duration: 210 frames (7 seconds)

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SwimScoreVideo"
        component={SwimScoreVideo}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
