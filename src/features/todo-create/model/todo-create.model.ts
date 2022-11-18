import {inject, singleton} from "tsyringe";
import {makeAutoObservable} from "mobx";
import {TodoCreateType} from "../../../entities/todo";
import { DateLib } from "../../../shared/lib";
import React from "react";

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
        @inject(DateLib) private readonly dateLib: DateLib
    ) {
        makeAutoObservable(this, {}, {autoBind: true})
        this.setEndDate(this.dateLib.now)
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