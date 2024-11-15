import { IFeaturesFlags } from "@shared/types/featuresFlags"
import { getFeaturesFlags } from "./setGetFeatures"

interface IToggleFeaturesOptions<T> {
    name: keyof IFeaturesFlags
    on: () => T
    off: () => T
}

export function toggleFeatures<T>({ name, off, on }: IToggleFeaturesOptions<T>): T {
    if (getFeaturesFlags(name)) {
        return on()
    }

    return off()
}