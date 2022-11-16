import {injectable, singleton} from "tsyringe";
import {Todo} from "../api";
import {makeAutoObservable} from "mobx";

@injectable()
@singleton()
export class TodoModel {

    public todos: Todo[] = []

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    public setTodos (todos: Todo[]): void {
        this.todos = todos
    }
}