'use client'

import {
  Box,
  Flex,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { useUserInfo } from '@/context/UserInfoContext'
import { useUserModal } from '@/context/UserModalContext'

export default function Navbar() {
  const { userInfo, clearUserInfo } = useUserInfo()
  const { open } = useUserModal()

  return (
    <Box as="nav" px={6} py={3} bg="gray.50" borderBottom="1px solid #e2e8f0">
      <Flex align="center">
        <Text fontWeight="bold" fontSize="lg">
          Leonardo App
        </Text>
        <Spacer />
        {userInfo && (
          <Menu>
            <MenuButton as={Button} variant="ghost">
              👤 {userInfo.username}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={open}>Edit Info</MenuItem>
              <MenuItem onClick={clearUserInfo}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  )
}
