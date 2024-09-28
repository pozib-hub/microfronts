import { AppDispatch, StateSchema } from "@app/providers/StoreProvider"
import { useDispatch } from "react-redux"

// export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()