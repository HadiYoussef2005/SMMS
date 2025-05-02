class ConflictChecker{
    checkConflicts(courses){
        let midterms = []
        for(let course of courses){
            for(midterm of course.getMidterms()){
                midterms.push(midterm);
            }
        }
        midterms = midterms.filter(midterm => ConflictChecker.isValidDate(midterm.getDate()));
        midterms.sort((a, b) => new Date(a.getDate()) - new Date(b.getDate()));
        let conflicts = [];
        for(let i = 0; i < midterms.length; i++){
            let current = midterms[i];
            let startA = new Date(current.getDate());
            let endA = new Date(startA.getTime() + current.getDuration() * 60000);
            for (let j = i + 1; j < midterms.length; j++){
                let next = midterms[j];
                let startB = new Date(next.getDate());

                if (startB >= endA) break;

                conflicts.push({ midtermA: current, midtermB: next });
            }
        }
        return conflicts;
    }

    static isValidDate(value) {
        const d = new Date(value);
        return d instanceof Date && !isNaN(d.getTime());
    };
    
}