export interface Artist {
    id: string
    name: string
}

export interface Image {
    url: string
    height: number
    width: number
}

export interface Album {
    id: string
    name: string
    artists: Artist[]
    images: Image[]
}

export interface SpotifyResponse {
    albums: {
        items: Album[]
    }
}

