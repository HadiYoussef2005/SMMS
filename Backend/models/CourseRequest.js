import Id from './Id';

class CourseRequest{
    #id;
    #author;
    #status;
    #course;
    constructor(author, course){
        let id = new Id();
        this.#id = id.getId();
        this.#author = author;
        this.#course = course;
        this.#status = "Under Review";
    }
    getId(){
        return this.#id;
    }
    getAuthor(){
        return this.#author;
    }
    setAuthor(author){
        this.#author = author;
    }
    getCourse(){
        return this.#course;
    }
    setCourse(course){
        this.#course = course
    }
    getStatus(){
        return this.#status;
    }
    setStatus(status){
        this.#status = status;
    }
}
export default CourseRequest;