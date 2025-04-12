'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export interface UserInfo {
  username: string
  jobTitle: string
}

interface UserInfoContextType {
  userInfo: UserInfo | null
  saveUserInfo: (info: UserInfo) => void
  clearUserInfo: () => void
}

const STORAGE_KEY = 'leonardo-user-info'
const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined)

export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setUserInfo(JSON.parse(stored))
  }, [])

  const saveUserInfo = (info: UserInfo) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info))
    setUserInfo(info)
  }

  const clearUserInfo = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUserInfo(null)
  }

  return (
    <UserInfoContext.Provider value={{ userInfo, saveUserInfo, clearUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  )
}

export function useUserInfo() {
  const ctx = useContext(UserInfoContext)
  if (!ctx) throw new Error('useUserInfo must be used inside UserInfoProvider')
  return ctx
}
