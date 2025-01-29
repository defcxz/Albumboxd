"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { AlbumGrid } from "@/components/album-grid"
import { searchAlbums, SpotifyError } from "@/services/spotify"
import type { SpotifyResponse } from "@/types/spotify"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
    const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN
    const [results, setResults] = useState<SpotifyResponse | null>(null)
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim() || !ACCESS_TOKEN) return

        setIsLoading(true)
        try {
            const data = await searchAlbums(searchQuery, ACCESS_TOKEN)
            setResults(data)
        } catch (error) {
            const message = error instanceof SpotifyError ? error.message : "An error occurred while searching"

            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            })
            console.error("Search error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch(query)
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Album Search</h1>
                <p className="text-lg text-muted-foreground">Using Spotify API</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex gap-2">
                <Input
                    type="text"
                    placeholder="Search for albums..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" disabled={isLoading} variant="destructive">
                    <Search className="w-4 h-4 mr-2" />
                    {isLoading ? "Searching..." : "Search"}
                </Button>
            </form>

            {results?.albums?.items && results.albums.items.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
                    <AlbumGrid albums={results.albums.items} />
                </div>
            )}

            {results?.albums?.items && results.albums.items.length === 0 && (
                <div className="text-center mt-8 text-muted-foreground">No albums found for "{query}"</div>
            )}
        </div>
    )
}

