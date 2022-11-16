import React from 'react';
import cl from './style.module.less'

export interface ContainerProps {
    children?: React.ReactNode
}

const Container = ({children}: ContainerProps) => {
    return (
        <div className={cl.container}>
            {children}
        </div>
    );
};

export {Container}