import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "src/data/courses.json")

export default function seedCourses(db) {
    const { count } = db
        .prepare("SELECT COUNT(*) as count FROM courses")
        .get()

    if (count === 0) {
        const courses = JSON.parse(
            fs.readFileSync(filePath, "utf-8")
        )

        const insert = db.prepare(`
            INSERT INTO courses (
                title,
                subTitle,
                description,
                course_slug,
                original_price,
                courseRating,
                numberOfStudents,
                duration,
                language,
                big_image,
                is_paid,
                isBestseller,
                thingsToLearn,
                courseCurriculum
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)

        const insertMany = db.transaction((courses) => {
            for (const course of courses) {
                insert.run(
                    course.title,
                    course.subTitle,
                    course.description,
                    course.course_slug,
                    course.original_price,
                    course.courseRating,
                    course.numberOfStudents,
                    course.duration,
                    course.language,
                    course.big_image,
                    course.is_paid,
                    course.isBestseller,
                    course.thingsToLearn,
                    course.courseCurriculum
                )
            }
        })

        insertMany(courses)
    }
}
