import { Header } from '@/components/header'
import { EditPhotoForm } from '@/components/edit-photo-form'
import { EditProfileForm } from '@/components/edit-profile-form'

export default function Profile() {
  return (
    <>
      <Header />
      <div className="mt-4 flex flex-col items-center justify-center gap-4 px-[10%] pb-7">
        <h1 className="self-start text-2xl font-bold text-primary-900">
          Editar perfil
        </h1>
        <EditPhotoForm />
        <EditProfileForm />
      </div>
    </>
  )
}
