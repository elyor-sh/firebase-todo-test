import React from 'react';
import cl from './style.module.less'
import {cn} from "../../lib";

interface Props {
    children: React.ReactNode
    className?: string
}

export const Card = ({children, className}: Props) => {
    return (
        <div className={cn(cl.card, className || '')}>
            {children}
        </div>
    );
};