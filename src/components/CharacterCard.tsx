'use client'

import { Character } from '@/types/character'
import { VStack, Image, Text } from '@chakra-ui/react'

interface Props {
  character: Character
  onClick: () => void
}

export default function CharacterCard({ character, onClick }: Props) {
  return (
    <VStack
      bg="white"
      p={4}
      spacing={2}
      borderRadius="xl"
      shadow="md"
      cursor="pointer"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
      onClick={onClick}
    >
      <Image src={character.image} alt={character.name} borderRadius="md" />
      <Text fontWeight="bold" fontSize="md" textAlign="center">
        {character.name}
      </Text>
      <Text fontSize="sm" color="gray.600">
        {character.species} - {character.status}
      </Text>
    </VStack>
  )
}
