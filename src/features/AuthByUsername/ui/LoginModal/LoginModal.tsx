import React, { FC, Suspense } from 'react'

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import cn from 'shared/lib/classNames/classNames'
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice'
import { Modal } from 'shared/ui/Modal/Modal'
import { Loader } from 'shared/ui/Loader/Loader'
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy'

import styles from './LoginModal.module.scss'

interface ILoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}
export const LoginModal: FC<ILoginModalProps> = (props) => {
    const {
        className,
        isOpen,
        onClose,
    } = props

    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(loginActions.clearForm())
        onClose()
    }

    return (
        <Modal
            classNames={{ wrapper: cn(styles.LoginModal, className) }}
            isOpen={isOpen}
            onClose={handleClose}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormLazy onSuccess={handleClose} />
            </Suspense>
        </Modal>
    )
}
