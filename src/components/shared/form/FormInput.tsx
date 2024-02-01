'use client'

import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFormStatus } from '@/react-dom-shim'
import { FormErrors } from './FormErrors'

type FormInputProps = {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = '',
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus()

    return (
      <div className=" w-full space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-sm font-semibold text-slate-900"
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn(
              'h-7  bg-slate-100 px-2 py-1 text-sm text-slate-900',
              className
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)
//Display name needed for forwardRef
FormInput.displayName = 'FormInput'
