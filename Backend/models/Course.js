class Course {
    #midterms;
    #courseCode;
    #author
    constructor(courseCode, midterms, author){
        this.#courseCode = courseCode;
        this.#midterms = midterms;
        this.#author = author;
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