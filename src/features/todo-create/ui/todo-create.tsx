import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Input, TextArea} from "../../../shared/ui";
import {getInstance} from "../../../shared/lib";
import {TodoCreateModel} from "../model";
import {TodoApi} from "../../../entities/todo";

const todoCreateModel = getInstance(TodoCreateModel)
const todoApi = getInstance(TodoApi)

const TodoCreate = observer(() => {
    return (
        <div>
            <Input
                name='title'
                placeholder='Название'
                value={todoCreateModel.params.title}
                onChange={e => todoCreateModel.setParams('title', e.target.value)}
            />
            <TextArea
                placeholder='Описание'
                value={todoCreateModel.params.description}
                onChange={e => todoCreateModel.setParams('description', e.target.value)}
            />
            <Button onClick={() => todoApi.create(todoCreateModel.params)}>
                Создать
            </Button>
        </div>
    );
});

export {TodoCreate}