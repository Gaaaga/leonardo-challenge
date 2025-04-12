import BlockingModal from '@/components/BlockingModal'
import { useUserModal } from '@/context/UserModalContext'
import { useUserInfo } from '@/context/UserInfoContext'

export function GlobalModals() {
  const { isOpen, close } = useUserModal()
  const { userInfo } = useUserInfo()

  return (
    <BlockingModal
      isOpen={isOpen || !userInfo}
      onClose={close}
      defaultValues={userInfo || undefined}
    />
  )
}
