import { $api } from '@shared/api/api'

interface IProps {
    name: string
    device?: 'desktop' | 'tablet' | 'mobile'
}

export class PageBannerApi {
    static async get(props: IProps): Promise<string> {
        try {
            const response = await $api.get<string>('/file-storage', {
                params: props,
            })

            if (!response.data) {
                throw new Error('')
            }

            return response.data
        } catch (error) {
            // return null
            throw new Error('')
        }
    }
}
