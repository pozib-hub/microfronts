import { getFeaturesFlags } from '@entities/user'
import { IFeaturesFlags } from '@shared/types/featuresFlags'
import { useAppSelector } from '../hooks/useAppSelector'

interface IToggleFeaturesOptions<T> {
    name: keyof IFeaturesFlags
    on: () => T
    off: () => T
}

export function useToggleFnFeatures<T>({ name, off, on }: IToggleFeaturesOptions<T>): T {
    const flags = useAppSelector(getFeaturesFlags)

    if (flags[name]) {
        return on()
    }

    return off()
}
