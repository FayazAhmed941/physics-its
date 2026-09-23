import Matter from 'matter-js';

// matter.js is unit-agnostic but its default solver tuning assumes
// roughly pixel-scale bodies moving at pixel-scale speeds. SI inputs
// (m/s, m/s^2) need converting into matter.js's space or motion looks
// wrong (too slow/fast) at typical video resolutions.
const PIXELS_PER_METER = 20;

export interface SimFrame {
  x: number; // pixels, scene-local, origin at launch point
  y: number; // pixels, positive = downward (canvas convention)
}

export interface ProjectileParams {
  angleDegrees: number;
  initialVelocity: number; // m/s
  gravity: number; // m/s^2
}

/**
 * Precomputes the full trajectory once, start to finish, outside any
 * per-frame render call. Remotion may render frames out of order or in
 * parallel chunks — the simulation must never be stepped live inside a
 * component's render, or frames rendered out of sequence would each see
 * a different (wrong) engine state. Every frame just indexes into this
 * precomputed array instead.
 *
 * NOTE: matter.js's velocity units are "distance per engine update,"
 * internally normalized against its own timing correction factor. The
 * PIXELS_PER_METER scale and the velocity conversion below are a
 * reasonable starting point but are UNTESTED — this needs an actual
 * render + visual check once run somewhere with npm/network access,
 * and will likely need one or two rounds of constant-tuning.
 */
export function simulateProjectile(
  params: ProjectileParams,
  totalFrames: number,
  fps: number
): SimFrame[] {
  const engine = Matter.Engine.create();
  engine.world.gravity.x = 0;
  engine.world.gravity.y = params.gravity / 9.8; // matter.js default gravity.y = 1 corresponds to ~9.8 m/s^2

  const body = Matter.Bodies.circle(0, 0, 8, { frictionAir: 0 });
  Matter.World.add(engine.world, body);

  const angleRad = (params.angleDegrees * Math.PI) / 180;
  const deltaMs = 1000 / fps;
  const v0PerStep = (params.initialVelocity * PIXELS_PER_METER) / fps;

  Matter.Body.setVelocity(body, {
    x: v0PerStep * Math.cos(angleRad),
    y: -v0PerStep * Math.sin(angleRad),
  });

  const frames: SimFrame[] = [];
  for (let f = 0; f < totalFrames; f++) {
    frames.push({ x: body.position.x, y: body.position.y });
    Matter.Engine.update(engine, deltaMs);
  }

  return frames;
}
