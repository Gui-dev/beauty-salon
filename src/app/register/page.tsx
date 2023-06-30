import Image from 'next/image'

import logo from '@/assets/logo.webp'
import { FormRegister } from './../../components/form-register'
import Link from 'next/link'

export default function Register() {
  return (
    <div className="min-h-screen bg-register bg-cover bg-no-repeat">
      <div className="px-8 py-4">
        <Link href="/" className="font-sans text-lg text-white">
          Home {'>'} Área de cadastro
        </Link>
      </div>
      <div className="flex w-full items-center justify-center gap-8">
        <div className="flex items-center">
          <Image src={logo} alt="Beauty Salon Logo" width={205} height={173} />
        </div>
        <div className="flex w-[50%] flex-col rounded-3xl bg-gray-100 p-14 shadow-2xl">
          <h1 className="mb-8 text-center font-sans text-3xl font-light text-white">
            Olá, faça aqui o seu cadastro
          </h1>
          <FormRegister />
          <Link
            href="/"
            className="mt-4 font-sans text-sm font-bold text-white hover:underline"
          >
            Já tenho uma conta, quero fazer login
          </Link>
        </div>
      </div>
    </div>
  )
}
