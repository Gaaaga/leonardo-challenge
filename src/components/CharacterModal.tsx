'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Character } from '@/types/character'

interface Props {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

export default function CharacterModal({ character, isOpen, onClose }: Props) {
  if (!character) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{character.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Image src={character.image} alt={character.name} borderRadius="md" />
            <Text>Status: {character.status}</Text>
            <Text>Species: {character.species}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
