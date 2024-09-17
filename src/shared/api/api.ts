import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'


const cbConfig =
    (config: InternalAxiosRequestConfig):
        Promise<InternalAxiosRequestConfig<any>> | InternalAxiosRequestConfig<any> => {
        if (__PROJECT__ === "storybook") {
            return new Promise((_, reject) => {
                reject(new axios.Cancel("CANCEL_STORYBOOK"))
            })
        }

        return config
    }

const $api = axios.create({
    baseURL: process.env.URL_API,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
})

console.log({ URL_API: process.env.URL_API })


$api.interceptors.request.use(cbConfig)

export { $api }

