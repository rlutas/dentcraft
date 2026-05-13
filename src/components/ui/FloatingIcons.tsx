type FloatingIcon = {
  src: string
  /** Tailwind classes for position + size, e.g. "top-12 left-3 w-14 h-14 md:top-32 md:left-10 md:w-28 md:h-28" */
  className: string
  /** Animation delay in seconds */
  delay?: number
  /** Animation duration in seconds (default 26) */
  duration?: number
  /** Static rotation in degrees (default 0) */
  rotate?: number
  /** Color override (default warm brown) */
  color?: string
  /** Opacity 0–1 (default 0.1) */
  opacity?: number
  /** Float variant — different orbit patterns */
  variant?: 'driftA' | 'driftB' | 'driftC'
}

export function FloatingIcons({ icons }: { icons: FloatingIcon[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {icons.map((icon, i) => {
        const {
          src,
          className,
          delay = 0,
          duration = 26,
          rotate = 0,
          color = '#8b7355',
          opacity = 0.1,
          variant = 'driftA',
        } = icon
        return (
          <span
            key={i}
            className={`absolute floating-icon floating-icon--${variant} ${className}`}
            style={{
              opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ['--icon-rot' as string]: `${rotate}deg`,
            }}
          >
            <span
              className="block w-full h-full"
              style={{
                backgroundColor: color,
                maskImage: `url(${src})`,
                WebkitMaskImage: `url(${src})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            />
          </span>
        )
      })}
    </div>
  )
}
