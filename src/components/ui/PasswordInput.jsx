import React, { useId, useState } from 'react';
import { Eye, EyeSlash, LockKey } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';

/**
 * PasswordInput — password field with show/hide toggle.
 * Accepts the same props as a standard <input> plus label, error, helperText.
 */
export const PasswordInput = React.forwardRef(({
  className,
  label,
  error,
  helperText,
  id: externalId,
  ...props
}, ref) => {
  const internalId = useId();
  const id = externalId || internalId;
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-900 leading-none">
          {label}
        </label>
      )}

      {/* Input wrapper — lock icon left, eye toggle right */}
      <div className="relative">
        {/* Left lock icon */}
        <LockKey
          size={20}
          weight="regular"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
        />

        <input
          id={id}
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn(
            'flex h-12 w-full rounded-xl py-2',
            'pl-11 pr-11',
            'bg-neutral-100 text-neutral-900',
            'border border-neutral-300',
            'placeholder:text-neutral-400',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
            'text-base leading-normal',
            'transition-colors duration-150 ease-out',
            'disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-300',
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
            className,
          )}
          {...props}
        />

        {/* Eye toggle button */}
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2',
            'flex items-center justify-center',
            'text-neutral-400 hover:text-neutral-600',
            'transition-colors duration-150',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md',
          )}
          tabIndex={-1}
        >
          {visible
            ? <EyeSlash size={20} weight="regular" />
            : <Eye size={20} weight="regular" />
          }
        </button>
      </div>

      {error && (
        <span className="text-sm text-danger-500 leading-none">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-sm text-neutral-500 leading-none">{helperText}</span>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
