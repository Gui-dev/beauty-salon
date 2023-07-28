import { ImSpinner3 } from 'react-icons/im'
import colors from 'tailwindcss/colors'

export const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-primary-800">
      <ImSpinner3 size={30} color={colors.white} className="animate-spin" />
    </div>
  )
}
