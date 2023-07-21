import classnames from 'classnames'
import {
  ElementType,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | undefined
  icon?: ElementType
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { label, error, icon: Icon, ...data },
  ref,
) => {
  return (
    <div className="flex w-full flex-col items-center rounded-lg">
      <label htmlFor={label} className="relative flex w-full items-center">
        {Icon && (
          <i
            aria-hidden="true"
            className={classnames('absolute', {
              'pl-2': Icon,
            })}
          >
            <Icon size={20} />
          </i>
        )}
        <input
          className={classnames(
            'w-full rounded-lg border border-primary-900 bg-white py-3 text-gray-800 placeholder-primary-800',
            {
              'px-9': Icon,
              'px-3': !Icon,
              'border-red-300': error,
            },
          )}
          id={label}
          ref={ref}
          {...data}
        />
      </label>
      {error && (
        <span className="mt-2 self-start text-sm text-red-500">{error}</span>
      )}
    </div>
  )
}

export const Input = forwardRef(InputBase)
