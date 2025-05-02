class Notification{
    #recipient;
    #subject;
    #body;
    constructor(recipient, subject, body){
        this.#recipient = recipient;
        this.#subject = subject;
        this.#body = body;
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