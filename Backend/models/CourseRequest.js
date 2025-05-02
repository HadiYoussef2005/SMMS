class CourseRequest{
    #author;
    #status;
    #course;
    constructor(author, course){
        this.#author = author;
        this.#course = course;
        this.#status = "Under Review";
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