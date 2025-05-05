class Id {
    #id;
    constructor(length = 16){
        this.#id = this.generateId(length);
    }
    generateId(length){
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        let x = "";
        for(const num of array){
            x += chars[num % chars.length];
        }
        return x;
    }
    getId(){
        return this.#id;
    }
}
export default Id;