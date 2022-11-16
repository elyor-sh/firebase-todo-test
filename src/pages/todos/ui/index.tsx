import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {getInstance} from "../../../shared/lib";
import {TodoApi} from "../../../entities/todo";
import {TodoModel} from "../../../entities/todo/model";
import {TodoCard} from "../../../entities/todo/ui";
import {TodoCreate} from "../../../features/todo-create";
import {Container} from "../../../shared/ui";

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
            <Container>
                <TodoCreate />
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
            </Container>
        </>
    );
});

export {TodosPage}