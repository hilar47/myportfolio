export default function GrainOverlay() {
  return (
    <svg className="grain-overlay" aria-hidden="true">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves={4}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
