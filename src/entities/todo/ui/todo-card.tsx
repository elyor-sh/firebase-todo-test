import React from 'react';
import cl from './style.module.less'
import {DeleteButton, Input} from "../../../shared/ui";
import {cn} from "../../../shared/lib";
import {Todo} from "../api";
import {TodoRow} from "./todo-row";

interface Props {
    data: Todo
    handleCompleted: (data: Todo) => void
    handleDelete: () => void
}

export const TodoCard = ({data, handleCompleted, handleDelete}: Props) => {

    return (
        <>
            <TodoRow
                checkbox={
                    <Input
                        type='checkbox'
                        checked={data.done}
                        onChange={(e) => handleCompleted({...data, done: e.target.checked})}
                        blockClassName={cn(cl.input)}
                    />
                }
                data={data}
                linkHref={`/todos/${data.id}`}
                button={<DeleteButton onClick={handleDelete}/>}
            />
        </>
    );
};