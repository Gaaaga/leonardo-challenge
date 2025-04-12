'use client'

import { createContext, useContext, useState } from 'react'

interface ModalContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const UserModalContext = createContext<ModalContextType | undefined>(undefined)

export function UserModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <UserModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </UserModalContext.Provider>
  )
}

export function useUserModal() {
  const ctx = useContext(UserModalContext)
  if (!ctx) throw new Error('useUserModal must be used inside UserModalProvider')
  return ctx
}
