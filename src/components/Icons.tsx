/**
 * Hand-written inline SVG icons — 24-unit viewBox, currentColor stroke,
 * 1.7 stroke width, round caps and joins. No icon library.
 */

interface IconProps {
  size?: number;
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

export function SunIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} {...base}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </svg>
  );
}

export function MoonIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M20.5 14.6A8.6 8.6 0 019.4 3.5a8.6 8.6 0 1011.1 11.1z" />
    </svg>
  );
}

export function MailIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} {...base}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function ArrowUpIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} {...base} strokeWidth={1.8}>
      <path d="M12 19V5" />
      <path d="M6 11l6-6 6 6" />
    </svg>
  );
}

export function CloseIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} {...base} strokeWidth={1.6}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} {...base} strokeWidth={1.6}>
      <path d="M14.5 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} {...base} strokeWidth={1.6}>
      <path d="M9.5 5l7 7-7 7" />
    </svg>
  );
}

export function ChevronUpIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} {...base} strokeWidth={1.6}>
      <path d="M5 14.5l7-7 7 7" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} {...base} strokeWidth={1.6}>
      <path d="M5 9.5l7 7 7-7" />
    </svg>
  );
}

export function PlayIcon({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.6a1 1 0 011.5-.87l9 6.4a1 1 0 010 1.74l-9 6.4A1 1 0 018 18.4V5.6z" />
    </svg>
  );
}

export function PauseIcon({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="7" y="5" width="3.6" height="14" rx="1.2" />
      <rect x="13.4" y="5" width="3.6" height="14" rx="1.2" />
    </svg>
  );
}

export function LinkedInIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.6 3a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM3.1 8.6h3v12.3h-3V8.6zm5.3 0h2.9v1.7h.04c.4-.76 1.4-1.56 2.9-1.56 3.1 0 3.7 2 3.7 4.7v7.45h-3V14c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v7h-3V8.6z" />
    </svg>
  );
}
