import { makeAutoObservable } from "mobx";

export default class ActivityStore {
    title = 'Hello from MobX';

    constructor() {
        makeAutoObservable(this);
    }




    setTitle = (data: string) => {
        this.title = this.title + data;
    }
}