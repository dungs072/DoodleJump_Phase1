import PublisherInterface from "../../types/observer/publisher";
import SubcriberInterface from "../../types/observer/subcriber";

class Publisher<T> implements PublisherInterface<T>{
    private subcribers: SubcriberInterface<T>[] = [];
    private data: T;
    public subcribe(subcriber: SubcriberInterface<T>): void {
        this.subcribers.push(subcriber)
    }
    public unsubcribe(subcriber: SubcriberInterface<T>): void {
        let index = this.subcribers.indexOf(subcriber);
        if(index>-1){
            this.subcribers.splice(index, 1);
        }
    }
    public notify(): void {
        for(let subcriber of this.subcribers){
            subcriber.receive(this.data);
        }
    }
    public setData(data: T): void{
        this.data = data;
    }
    public getData(): T{
        return this.data;
    }
    public getSubcribers(): SubcriberInterface<T>[]{
        return this.subcribers;
    }

}
export default Publisher;