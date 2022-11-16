import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {getInstance} from "../../../shared/lib";
import {TodoApi} from "../../../entities/todo";
import {TodoModel} from "../../../entities/todo/model";
import {TodoCard} from "../../../entities/todo/ui";

const todoApi = getInstance(TodoApi)
const todoModel = getInstance(TodoModel)

const TodosPage = observer(() => {

    useEffect(() => {
        (async () => {
            await todoApi.getAll()
        })()
    }, [])

    return (
        <>
            {
                todoModel.todos.map(todo => (
                    <TodoCard
                        key={todo.id}
                        data={todo}
                        handleCompleted={(t) => {}}
                        handleDelete={() => {}}
                    />
                ))
            }
        </>
    );
});

export {TodosPage}