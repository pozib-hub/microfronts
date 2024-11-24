import React, { FC, Suspense } from 'react'

import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import cn from '@shared/lib/classNames/classNames'
import { Modal } from '@shared/ui/Modal/Modal'
import { Loader } from '@shared/ui/Loader/Loader'
import { loginActions } from '../../model/slice/loginSlice'
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy'

import styles from './LoginModal.module.scss'

interface ILoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    onChangeClose?: (open: boolean) => void
}
export const LoginModal: FC<ILoginModalProps> = (props) => {
    const { className, isOpen, onClose, onChangeClose } = props

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
            // onChangeClose={onChangeClose}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormLazy onSuccess={handleClose} />
            </Suspense>
        </Modal>
    )
}
