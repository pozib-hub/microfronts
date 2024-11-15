import { IFeaturesFlags } from "@shared/types/featuresFlags"

let featuresFlags: IFeaturesFlags

export function setFeaturesFlags(newFeaturesFlags?: IFeaturesFlags) {
    if (newFeaturesFlags) {
        featuresFlags = newFeaturesFlags
    }
}

export function getFeaturesFlags(flag: keyof IFeaturesFlags) {
    return featuresFlags?.[flag]
}