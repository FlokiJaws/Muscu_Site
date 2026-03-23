import { useState, useEffect } from 'react'

const cache = new Map() // cache en mémoire pour éviter les re-fetch

export function useWgerImage(exerciseName) {
  const [imageUrl, setImageUrl] = useState(cache.get(exerciseName) ?? null)
  const [loading, setLoading]   = useState(!cache.has(exerciseName))

  useEffect(() => {
    if (!exerciseName || cache.has(exerciseName)) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchImage() {
      try {
        // 1. Recherche de l'exercice sur wger.de
        const searchRes = await fetch(
          `https://wger.de/api/v2/exercise/search/?term=${encodeURIComponent(exerciseName)}&language=english&format=json`,
          { signal: AbortSignal.timeout(4000) }
        )
        if (!searchRes.ok || cancelled) return
        const searchData = await searchRes.json()

        const baseId = searchData.suggestions?.[0]?.data?.base_id
        if (!baseId || cancelled) {
          cache.set(exerciseName, null)
          return
        }

        // 2. Récupérer les images de l'exercice
        const infoRes = await fetch(
          `https://wger.de/api/v2/exerciseinfo/${baseId}/?format=json`,
          { signal: AbortSignal.timeout(4000) }
        )
        if (!infoRes.ok || cancelled) return
        const info = await infoRes.json()

        const url = info.images?.[0]?.image ?? null
        cache.set(exerciseName, url)
        if (!cancelled) setImageUrl(url)
      } catch {
        cache.set(exerciseName, null) // évite de re-tenter à chaque fois
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchImage()
    return () => { cancelled = true }
  }, [exerciseName])

  return { imageUrl, loading }
}
