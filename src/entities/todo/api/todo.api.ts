import {inject, injectable, singleton} from "tsyringe";
import {Todo, TodoCreateType} from "./todo.type";
import {HttpService} from "../../../shared/api";
import {TodoModel} from "../model";
import { toast } from "react-toastify";


@injectable()
@singleton()
export class TodoApi {

    constructor(
        @inject(HttpService) private readonly httpService: HttpService,
        @inject(TodoModel) private readonly todoModel: TodoModel,
    ) {
        this.httpService.setCollectionPath('todo')
    }

    public async getAll (): Promise<Todo[]> {
        const todos = await this.httpService.getAll<Todo>() 
        this.todoModel.setTodos(todos)
        return todos
    }

    public async create (params: TodoCreateType, files: File[], cb: () => void): Promise<void> {
        const urls = await this.uploadFile(files)
        params.files = urls
        await this.httpService.create<TodoCreateType>(params)
        toast.success(`Успешно создан!`, {
            toastId: 'created-todo'
        })
        cb()
        await this.getAll()
    }

    public async uploadFile (files: File[]) {
        return Promise.all(
            files.map(file => this.httpService.uploadFile(file))
        )
    }

    public async update (id: string, params: Partial<TodoCreateType>, files: File[], cb: () => void): Promise<void> {

        const urls = files.length ? await this.uploadFile(files) : params.files ? params.files : []

        if(params.files){
            params.files = urls
        }
        
        await this.httpService.update(id, params)
        toast.success(`Успешно обновлен!`, {
            toastId: 'updated-todo'
        })
        cb()
        await this.getAll()
    }

    public async delete (id: string): Promise<void> {
        await this.httpService.delete(id)
        toast.success(`Успешно удален!`, {
            toastId: 'deleted-todo'
        })
        await this.getAll()
    }

    public async download (filePath: string): Promise<void> {
        await this.httpService.downloadFile(filePath)
    }
}