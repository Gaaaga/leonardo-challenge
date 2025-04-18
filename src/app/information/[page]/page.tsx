'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import {
  Box,
  Button,
  Grid,
  Heading,
  Skeleton,
  useDisclosure,
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Character, CharacterPageInfo } from '@/types/character'
import { JSX, useEffect, useState } from 'react'
import { withUserGuard } from '@/lib/withUserGuard'
import CharacterCard from '@/components/CharacterCard'
import { fetchCharactersByPage } from '@/lib/fetch-characters'

const CharacterModal = dynamic(() => import('@/components/CharacterModal'), {
  ssr: false, // Modal doesn't need SSR
  loading: () => <p>Loading modal...</p>,
})

function PageContent() {
  const { page } = useParams<{ page: string }>()
  const [characters, setCharacters] = useState<Character[]>([])
  const [info, setInfo] = useState<CharacterPageInfo | null>(null)
  const currentPage = parseInt(page || '1')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchCharactersByPage(currentPage).then(result => {
      switch (result.type) {
        case 'success':
          setCharacters(result.characters)
          setInfo(result.info)
          setError(null)
          break
        case 'invalid_page':
          setError(new Error('INVALID_PAGE'))
          break
        case 'error':
          setError(new Error(result.message))
          break
      }
      setLoading(false)
    })
  }, [currentPage])

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
        <Box textAlign="center">
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {error.message === 'INVALID_PAGE'
              ? 'Page not found or too large. Try returning to the first page.'
              : 'Failed to load characters. Please try again later.'}
          </Alert>
          <Button as={Link} href="/information/1" colorScheme="teal">
            Go to First Page
          </Button>
        </Box>
      </Center>
    )
  }

  return (
    <Box p={8}>
      <Heading mb={4} size={{ base: 'md', md: 'lg' }}>
        Characters
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(160px, 1fr))" gap={6}>
        {characters.map(char => (
          <CharacterCard key={char.id} character={char} onClick={() => handleClick(char)} />
        ))}
      </Grid>
      {info && (
        <Box mt={8} display="flex" justifyContent="space-between">
          {info.prev ? (
            <Button as={Link} href={`/information/${info.prev}`}>
              Prev
            </Button>
          ) : (
            <Button isDisabled opacity={0.6} cursor="not-allowed">
              Prev
            </Button>
          )}

          {info.next ? (
            <Button as={Link} href={`/information/${info.next}`}>
              Next
            </Button>
          ) : (
            <Button isDisabled opacity={0.6} cursor="not-allowed">
              Next
            </Button>
          )}
        </Box>
      )}
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

const ProtectedPage = withUserGuard(PageContent)

export default ProtectedPage as () => JSX.Element
