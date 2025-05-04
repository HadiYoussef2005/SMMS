import Id from './Id';

class Course {
    #id;
    #midterms;
    #courseCode;
    #author
    constructor(courseCode, midterms, author){
        let id = new Id();
        this.#id = id.getId();
        this.#courseCode = courseCode;
        this.#midterms = midterms;
        this.#author = author;
    }
    getId(){
        return this.#id;
    }
    getCourseCode(){
        return this.#courseCode;
    }
    setCourseCode(courseCode){
        this.#courseCode = courseCode;
    }
    getMidterms(){
        return this.#midterms;
    }
    setMidterms(midterms){
        this.#midterms = midterms;
    }
    addMidterm(midterm){
        this.#midterms.push(midterm);
    }
    getAuthor(){
        return this.#author;
    }
    setAuthor(author){
        this.#author = author;
    }
}
export default Course;