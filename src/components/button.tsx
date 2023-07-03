import { ImSpinner3 } from 'react-icons/im'

interface IButton {
  title: string
  isLoading?: boolean
}

export const Button = ({ title, isLoading = false }: IButton) => {
  return (
    <button
      type="submit"
      className="flex w-full items-center justify-center rounded-lg bg-secondary  px-9 py-3"
    >
      {isLoading ? (
        <ImSpinner3 size={20} className="animate-spin text-white" />
      ) : (
        <span className="font-sans text-lg font-bold text-white">{title}</span>
      )}
    </button>
  )
}
