import { makeAutoObservable } from "mobx";
import { inject, injectable, singleton } from "tsyringe";
import { Todo, TodoCreateType } from "../../../entities/todo";
import { DateLib, Validate } from "../../../shared/lib";

@singleton()
@injectable()
export class TodoUpdateModel {

    public openModal: boolean = false

    public date: string = ''

    public todoId: string = ''

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

    public files: File[] = []

    constructor(
        @inject(DateLib) private readonly dateLib: DateLib,
        @inject(Validate) private readonly validate: Validate
    ) {
        makeAutoObservable(this, {}, {autoBind: true})
        this.setEndDate(this.dateLib.now)
    }

    public get disabled (): boolean {
        return !this.validate.notEmpty(this.params.title)
    }

    public setOpenModal (p: boolean): void {
        this.openModal = p
    }

    public handleOpenModal (todo: Todo): void {

        this.todoId = todo.id
        
        this.params = {
            ...this.params,
            endDate: {
                nanoseconds: todo.endDate.nanoseconds,
                seconds: todo.endDate.seconds
            },
            done: todo.done,
            title: todo.title,
            description: todo.description,
            files: todo.files
        }

        this.date = this.dateLib.toinputFormat(todo.endDate.seconds)

        this.setOpenModal(true)
    }

    public setTodoId (id: string): void {
        this.todoId = id
    }

    public handleCloseModal (): void {
        this.setOpenModal(false)
        this.refresh()
    }

    public setParams (key: keyof TodoCreateType, value: any): void {
        this.params = {
            ...this.params,
            [key]: value
        }
    }

    public setEndDate (date: string | number): void {
        this.date = this.dateLib.toinputFormat(date)
        this.params.endDate.seconds = this.dateLib.dateToSeconds(date)
    }

    public setFiles (e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files){
            this.files = [...e.target.files]
        }
    }

    public refreshParams (): void  {
        this.params = {
            title: '',
            description: '',
            done: false,
            files: [],
            endDate: {
                nanoseconds: 0,
                seconds: 0
            }
        }
    }

    public refreshFiles (): void {
        this.files = []
    }

    public refresh (): void {

        this.setOpenModal(false)

        this.refreshParams()

        this.setEndDate(this.dateLib.now)

        this.refreshFiles()

        this.setTodoId('')
    }


}