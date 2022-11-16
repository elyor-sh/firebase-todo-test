import {singleton} from "tsyringe";
import {makeAutoObservable} from "mobx";
import {TodoCreateType} from "../../../entities/todo";

@singleton()
export class TodoCreateModel {

    public params: TodoCreateType = {
        title: '',
        description: '',
        done: false,
        files: [],
        endDate: {
            nanoseconds: 0,
            seconds: 0
        }
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    public setParams (key: keyof TodoCreateType, value: any): void {
        this.params[key] = value
    }
}