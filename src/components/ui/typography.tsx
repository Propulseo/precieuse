import { cn } from '../../lib/utils'

type TypographyProps<T extends React.ElementType = 'p'> = {
  as?: T
  className?: string
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

function createTypography<D extends React.ElementType>(
  defaultTag: D,
  baseClasses: string,
  displayName: string,
) {
  function Component<T extends React.ElementType = D>({
    as,
    className,
    children,
    ...rest
  }: TypographyProps<T>) {
    const Tag = (as || defaultTag) as React.ElementType
    return (
      <Tag className={cn(baseClasses, className)} {...rest}>
        {children}
      </Tag>
    )
  }
  Component.displayName = displayName
  return Component
}

export const H1 = createTypography(
  'h1',
  'font-display font-medium text-5xl md:text-6xl leading-tight',
  'H1',
)

export const H2 = createTypography(
  'h2',
  'font-display font-medium text-3xl md:text-4xl leading-tight',
  'H2',
)

export const H3 = createTypography(
  'h3',
  'font-display font-medium text-2xl md:text-3xl leading-snug',
  'H3',
)

export const H4 = createTypography(
  'h4',
  'font-display font-medium text-xl leading-snug',
  'H4',
)

export const Body = createTypography(
  'p',
  'font-body font-extralight text-base md:text-lg leading-relaxed',
  'Body',
)

export const BodySmall = createTypography(
  'p',
  'font-body font-light text-sm leading-relaxed',
  'BodySmall',
)

export const Caption = createTypography(
  'span',
  'font-body font-light text-xs leading-normal',
  'Caption',
)

export const Quote = createTypography(
  'blockquote',
  'font-body font-light italic text-base md:text-lg leading-relaxed',
  'Quote',
)
