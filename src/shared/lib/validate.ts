import {injectable, singleton} from "tsyringe"

@singleton()
@injectable()
export class Validate {

    public notEmpty (name: string): boolean {
        if(!name){
            return  false
        }

        return name.length > 0
    }

}