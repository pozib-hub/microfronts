import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { SubdivisionList } from '@entities/Subdivision'
import { HStack } from '@shared/ui/Stack'
import { Text } from '@shared/ui/Text'
import { Icon } from '@shared/ui/Icon'
import { routePath } from '@shared/const/router'

import styles from './SubdivisionsListPage.module.scss'

interface IAboutPage {
    className?: string
}

const SubdivisionsListPage = (props: IAboutPage) => {
    const { className } = props

    const { t } = useTranslation('pages')
    const navigate = useNavigate()

    const onGoToCreate = () => {
        navigate(routePath.subdivisionCreate)
    }

    return (
        <div data-testid="SubdivisionsListPage" className={cn(styles.page, className)}>
            <HStack gap={4}>
                <Text size="l">{t('pageListSubdivisions.header')}</Text>
                <Icon clickable id="PlusCircle" color="green" onClick={onGoToCreate} />
            </HStack>
            <SubdivisionList />
        </div>
    )
}

export default SubdivisionsListPage
