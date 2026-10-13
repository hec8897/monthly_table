// ponytail: stand-in line icons; swap for the Wanted icon set
const PATHS = {
  back: "M15 5l-7 7 7 7",
  chevronRight: "M9 5l7 7-7 7",
  chevronDown: "M6 9l6 6 6-6",
  close: "M6 6l12 12M18 6L6 18",
  heart:
    "M12 20s-7.5-4.6-9.3-9C1.4 7.7 3.5 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.5 0 5.6 3.2 4.3 6.5-1.8 4.4-9.3 9-9.3 9z",
  home: "M4 10.5L12 4l8 6.5V19a1 1 0 01-1 1h-4.5v-6h-5v6H5a1 1 0 01-1-1z",
  bookmark: "M6.5 4h11v16l-5.5-4-5.5 4z",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5",
  alert: "M12 8v5M12 16.5v.5",
  play: "M8 5.5v13l11-6.5z",
};

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 24,
  filled = false,
  className,
}: {
  name: IconName;
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
