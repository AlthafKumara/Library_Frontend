import React, { useId } from 'react';
import { cn } from '../../utils/cn';

/**
 * Input — labelled text field component.
 *
 * Color mapping to AppColor palette:
 *   Background    → neutral-100 (white)
 *   Border idle   → neutral-300
 *   Border focus  → primary-500
 *   Ring focus    → primary-200 (soft blue ring)
 *   Label text    → neutral-900
 *   Input text    → neutral-900
 *   Placeholder   → neutral-400
 *   Helper text   → neutral-500
 *   Error border  → danger-500
 *   Error text    → danger-500
 */
export const Input = React.forwardRef(({
  className,
  label,
  error,
  helperText,
  id: externalId,
  required,
  ...props
}, ref) => {
  const internalId = useId();
  const id = externalId || internalId;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-neutral-900 leading-none"
        >
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        className={cn(
          // Layout & shape
          'flex h-12 w-full rounded-xl px-4 py-2',
          // Colors — AppColor palette
          'bg-neutral-100 text-neutral-900',
          'border border-neutral-300',
          // Placeholder
          'placeholder:text-neutral-400',
          // Focus — primary-500 border + primary-200 ring
          'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
          // Typography
          'text-base leading-normal',
          // Transition
          'transition-colors duration-150 ease-out',
          // Disabled
          'disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-300',
          // Error state — overrides border/ring to danger palette
          error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
          className,
        )}
        {...props}
      />

      {error && (
        <span className="text-sm text-danger-500 leading-none">{error}</span>
      )}

      {helperText && !error && (
        <span className="text-sm text-neutral-500 leading-none">{helperText}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
