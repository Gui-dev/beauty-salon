import {
  ElementType,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error: string | undefined
  icon: ElementType
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { label, error, icon: Icon, ...data },
  ref,
) => {
  return (
    <div className="flex w-full flex-col items-center rounded-lg">
      <label htmlFor={label} className="relative flex w-full items-center">
        <i aria-hidden="true" className="absolute pl-2">
          <Icon size={20} />
        </i>
        <input
          className="w-full rounded-lg border border-gray-50 bg-white px-9 py-3"
          id={label}
          ref={ref}
          {...data}
        />
      </label>
    </div>
  )
}

export const Input = forwardRef(InputBase)
