export class ArrayWrapper<T> {
    //Max length
    #n: number;
    #arr: T[];
    constructor(n: number) {
        this.#arr = [];
        this.#n = n;
    }

    push(obj: T): ArrayWrapper<T> {
        this.#arr = [obj, ...this.#arr].slice(0, this.#n);
        return this;
    }

    get data(): T[] {
        return this.#arr;
    }
}