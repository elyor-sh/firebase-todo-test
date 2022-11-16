import {inject, injectable, singleton} from "tsyringe";
import {Todo} from "./todo.type";
import {HttpService} from "../../../shared/api";
import {TodoModel} from "../model";


@injectable()
@singleton()
export class TodoApi {

    constructor(
        @inject(HttpService) private readonly httpService: HttpService,
        @inject(TodoModel) private readonly todoModel: TodoModel
    ) {
        this.httpService.setCollectionPath('todo')
    }

    public async getAll (): Promise<Todo[]> {
        const todos = await this.httpService.getAll<Todo>()
        this.todoModel.setTodos(todos)
    }
}