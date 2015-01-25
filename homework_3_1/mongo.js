var mongo = require("mongodb").MongoClient;
mongo.connect("mongodb://localhost:27017/school", function (err, db) {
    db.collection("students").find({}, function (err, students) {
        students.toArray(function (err, students) {
            if (err)
                throw err;
            students.forEach(function (student) {
                var lowestScore = null;
                student.scores.forEach(function (score) {
                    if (score.type === "homework") {
                        if (lowestScore === null || lowestScore.score > score.score) {
                            lowestScore = score;
                        }
                    }
                });
                console.log("removing lowestScore of " + lowestScore.type +" "+ lowestScore.score);
                db.collection("students").update(student, {$pullAll: {scores: [lowestScore]}}, function (err, status) {
                    if (err)
                       throw err;
                });
            });
        });
    });
});
