import User from '../models/User.js';
import Student from '../models/Student.js';

class UserFactory {
    static buildUserFromData(data) {
        if (!data || !data.type) return null;

        const {
            _id,
            firstName,
            lastName,
            email,
            password,
            isAdmin,
            section,
            isYearRep,
            courses,
            notifications = [],
            submissionHistory = []
        } = data;

        if (data.type === "Student") {
            const student = new Student(_id, firstName, lastName, email, password, isAdmin, "Student", section, isYearRep);
            student.setNotifications(notifications);
            student.setSubmissionHistory(submissionHistory);
            student.setCourses(courses || []);
            return student;
        }

        const user = new User(_id, firstName, lastName, email, password, isAdmin, "User");
        user.setNotifications(notifications);
        user.setSubmissionHistory(submissionHistory);
        return user;
    }
}

export default UserFactory;
