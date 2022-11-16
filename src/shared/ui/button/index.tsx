import React, {ButtonHTMLAttributes} from 'react'
import cl from './style.module.less'
import {cn} from "../../lib";

interface Props extends ButtonHTMLAttributes<any>{
    children?: React.ReactNode
    variant?: 'standard' | 'circle' | 'icon'
}

export const Button = ({children, variant = 'standard', ...rest}: Props) => {
    return (
        <button
            {...rest}
            className={cn(cl.button, cl[variant], rest.className || '')}
        >
            {children}
        </button>
    );
};