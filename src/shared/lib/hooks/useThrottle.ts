import { useCallback, useRef } from 'react'

export function useThrottle(callback: (...args: any[]) => void, delay: number = 700) {
    const throttleRef = useRef(false)
    const timeRef = useRef<ReturnType<typeof setTimeout>>()

    return useCallback((...args: any[]) => {
        if (!throttleRef.current) {
            callback(...args)
            throttleRef.current = true

            timeRef.current = setTimeout(() => {
                throttleRef.current = false
            }, delay)

        }

    }, [callback, delay])
}
