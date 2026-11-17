// Brand marks are not part of lucide-react, so they live here as small inline SVGs.

type IconProps = { className?: string };

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.4 4.2 2.9 11.4c-1.1.4-1 2 .1 2.3l4.6 1.4 1.8 5.5c.2.8 1.2 1 1.7.4l2.6-2.5 4.7 3.5c.7.5 1.6.1 1.8-.7l3.3-15.5c.2-1-.8-1.9-2.1-1.6ZM10 14.2l7.7-6.9c.3-.3-.1-.6-.4-.4l-9.5 6 .1.1 1.5 4.6.6-3.4Z" />
    </svg>
  );
}

/** Simple "VK" lettermark in a rounded square */
export function VkIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="currentColor" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        fill="#fff"
      >
        VK
      </text>
    </svg>
  );
}
