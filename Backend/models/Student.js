import User from './User';
import Encryptor from '../services/Encryptor';
import Id from '../services/Id';

class Student extends User {
    #section;
    #isYearRep;
    #courses;
    constructor(id, firstName, lastName, email, password, isAdmin, section, isYearRep){
        super(id, firstName, lastName, email, password, isAdmin);
        this.#section = section;
        this.#isYearRep = isYearRep;
        this.#courses = [];
    }
    static async create(firstName, lastName, email, rawPassword, isAdmin, section, isYearRep) {
        const encryptor = new Encryptor();
        const hashedPassword = await encryptor.hashPassword(rawPassword);
        const id = new Id();
        return new Student(id.getId(), firstName, lastName, email, hashedPassword, isAdmin, section, isYearRep);
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
    toObject() {
        return {
            id: this.getId(),
            username: this.getUsername(),
            email: this.getEmail(),
            password: this.getPassword(), 
            isAdmin: this.isAdmin(),
            section: this.getSection(),
            isYearRep: this.isYearRep(),
            courses: this.getCourses(),
            notifications: this.getNotifications(),
            submissionHistory: this.getSubmissionHistory(),
            courses: this.getCourses(),
            section: this.getSection(),
            isYearRep: this.#isYearRep()
        };
    }
    
}
export default Student;