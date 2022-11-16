import {container, InjectionToken} from "tsyringe";

export function getInstance<T>(token: InjectionToken<T>) {
    return container.resolve(token)
}