import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {getInstance} from "../../../shared/lib";
import {TodoApi} from "../../../entities/todo";
import {TodoModel} from "../../../entities/todo/model";
import {TodoCard} from "../../../entities/todo/ui";
import {TodoCreate, TodoUpdate, TodoUpdateModel} from "../../../features/todo-create";
import {Container} from "../../../shared/ui";

const todoApi = getInstance(TodoApi)
const todoModel = getInstance(TodoModel)
const todoUpdateModel = getInstance(TodoUpdateModel)

const TodosPage = observer(() => {

    useEffect(() => {
        (async () => {
            await todoApi.getAll()
        })()
    }, [])

    return (
        <>
            <Container>
                <TodoCreate />
                <TodoUpdate />
                {
                    todoModel.todos.map(todo => (
                        <TodoCard
                            key={todo.id}
                            data={todo}
                            handleCompleted={(t) => todoApi.update(t.id, {done: t.done}, [], () => {})}
                            handleDelete={() => todoApi.delete(todo.id)}
                            handleView={todoUpdateModel.handleOpenModal}
                        />
                    ))
                }
            </Container>
        </>
    );
});

export {TodosPage}