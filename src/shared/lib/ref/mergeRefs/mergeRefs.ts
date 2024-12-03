import { LegacyRef, MutableRefObject, RefCallback } from 'react'

export function mergeRefs<T>(refs: Array<MutableRefObject<T> | LegacyRef<T>>): RefCallback<T> {
    return (value: T) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value)
            } else if (ref !== null) {
                ;(ref as MutableRefObject<T | null>).current = value
            }
        })
    }
}
