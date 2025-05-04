import Id from '../services/Id';

class Notification{
    #id;
    #recipient;
    #subject;
    #body;
    constructor(recipient, subject, body){
        let id = new Id();
        this.#id = id.getId();
        this.#recipient = recipient;
        this.#subject = subject;
        this.#body = body;
    }
    getId(){
        return this.#id;
    }
    getRecipient(){
        return this.#recipient;
    }
    setRecipient(recipient){
        this.#recipient = recipient;
    }
    getSubject(){
        return this.#subject;
    }
    setSubject(subject){
        this.#subject = subject;
    }
    getBody(){
        return this.#body;
    }
    setBody(body){
        this.#body = body;
    }
}
export default Notification