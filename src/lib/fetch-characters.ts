import { retry } from './retry'
import { logError } from './logger'
import client from './apollo-client'
import { GET_CHARACTERS } from '@/graphql/queries'
import { Character, CharacterPageInfo } from '@/types/character'

export type FetchCharactersResult =
  | {
      type: 'success'
      characters: Character[]
      info: CharacterPageInfo
    }
  | {
      type: 'invalid_page' // Explicit case: valid GraphQL response but page is out of range (info.pages === null)
    }
  | {
      type: 'error'
      message: string
    }

export async function fetchCharactersByPage(page: number): Promise<FetchCharactersResult> {
  try {
    const result = await retry(() =>
      client.query({
        query: GET_CHARACTERS,
        variables: { page },
        fetchPolicy: 'no-cache',
      })
    )

    const characters = result.data.characters?.results
    const info = result.data.characters?.info

    // Handle invalid page: API returns no error, but info.pages is null
    if (!characters || !info || info.pages === null) {
      return { type: 'invalid_page' }
    }

    return {
      type: 'success',
      characters,
      info,
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      logError('GraphQL fetchCharactersByPage failed', err)
      return { type: 'error', message: err.message }
    }

    logError('Unknown error during fetchCharactersByPage', err)
    return { type: 'error', message: 'Unexpected error occurred' }
  }
}
