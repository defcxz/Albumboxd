const SPOTIFY_API_URL = "https://api.spotify.com/v1"

export class SpotifyError extends Error {
    constructor(
        message: string,
        public status?: number,
    ) {
        super(message)
        this.name = "SpotifyError"
    }
}

export async function searchAlbums(query: string, accessToken: string) {
    if (!query.trim()) {
        throw new SpotifyError("Search query cannot be empty")
    }

    if (!accessToken) {
        throw new SpotifyError("Access token is required")
    }

    try {
        const response = await fetch(`${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=album`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            throw new SpotifyError("Failed to fetch data from Spotify", response.status)
        }

        return await response.json()
    } catch (error) {
        if (error instanceof SpotifyError) {
            throw error
        }
        throw new SpotifyError(error instanceof Error ? error.message : "An unknown error occurred")
    }
}

