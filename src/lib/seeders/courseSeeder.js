import fs from "fs"
import path from "path"
import { loadSQL } from "../utils"

const filePath = path.join(process.cwd(), "src/data/courses.json")
const insertCoursesSQL = loadSQL("seed/insertCourses.sql")


export default function seedCourses(db) {
    const { count } = db
        .prepare("SELECT COUNT(*) as count FROM courses")
        .get()

    if (count === 0) {
        const courses = JSON.parse(
            fs.readFileSync(filePath, "utf-8")
        )

        const insert = db.prepare(insertCoursesSQL)

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
