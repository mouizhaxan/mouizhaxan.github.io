/**
 * The inline SVGs used across the site — Lucide outlines for interface chrome,
 * solid brand marks for the contact cards. All draw in `currentColor`.
 */

interface IconProps {
  size?: number
  className?: string
}

function stroke(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
}

export function DownloadIcon({ size = 13, className }: IconProps) {
  return (
    <svg {...stroke(size)} className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 21h16" />
    </svg>
  )
}

export function ExternalIcon({ size = 13, className }: IconProps) {
  return (
    <svg {...stroke(size)} strokeWidth={2.1} className={className}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

export function MenuIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...stroke(size)} className={className}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

export function CloseIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...stroke(size)} className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function MailIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-3V9.3l-6 4.5-6-4.5V19H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.6 2L12 12.4 19.4 7H4.6Z" />
    </svg>
  )
}

export function WhatsAppIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.53 3.75 1.45 5.3L2 22l5-1.6a9.8 9.8 0 0 0 5.04 1.38c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm0 17.84c-1.62 0-3.13-.47-4.4-1.29l-.32-.2-2.97.95.94-2.9-.2-.32a7.96 7.96 0 0 1-1.23-4.24c0-4.4 3.58-7.98 8.18-7.98 4.4 0 7.98 3.58 7.98 7.98s-3.58 8-7.98 8Zm4.5-5.94c-.24-.13-1.46-.72-1.68-.8-.23-.09-.4-.13-.56.12-.16.25-.64.8-.78.96-.15.17-.29.18-.53.06-.24-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.36-1.7-.14-.24-.02-.37.1-.5.12-.12.26-.3.4-.46.13-.15.17-.26.26-.43.08-.17.04-.32-.02-.45-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.19.86 2.33.98 2.5.12.16 1.68 2.68 4.1 3.66 2.42.98 2.42.65 2.86.61.44-.04 1.42-.58 1.62-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

export function LinkedInIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.9 8.65 22 10.6 22 14v7h-4v-6.2c0-1.5-.54-2.5-1.87-2.5-1.02 0-1.63.69-1.9 1.35-.1.24-.13.57-.13.9V21h-4V9Z" />
    </svg>
  )
}

export function InstagramIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.65.5.72.28 1.33.66 1.94 1.27.6.6.99 1.22 1.27 1.94.27.7.45 1.48.5 2.65.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.23 1.96-.5 2.65-.28.72-.67 1.33-1.27 1.94-.6.6-1.22.99-1.94 1.27-.7.27-1.48.45-2.65.5-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.23-2.65-.5a5.37 5.37 0 0 1-1.94-1.27 5.37 5.37 0 0 1-1.27-1.94c-.27-.7-.45-1.48-.5-2.65C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.23-1.96.5-2.65.28-.72.67-1.33 1.27-1.94A5.37 5.37 0 0 1 5.98 1.3c.7-.27 1.48-.45 2.65-.5C9.9 2.2 10.29 2.2 12 2.2Zm0 1.98c-3.15 0-3.5.01-4.73.07-.94.04-1.45.2-1.79.33-.45.17-.77.38-1.11.72-.34.34-.55.66-.72 1.11-.13.34-.29.85-.33 1.79-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.94.2 1.45.33 1.79.17.45.38.77.72 1.11.34.34.66.55 1.11.72.34.13.85.29 1.79.33 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.94-.04 1.45-.2 1.79-.33.45-.17.77-.38 1.11-.72.34-.34.55-.66.72-1.11.13-.34.29-.85.33-1.79.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.94-.2-1.45-.33-1.79a2.98 2.98 0 0 0-.72-1.11 2.98 2.98 0 0 0-1.11-.72c-.34-.13-.85-.29-1.79-.33-1.23-.06-1.58-.07-4.73-.07ZM12 6.87a5.13 5.13 0 1 1 0 10.26 5.13 5.13 0 0 1 0-10.26Zm0 8.46a3.33 3.33 0 1 0 0-6.66 3.33 3.33 0 0 0 0 6.66Zm6.54-8.68a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    </svg>
  )
}

export function HeartIcon({ size = 12, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 21s-7.5-4.7-9.4-9.2C1.1 8.3 3 5 6.3 5c2 0 3.4 1.1 4.2 2.3.2.3.5.5.8.5s.6-.2.8-.5C12.9 6.1 14.3 5 16.3 5c3.3 0 5.2 3.3 3.7 6.8C18.1 16.3 12 21 12 21Z" />
    </svg>
  )
}
