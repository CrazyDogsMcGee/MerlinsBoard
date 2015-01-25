json.(@course, :name, :location, :start_time, :end_time, :day, :description)

json.instructors @course.instructors do |instructor|
	json.id instructor.id
	json.lname instructor.lname
	json.fname instructor.fname
end

json.enrollments @course.courses_students do |enrollment|
	json.id enrollment.id
	json.user_id enrollment.user_id
	json.course_id enrollment.course_id
end

json.students @course.students do |student|
	json.id student.id
	json.fname student.fname
	json.lname student.lname
end