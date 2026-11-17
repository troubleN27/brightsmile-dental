// Brand marks are not part of lucide-react, so they live here as small inline SVGs.

type IconProps = { className?: string };

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.4 4.2 2.9 11.4c-1.1.4-1 2 .1 2.3l4.6 1.4 1.8 5.5c.2.8 1.2 1 1.7.4l2.6-2.5 4.7 3.5c.7.5 1.6.1 1.8-.7l3.3-15.5c.2-1-.8-1.9-2.1-1.6ZM10 14.2l7.7-6.9c.3-.3-.1-.6-.4-.4l-9.5 6 .1.1 1.5 4.6.6-3.4Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
