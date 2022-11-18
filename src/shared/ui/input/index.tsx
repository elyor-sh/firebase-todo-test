import React, {forwardRef, InputHTMLAttributes} from 'react'
import cl from './style.module.less'
import {cn} from "../../lib"

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    valid?: boolean
    errorText?: string
    blockClassName?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(({valid = true, errorText = '', blockClassName = '',  ...rest}, ref) => {
    return (
        <div className={cn(cl.block, blockClassName)}>
            <input
                ref={ref}
                {...rest}
                className={cn(cl.input, !valid ? cl.error : '', rest.className || '')}
            />
            {
                !valid && <span className={cn(cl.errorText)}>{errorText}</span>
            }
        </div>
    );
});

export default Input