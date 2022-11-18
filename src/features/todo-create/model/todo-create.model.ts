import {inject, singleton} from "tsyringe";
import {makeAutoObservable} from "mobx";
import React from "react";
import {TodoCreateType} from "../../../entities/todo";
import { DateLib, Validate } from "../../../shared/lib";

@singleton()
export class TodoCreateModel {

    public date: string = ''

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

    public setParams (key: keyof TodoCreateType, value: any): void {
        this.params = {
            ...this.params,
            [key]: value
        }
    }

    public setEndDate (date: string): void {
        this.date = this.dateLib.toinputFormat(date)
        this.params.endDate.seconds = this.dateLib.dateToSeconds(date)
    }

    public setFiles (e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files){
            this.files = [...e.target.files]
        }
    }

    public refresh (): void {
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

        this.setEndDate(this.dateLib.now)

        this.files = []
    }
}