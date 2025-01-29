import type { Album } from "@/types/spotify"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

interface AlbumGridProps {
    albums: Album[]
}

export function AlbumGrid({ albums }: AlbumGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {albums.map((album, index) => (
                <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-0">
                            <div className="relative aspect-square">
                                <Image
                                    src={album.images[0]?.url || "/placeholder.svg"}
                                    alt={album.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </CardContent>
                        <CardHeader className="space-y-1">
                            <CardTitle className="line-clamp-1">{album.name}</CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                                {album.artists.map((artist) => artist.name).join(", ")}
                            </p>
                        </CardHeader>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}

