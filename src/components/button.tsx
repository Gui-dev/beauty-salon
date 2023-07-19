import { ButtonHTMLAttributes } from 'react'
import { ImSpinner3 } from 'react-icons/im'
import classnames from 'classnames'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isPrimary?: boolean
  isLoading?: boolean
}

export const Button = ({
  title,
  isPrimary = false,
  isLoading = false,
  ...rest
}: IButton) => {
  return (
    <button
      className={classnames(
        'flex w-full items-center justify-center rounded-lg border border-solid border-secondary px-9 py-3 transition-all hover:border-blue-900',
        {
          'bg-secondary hover:bg-blue-900': isPrimary,
        },
      )}
      {...rest}
    >
      {isLoading ? (
        <ImSpinner3 size={20} className="animate-spin text-white" />
      ) : (
        <span
          className={classnames('font-sans text-lg font-bold text-secondary', {
            'text-white': isPrimary,
          })}
        >
          {title}
        </span>
      )}
    </button>
  )
}
