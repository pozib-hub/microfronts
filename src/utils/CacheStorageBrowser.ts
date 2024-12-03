enum MimeTypes {
    jpeg = 'image/jpeg',
    pdf = 'application/pdf',
}

enum KEYS_CACHE {
    IMAGE = 'cache-image',
}

export class CacheStorageBrowser {
    public static async getImage(name: string) {
        const cache = await caches.open(KEYS_CACHE.IMAGE)
        const cachedResponse = await cache.match(name)

        if (!cachedResponse) {
            throw new Error('error load image from cache: ' + name)
        }

        return await cachedResponse.text()
    }

    public static async setImage(name: string, base64: string) {
        const cache = await caches.open(KEYS_CACHE.IMAGE)

        const currentImg = await cache.match(name)
        if (currentImg && currentImg.ok) {
            await cache.delete(KEYS_CACHE.IMAGE)
        }

        const blob = new Blob([base64], { type: MimeTypes.jpeg })
        const response = new Response(blob)
        await cache.put(name, response)
    }
}
