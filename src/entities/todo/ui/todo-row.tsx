import React from 'react'
import cl from './style.module.less'
import { Card } from "../../../shared/ui"
import { cn, DateLib, getInstance } from "../../../shared/lib"
import { Todo } from "../api";

const dateLib = getInstance(DateLib)

interface Props {
    checkbox: React.ReactNode
    button: React.ReactNode
    data: Todo
}

export const TodoRow = ({ checkbox, data, button }: Props) => {

    return (
        <Card className={cn((data.done || dateLib.isBefore(data.endDate.seconds + data.endDate.nanoseconds / Math.pow(10, -9))) ? cl.completed : '')}>
            <div className={cn('d-f', 'aic')}>
                {checkbox}
                <div className={cn(cl.title)}>
                    {data.title}
                    <span className={cl.end}>
                        {dateLib.isBefore(data.endDate.seconds + data.endDate.nanoseconds / Math.pow(10, -9)) ? '(Срок истек)' : ''}
                    </span>
                </div>
            </div>
            {button}
        </Card>
    );
};
