import Image from 'next/image'

import logo from '@/assets/logo.webp'
import { Form } from './form-login'

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-end bg-black bg-login_bg bg-cover bg-no-repeat">
      <div className="flex w-[50%] flex-col flex-wrap px-4">
        <div className="mb-3 flex justify-center">
          <Image src={logo} alt="Beauty Salon Logo" width={205} height={173} />
        </div>
        <div className="flex flex-col rounded-3xl bg-gray-100 p-12 shadow-2xl">
          <h1 className="mb-8 text-center font-sans text-3xl font-light text-white">
            Olá, seja bem vindo!
          </h1>
          <Form />
        </div>
      </div>
    </div>
  )
}
