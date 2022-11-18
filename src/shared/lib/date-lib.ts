import { injectable, singleton } from "tsyringe";
import dayjs from 'dayjs'

@singleton()
@injectable()
export class DateLib {

    private dayLib = dayjs

    public inputTimeFormat = 'YYYY-MM-DDTHH:mm'

    public get now (): string {
        
        return this.dayLib().format(this.inputTimeFormat)
    }

    public dateToSeconds (date: string | number): number {
        
        return this.dayLib(date).unix() * 1000
    }

    public toinputFormat (date: string | number): string {
        return this.dayLib(date).format(this.inputTimeFormat)
    }

    public isBefore (date: string | number): boolean {
        return this.dayLib(date).isBefore(this.dayLib())
    }

}