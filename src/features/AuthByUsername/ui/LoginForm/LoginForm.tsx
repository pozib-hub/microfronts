import React, {
    FC, memo, useCallback,
} from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import cn from 'shared/lib/classNames/classNames'

import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState'
import {
    loginByUsername,
} from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'

import { Text } from 'shared/ui/Text/Text'
import { DynamicModuleLoader } from 'shared/components/DynamicModuleLoader/DynamicModuleLoader'
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
    const { t } = useTranslation()

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
                <Text>{t('Авторизация')}</Text>
                <Input
                    autoFocus
                    required
                    type="text" variant="outline"
                    label={t('username')}
                    value={username}
                    onChange={onChangeUsername}
                />
                <Input
                    required
                    label={t('password')}
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