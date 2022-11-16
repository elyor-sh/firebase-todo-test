import React from 'react'
import cl from './style.module.less'
import {Card} from "../../../shared/ui"
import {cn} from "../../../shared/lib"
import {Todo} from "../api";

interface Props {
    checkbox: React.ReactNode
    button: React.ReactNode
    data: Todo
}

export const TodoRow = ({checkbox, data, button}: Props) => {

    return (
        <Card className={cn(data.done ? cl.completed : '')}>
            <div className={cn('d-f', 'aic')}>
                {checkbox}
                <div className={cn(cl.title)}>
                   {data.title}
                </div>
            </div>
            {button}
        </Card>
    );
};
