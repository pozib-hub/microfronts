import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'
import { SubdivisionForm } from '@features/SubdivisionForm'
import { ISubdivision, useEditSubdivision, useSubdivision } from '@entities/Subdivision'
import { showNotification } from '@shared/ui/Notification'
import { Text } from '@shared/ui/Text'
import { HStack } from '@shared/ui/Stack'
import { routePath } from '@shared/const/router'

import styles from './SubdivisionEditPage.module.scss'

interface IAboutPage {
    className?: string
}

const SubdivisionEditPage = (props: IAboutPage) => {
    const { className } = props
    const { id = '' } = useParams()

    const { t } = useTranslation(['pages', 'subdivisions'])
    const navigate = useNavigate()

    const { data, isLoading } = useSubdivision({ id }, { refetchOnMountOrArgChange: 0.1 })
    const [updateSubdivision, { isLoading: isLoadingUpdating }] = useEditSubdivision()

    const onSubmit = async (form: ISubdivision) => {
        try {
            await updateSubdivision({ form })
            showNotification({ variant: 'success' })
            navigate(routePath.subdivisionsList)
        } catch (error) {
            showNotification({
                variant: 'error',
                text: t('edit.errors.update', { ns: 'subdivisions' }),
            })
        }
    }

    const onCancel = () => {
        navigate(routePath.subdivisionsList)
    }

    if (!isLoading && !data) {
        return (
            <HStack
                fullHeight
                fullWidth
                justify="center"
                align="center"
                data-testid="SubdivisionEditPage"
                className={cn(styles.page, className)}
            >
                <Text size="l" bold>
                    {t('pageEditSubdivision.errors.fetch', { ns: 'pages' })}
                </Text>
            </HStack>
        )
    }

    return (
        <div data-testid="SubdivisionEditPage" className={cn(styles.page, className)}>
            <Text bold>{t('pageEditSubdivision.header', { name: data?.name, ns: 'pages' })}</Text>
            <SubdivisionForm
                action="update"
                isLoadingSubmit={isLoadingUpdating}
                isLoadingData={isLoading}
                defaultData={data}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </div>
    )
}

export default SubdivisionEditPage
