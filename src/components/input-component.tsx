import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react'
import { AiOutlineMail } from 'react-icons/ai'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error: string | undefined
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { label, error, ...data },
  ref,
) => {
  return (
    <div className="flex w-full flex-col items-center rounded-lg">
      <label htmlFor={label} className="relative flex w-full items-center">
        <i aria-hidden="true" className="absolute pl-2">
          <AiOutlineMail size={20} />
        </i>
        <input
          className="w-full rounded-lg border border-gray-50 bg-white px-9 py-3"
          id={label}
          ref={ref}
          {...data}
        />
      </label>
      {error && (
        <span className="mt-2 self-start font-sans text-sm text-red-600">
          {error}
        </span>
      )}
    </div>
  )
}

export const Input = forwardRef(InputBase)
