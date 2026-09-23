// Vertical-slice target block. See block.json for the parameter schema.
//
// This is deliberately a stub, not a finished component. First task for
// Claude Code on the web: wire a matter.js Engine, a body launched at
// (angleDegrees, initialVelocity) under `gravity`, and drive the
// simulation frame-by-frame from Remotion's useCurrentFrame() so the
// animation renders deterministically (matter.js's own real-time clock
// must NOT be used directly — step it manually per frame).
//
// Success criterion for this file: render an 8-second MP4 of a single
// projectile arc with an optional trailing trajectory line, matching
// the parameters in block.json.

import { useCurrentFrame, useVideoConfig } from 'remotion';

export interface ProjectileMotionProps {
  angleDegrees: number;
  initialVelocity: number;
  gravity: number;
  showTrajectory: boolean;
}

export const ProjectileMotion: React.FC<ProjectileMotionProps> = ({
  angleDegrees,
  initialVelocity,
  gravity,
  showTrajectory,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TODO: initialize a matter.js Engine + single Body here, step it
  // deterministically for `frame / fps` seconds of simulated time,
  // and render its position each frame. Do not use matter.js's
  // Runner (real-time) — Remotion needs frame-exact determinism.

  return null;
};
