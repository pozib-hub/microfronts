import React, {
    FC, memo, useCallback,
} from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { DynamicModuleLoader } from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { Input } from '@shared/ui/Input/Input'
import { Button } from '@shared/ui/Button/Button'
import { Text } from '@shared/ui/Text/Text'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'

import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'

import styles from './LoginForm.module.scss'

const asyncReducers = {
    loginForm: loginReducer,
}

interface ILoginFormProps {
    className?: string
    onSuccess: () => void
}
const LoginForm: FC<ILoginFormProps> = (props) => {
    const {
        className,
        onSuccess,
    } = props

    const dispatch = useAppDispatch()
    const { t } = useTranslation(["auth", "errors"])

    const {
        username = "",
        password = "",
        isLoading = false,
        error = "",
    } = useSelector(getLoginState) || {}

    const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setUsername(e.target.value))
    }, [dispatch])

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(e.target.value))
    }, [dispatch])

    const onSubmit = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }))

        if (result.meta.requestStatus === "fulfilled") {
            onSuccess()
        }
    }, [onSuccess, dispatch, password, username])


    return (
        <DynamicModuleLoader reducers={asyncReducers} shouldAfterUnmount={false}>
            <div className={cn(styles.LoginFrom, className)}>
                <Text className={styles.title}>{t('form.title')}</Text>
                <Input
                    autoFocus
                    required
                    disabled={isLoading}
                    type="text"
                    variant="outline"
                    label={t('form.inputs.username')}
                    value={username}
                    onChange={onChangeUsername}
                />
                <Input
                    required
                    disabled={isLoading}
                    label={t('form.inputs.password')}
                    type="password"
                    variant="outline"
                    value={password}
                    onChange={onChangePassword}
                />
                <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    variant="primary"
                    onClick={onSubmit}>
                    {t('signIn')}
                </Button>
                <Text color="red">{t(`${error}`, { ns: "errors" })}</Text>
            </div>
        </DynamicModuleLoader>

    )
}

export default memo(LoginForm)
