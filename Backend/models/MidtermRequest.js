import Id from '../services/Id.js';

class MidtermRequest {
    #id;
    #author;
    #status;
    #courseCode;
    #proposedDate;
    #duration;
    #rejectionReason;

    constructor(author, courseCode, proposedDate, duration) {
        this.#id = new Id().getId();
        this.#author = author;
        this.#courseCode = courseCode;
        this.#proposedDate = proposedDate;
        this.#duration = duration;
        this.#status = "Under Review";
        this.#rejectionReason = null;
    }

    getId() {
        return this.#id;
    }

    getAuthor() {
        return this.#author;
    }

    getCourseCode() {
        return this.#courseCode;
    }

    getProposedDate() {
        return this.#proposedDate;
    }

    getDuration() {
        return this.#duration;
    }

    getStatus() {
        return this.#status;
    }

    getRejectionReason() {
        return this.#rejectionReason;
    }

    setStatus(status) {
        this.#status = status;
    }

    setRejectionReason(reason) {
        this.#rejectionReason = reason;
    }

    toObject() {
        return {
            _id: this.#id,
            author: this.#author,
            courseCode: this.#courseCode,
            proposedDate: this.#proposedDate,
            duration: this.#duration,
            status: this.#status,
            rejectionReason: this.#rejectionReason
        };
    }
}

export default MidtermRequest;
