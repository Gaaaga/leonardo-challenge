'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useUserInfo } from '@/context/UserInfoContext'

interface BlockingModalProps {
  isOpen: boolean
  onClose: () => void
  defaultValues?: {
    username: string
    jobTitle: string
  }
}

export default function BlockingModal({ isOpen, onClose, defaultValues }: BlockingModalProps) {
  const { saveUserInfo } = useUserInfo()
  const [username, setUsername] = useState(defaultValues?.username || '')
  const [jobTitle, setJobTitle] = useState(defaultValues?.jobTitle || '')

  useEffect(() => {
    setUsername(defaultValues?.username || '')
    setJobTitle(defaultValues?.jobTitle || '')
  }, [defaultValues])

  const handleSubmit = () => {
    if (username.trim() && jobTitle.trim()) {
      saveUserInfo({ username, jobTitle })
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome! Tell us about yourself</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              placeholder="Job Title"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            isDisabled={!username.trim() || !jobTitle.trim()}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
