import React, { useRef } from 'react';
import { observer } from "mobx-react-lite";
import cl from './style.module.less'
import { Button, Input, TextArea } from "../../../shared/ui";
import { getInstance, cn } from "../../../shared/lib";
import { TodoCreateModel } from "../model";
import { TodoApi } from "../../../entities/todo";

const todoCreateModel = getInstance(TodoCreateModel)
const todoApi = getInstance(TodoApi)

const TodoCreate = observer(() => {
    const ref = React.createRef<HTMLInputElement>()

    const callback = () => {
        if(ref.current){
            ref.current.value = ''
        }

        todoCreateModel.refresh()
    }

    return (
        <>
            <div className={cl.block}>
                <Input
                    name='title'
                    placeholder='Название'
                    value={todoCreateModel.params.title}
                    onChange={e => todoCreateModel.setParams('title', e.target.value)}
                />
            </div>
            <div className={cl.block}>
                <TextArea
                    placeholder='Описание'
                    value={todoCreateModel.params.description}
                    onChange={e => todoCreateModel.setParams('description', e.target.value)}
                />
            </div>
            <div className={cn(cl.block, 'd-f', 'jcsb')}>
                <div className={cn('w-100')}>
                    <p className={cl.text}>Дата завершения:</p>
                    <Input
                        name='endDay'
                        placeholder='Дата завершения'
                        type='datetime-local'
                        value={todoCreateModel.date}
                        onChange={(e) => todoCreateModel.setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div className={cn(cl.block, cl.btn, 'd-f', 'aic')}>
                <div>
                    <p className={cl.text}>
                        Прикрепленные файлы: {
                            todoCreateModel.files.map(file => file.name).join(', ')
                        }
                        </p>
                    <Input
                        ref={ref}
                        name='files'
                        placeholder='Прикрепить файлы'
                        type='file'
                        multiple
                        onChange={todoCreateModel.setFiles}
                    />
                </div>
                <div className={cl.btn__wrapper}>
                    <Button onClick={() => todoApi.create(todoCreateModel.params, todoCreateModel.files, callback)}>
                        Создать
                    </Button>
                </div>
            </div>
        </>
    );
});

export { TodoCreate }