import axios from "axios"
import { API_Errors } from "./types"

const parseApiErrors = (error: unknown) => {
    if (axios.isCancel(error)) {
        if (error.message === 'CANCEL_STORYBOOK') {
            return API_Errors.CANCEL_STORYBOOK
        }
        return API_Errors.CANCEL
    }

    if (axios.isAxiosError(error)) {
        if (!error.response) {
            // Ошибка сети или таймаута
            if (error.code === 'ECONNABORTED') {
                return API_Errors.TIMEOUT
            }
            return API_Errors.NETWORK_ERROR
        }

        // Обработка ошибок, связанных с ответом сервера
        switch (error.response.status) {
            case 400:
                return API_Errors.BAD_REQUEST
            case 401:
                return API_Errors.UNAUTHORIZED
            case 403:
                return API_Errors.FORBIDDEN
            case 404:
                return API_Errors.NOT_FOUND
            case 500:
                return API_Errors.INTERNAL_SERVER_ERROR
            default:
                return API_Errors.UNKNOWN_ERROR
        }
    }

    if (error instanceof Error) {
        return error.message
    }

    // Обработка всех других возможных ошибок
    return String(error)
}

export default parseApiErrors