import db from "@/lib/dbsetup"
import CoursesList from "./CoursesList"

async function getCourses() {
    const sql = "SELECT * FROM courses ORDER BY id ASC"
    
    try{
        return db.prepare(sql).all()
        
    } catch (e) {
        
        console.error("Failed to fetch courses", e)
        return []
        
    }
}
    

export default async function Courses() {

    const courses = await getCourses()



    return (

        <div>

            <p>Courses</p>
            <CoursesList courses={courses} />
        </div>

    )
}