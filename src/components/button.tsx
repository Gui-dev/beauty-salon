interface IButton {
  title: string
}

export const Button = ({ title }: IButton) => {
  return (
    <button
      type="submit"
      className="flex w-full items-center justify-center rounded-lg bg-secondary  px-9 py-3"
    >
      <span className="font-sans text-lg font-bold text-white">{title}</span>
    </button>
  )
}
