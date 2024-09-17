
export { ProfileSchema, IProfile } from "./model/types/profile"
export {
    profileActions,
    profileReducer,
    profileSlice
} from "./model/slice/profileSlice"
export { fetchProfileData } from "./model/services/fetchProfileData/fetchProfileData"
export { ProfileCard } from "./ui/ProfileCard/ProfileCard"