import React from 'react';
import { observer } from "mobx-react-lite";
import cl from './style.module.less'
import { Button, CloseButton, Input, Modal, TextArea } from "../../../shared/ui";
import { getInstance, cn } from "../../../shared/lib";
import { TodoUpdateModel } from "../model";
import { TodoApi } from "../../../entities/todo";

const todoUpdateModel = getInstance(TodoUpdateModel)
const todoApi = getInstance(TodoApi)

const TodoUpdate = observer(() => {

    return (
        <>
            <Modal
                active={todoUpdateModel.openModal}
                onClose={todoUpdateModel.handleCloseModal}
            >
                <div className={cn('d-f', 'jcfe')}>
                    <CloseButton onClick={todoUpdateModel.handleCloseModal} />
                </div>
                <div className={cl.block}>
                    <Input
                        name='title'
                        placeholder='Название'
                        value={todoUpdateModel.params.title}
                        onChange={e => todoUpdateModel.setParams('title', e.target.value)}
                    />
                </div>
                <div className={cl.block}>
                    <TextArea
                        placeholder='Описание'
                        value={todoUpdateModel.params.description}
                        onChange={e => todoUpdateModel.setParams('description', e.target.value)}
                    />
                </div>
                <div className={cn(cl.block, 'd-f', 'jcsb')}>
                    <div className={cn('w-100')}>
                        <p className={cl.text}>Дата завершения:</p>
                        <Input
                            name='endDay'
                            placeholder='Дата завершения'
                            type='datetime-local'
                            value={todoUpdateModel.date}
                            onChange={(e) => todoUpdateModel.setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cn(cl.block, 'd-f', 'jcsb')}>
                    <div className={cn('w-100')}>
                        <p className={cl.text}>
                            Загрузить прикрепленных файлов
                        </p>
                        {
                            todoUpdateModel.params.files.map(file => (
                                <span onClick={() => todoApi.download(file)} className={cl.link} key={file}>{file.split('&sep1&')[1]}</span>
                            ))
                        }
                    </div>
                </div>
                <div className={cn(cl.block, cl.btn, 'd-f', 'aic')}>
                    <div>
                        <p className={cl.text}>
                            Прикрепленные файлы: {
                                todoUpdateModel.files.map(file => file.name).join(', ')
                            }
                        </p>
                        <Input
                            name='files'
                            placeholder='Прикрепить файлы'
                            type='file'
                            multiple
                            onChange={todoUpdateModel.setFiles}
                        />
                    </div>
                    <div className={cl.btn__wrapper}>
                        <Button onClick={() => todoApi.update(todoUpdateModel.todoId, todoUpdateModel.params, todoUpdateModel.files, todoUpdateModel.refresh)}>
                            Сохранить
                        </Button>
                    </div>
                </div>
            </Modal>

        </>
    );
});

export { TodoUpdate }