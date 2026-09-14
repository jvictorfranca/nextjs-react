"use client"

import CourseCard from "./CourseCard";


export default function CoursesList ({courses}) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}