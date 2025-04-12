'use client'

import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import { GET_CHARACTERS } from '@/graphql/queries'
import { Box, Button, Grid, Image, Text, VStack, useDisclosure, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { Character } from '@/types/character'
import CharacterModal from '@/components/CharacterModal'
import { useState } from 'react'
import { withUserGuard } from '@/lib/withUserGuard'

function PageContent() {
  const { page } = useParams<{ page: string }>()
  const currentPage = parseInt(page || '1')

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage },
  })

  const [selected, setSelected] = useState<Character | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = (char: Character) => {
    setSelected(char)
    onOpen()
  }

  if (loading) return <Text p={8}>Loading...</Text>
  if (error) return <Text p={8}>Error: {error.message}</Text>

  const characters: Character[] = data.characters.results
  const info = data.characters.info

  return (
    <Box p={8}>
      <Heading mb={4}>Characters</Heading>

      <Grid templateColumns="repeat(auto-fit, minmax(160px, 1fr))" gap={6}>
        {characters.map(char => (
          <VStack
            key={char.id}
            bg="gray.100"
            p={4}
            borderRadius="md"
            onClick={() => handleClick(char)}
            cursor="pointer"
            _hover={{ bg: 'gray.200' }}
          >
            <Image src={char.image} alt={char.name} borderRadius="md" />
            <Text fontWeight="bold">{char.name}</Text>
            <Text fontSize="sm">
              {char.species} - {char.status}
            </Text>
          </VStack>
        ))}
      </Grid>

      <Box mt={8} display="flex" justifyContent="space-between">
        <Button as={Link} href={`/information/${currentPage - 1}`} isDisabled={!info.prev}>
          Prev
        </Button>
        <Button as={Link} href={`/information/${currentPage + 1}`} isDisabled={!info.next}>
          Next
        </Button>
      </Box>

      <CharacterModal
        character={selected}
        isOpen={isOpen}
        onClose={() => {
          setSelected(null)
          onClose()
        }}
      />
    </Box>
  )
}

export default withUserGuard(PageContent)
