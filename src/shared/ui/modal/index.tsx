import React from 'react'
import { cn } from '../../lib'
import cl from './style.module.less'

export interface ModalProps {
    children?: React.ReactNode
    active: boolean
    onClose: () => void
}

export const Modal = ({ children, active, onClose }: ModalProps) => {

    return (
        <div
            className={cn(cl.modal, active ? cl.active : '')}
            onClick={onClose}
        >
            <div 
                className={cl.modal__content}
                onClick={(e) => e.stopPropagation()}
                >
                {children}
            </div>
        </div>
    )

}
