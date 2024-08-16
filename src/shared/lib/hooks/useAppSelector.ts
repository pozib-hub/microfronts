import { TypedUseSelectorHook, useSelector } from "react-redux"
import { AppState } from "app/providers/StoreProvider"

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
