import {FireDateType} from "../../../shared/config";

export type Todo = {
    id: string
    title: string
    description: string
    files: string[]
    endDate: FireDateType
}