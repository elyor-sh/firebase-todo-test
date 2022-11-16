import React from 'react'
import cl from './style.module.less'

const Header = () => {
    return (
        <div className={cl.bg}>
            <div className={cl.box}>
                <div className={cl.title}>Todo App</div>
            </div>
        </div>
    );
};

export default Header