import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {getInstance} from "../../../shared/lib";
import {TodoApi} from "../../../entities/todo";
import {TodoModel} from "../../../entities/todo/model";

const todoApi = getInstance(TodoApi)
const todoModel = getInstance(TodoModel)

const TodosPage = observer(() => {

    console.log('todos', todoModel.todos)

    useEffect(() => {
        (async () => {
            await todoApi.getAll()
        })()
    }, [])

    return (
        <>

        </>
    );
});

export {TodosPage}