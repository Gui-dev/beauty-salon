'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import colors from 'tailwindcss/colors'

import logo from '@/assets/logo_branca.png'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

export const Header = () => {
  const { signOut } = useAuth()
  const [openDropMenu, setOpenDropMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  const handleOpenDropMenu = () => {
    setOpenDropMenu(!openDropMenu)
  }

  return (
    <header className="flex items-center justify-between bg-primary-900 px-[10%] py-4 shadow-lg">
      <Link href="/dashboard" className="flex flex-row items-center gap-2">
        <Image src={logo} alt="Beauty Salon Logo" width={45} height={42} />
        <h1 className="font-sans text-2xl font-bold text-white">
          Beauty Salon
        </h1>
      </Link>
      <div
        className="relative flex cursor-pointer flex-row items-center gap-2 transition-all"
        onMouseEnter={handleOpenDropMenu}
        onMouseLeave={handleOpenDropMenu}
      >
        <CgProfile size={20} color={colors.white} />
        <span className="font-sans text-base text-white">Perfil</span>
        {openDropMenu && (
          <ul className="absolute -right-3 top-[95%] flex flex-col gap-2 rounded-sm bg-primary-900 text-center text-white shadow-xl transition-all">
            <li className="rounded-sm px-5 py-2 hover:bg-primary-800">
              <Link href="/dashborad">Agendamento</Link>
            </li>
            <li className="rounded-sm px-5 py-2 hover:bg-primary-800">
              <Link href="/dashborad">Ediatr Perfil</Link>
            </li>
            <li>
              <button
                className="w-full rounded-sm px-5 py-2 text-sm font-normal hover:bg-primary-800 hover:text-red-900"
                onClick={handleSignOut}
              >
                Sair
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
