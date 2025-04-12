'use client'

import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import { GET_CHARACTERS } from '@/graphql/queries'
import { Box, Button, Grid, Heading, Skeleton, Text, useDisclosure, Center } from '@chakra-ui/react'
import Link from 'next/link'
import { Character } from '@/types/character'
import CharacterModal from '@/components/CharacterModal'
import { useState } from 'react'
import { withUserGuard } from '@/lib/withUserGuard'
import CharacterCard from '@/components/CharacterCard'

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
  if (loading) {
    return (
      <Grid
        p={8}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={6}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Box key={i} p={4} rounded="md" shadow="sm" bg="gray.100">
            <Skeleton height="150px" />
            <Skeleton mt={4} height="20px" />
            <Skeleton mt={2} height="14px" />
          </Box>
        ))}
      </Grid>
    )
  }

  if (error) {
    return (
      <Center p={8}>
        <Text color="red.500">Failed to load data. Please try again later.</Text>
      </Center>
    )
  }

  const characters: Character[] = data.characters.results
  const info = data.characters.info

  return (
    <Box p={8}>
      <Heading mb={4}>Characters</Heading>

      <Grid templateColumns="repeat(auto-fit, minmax(160px, 1fr))" gap={6}>
        {characters.map(char => (
          <CharacterCard key={char.id} character={char} onClick={() => handleClick(char)} />
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
