import { useState, useEffect, useRef, MutableRefObject } from 'react'

interface ISize {
    width: number
    height: number
}

const useResizeObserver = <T extends HTMLElement>(): [MutableRefObject<T | null>, ISize] => {
    const [size, setSize] = useState({ width: 0, height: 0 })
    const elementRef = useRef<T>(null)

    useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            if (entries.length > 0) {
                const entry = entries[0]
                setSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                })
            }
        }

        const element = elementRef.current

        const observer = new ResizeObserver(handleResize)
        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [])

    return [elementRef, size]
}

export default useResizeObserver

// export function mergeRefs<T = any>(
//     refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
// ): React.RefCallback<T> {
//     return (value) => {
//         refs.forEach((ref) => {
//             if (typeof ref === "function") {
//                 ref(value)
//             } else if (ref != null) {
//                 (ref as React.MutableRefObject<T | null>).current = value
//             }
//         })
//     }
// }