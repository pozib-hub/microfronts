interface IStorage {
    getItem: <T>(key: string) => Promise<T | null>
    setItem: <T>(key: string, value: T) => Promise<void>
}

class BrowserStorage {
    storage: IStorage = localStorage as any

    async get<T>(key: string): Promise<T | null> {
        const value = await this.storage.getItem<T>(key)

        if (!value) {
            return null
        }

        try {
            if (typeof value === 'string') {
                return JSON.parse(value) as T
            }
            return value
        } catch {
            return value as unknown as T
        }
    }

    async set<T>(key: string, value: T) {
        const _value = typeof value !== 'string' ? JSON.stringify(value) : value

        await this.storage.setItem(key, _value)
    }

    setStorage(storage: any) {
        if (typeof storage.getItem !== 'function') {
            throw new Error("new storage haven't function 'getItem'")
        }

        if (typeof storage.setItem !== 'function') {
            throw new Error("new storage haven't function 'setItem'")
        }

        this.storage = storage as any
    }
}

export default new BrowserStorage()
