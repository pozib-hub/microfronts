import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'
import { SubdivisionForm } from '@features/SubdivisionForm'
import { ISubdivision, useCreateSubdivision } from '@entities/Subdivision'
import { showNotification } from '@shared/ui/Notification'
import { Text } from '@shared/ui/Text'
import { routePath } from '@shared/const/router'

import styles from './SubdivisionCreatePage.module.scss'

interface IAboutPage {
    className?: string
}

const SubdivisionCreatePage = (props: IAboutPage) => {
    const { className } = props

    const { t } = useTranslation(['pages', 'subdivisions'])
    const navigate = useNavigate()

    const [createSubdivision, { isLoading }] = useCreateSubdivision()

    const onSubmit = async (form: ISubdivision) => {
        try {
            await createSubdivision({ form })
            showNotification({ variant: 'success' })
            navigate(routePath.subdivisionsList)
        } catch (error) {
            showNotification({ variant: 'error', text: 'Не удалось создать подразделение' })
        }
    }

    const onCancel = () => {
        navigate(routePath.subdivisionsList)
    }

    return (
        <div data-testid="SubdivisionCreatePage" className={cn(styles.page, className)}>
            <Text bold>{t('pageCreateSubdivision.header', { ns: 'pages' })}</Text>
            <SubdivisionForm
                action="create"
                isLoadingSubmit={isLoading}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </div>
    )
}

export default SubdivisionCreatePage
