import { MutableRefObject, useEffect } from "react"

export interface IUseInfiniteScroll {
    cb?: () => void
    triggerRef: MutableRefObject<HTMLElement | null>
    wrapperRef: MutableRefObject<HTMLElement | null>
}

function useInfiniteScroll(props: IUseInfiniteScroll) {
    const { cb, triggerRef, wrapperRef } = props

    useEffect(() => {
        if (!cb) return

        const options = {
            root: wrapperRef?.current || null,
            rootMargin: "0px",
            threshold: 1.0,
        }


        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                cb()
            }

        }, options)

        if (triggerRef.current) {
            observer.observe(triggerRef.current)
        }

        return () => {
            observer.disconnect()
        }

    }, [cb, triggerRef, wrapperRef])

}

export default useInfiniteScroll