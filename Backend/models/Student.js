import User from './User';

class Student extends User {
    #section;
    #isYearRep;
    #courses;
    constructor(firstName, lastName, email, password, isAdmin, section, isYearRep){
        super(firstName, lastName, email, password, isAdmin);
        this.#section = section;
        this.#isYearRep = isYearRep;
        this.#courses = [];
    }
    getSection(){
        return this.#section;
    }
    setSection(section){
        this.#section = section;
    }
    isYearRep(){
        return this.#isYearRep;
    }
    setIsYearRep(isYearRep){
        this.#isYearRep = isYearRep;
    }
    setCourses(courses){
        this.#courses = courses;
    }
    getCourses(){
        return this.#courses;
    }
    addCourse(course){
        this.#courses.push(course);
    }
    clearCourses(){
        this.#courses = []
    }
}
export default Student;