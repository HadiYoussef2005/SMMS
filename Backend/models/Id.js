class Id {
    #id;
    constructor(length = 16){
        this.#id = "";
        this.generateId(length);
    }
    generateId(length){
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        for(const num of array){
            this.#id += chars[num % chars.length];
        }
    }
    getId(){
        return this.#id;
    }
}
export default Id;