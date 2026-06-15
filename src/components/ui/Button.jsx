import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Button — reusable action component.
 *
 * Variants map directly to the AppColor palette:
 *   primary   → primary-500 background, white text
 *   secondary → neutral surface with primary-500 border
 *   ghost     → transparent with neutral-900 hover
 *   outline   → neutral-300 border, neutral-900 text
 *   danger    → danger-500 background, white text
 *
 * Sizes: sm | md (default) | lg
 */
export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  as: Component ="button",
  children,
  ...props
}, ref) => {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'rounded-xl font-medium leading-none',
    'transition-all duration-150 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
    'active:scale-[0.98]',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' ');

  const variants = {
    // Filled primary — primary-500 bg, white text, darker on hover
    primary:
      'bg-primary-500 text-neutral-100 shadow-sm hover:bg-primary-600',

    // Subtle — neutral-200 bg, primary-600 text, primary-300 border on hover
    secondary:
      'bg-neutral-200 text-primary-600 border border-neutral-300 hover:border-primary-400 hover:bg-neutral-250',

    // Ghost — transparent, neutral-600 text, light neutral hover
    ghost:
      'bg-transparent text-neutral-600 hover:bg-neutral-250 hover:text-neutral-900',

    // Outline — neutral-300 border, neutral-900 text, primary border on hover
    outline:
      'border border-neutral-300 text-neutral-900 bg-neutral-100 hover:border-primary-400 hover:text-primary-500',

    // Destructive — danger-500 bg, white text
    danger:
      'bg-danger-500 text-neutral-100 shadow-sm hover:bg-danger-600',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm ',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  };

  return (
    <Component
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';
