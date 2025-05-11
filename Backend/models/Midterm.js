class Midterm {
    #date;
    #courseCode;
    #author;
    #duration;

    constructor(date, courseCode, author, duration) {
        this.#date = date;
        this.#courseCode = courseCode;
        this.#author = author;
        this.#duration = duration;
    }

    getDate() {
        return this.#date;
    }

    setDate(date) {
        this.#date = date;
    }

    getCourseCode() {
        return this.#courseCode;
    }

    setCourseCode(courseCode) {
        this.#courseCode = courseCode;
    }

    getAuthor() {
        return this.#author;
    }

    setAuthor(author) {
        this.#author = author;
    }

    getDuration() {
        return this.#duration;
    }

    setDuration(duration) {
        this.#duration = duration;
    }

    toObject() {
        return {
            date: this.#date,
            courseCode: this.#courseCode,
            author: this.#author,
            duration: this.#duration,
        };
    }
}

export default Midterm;
