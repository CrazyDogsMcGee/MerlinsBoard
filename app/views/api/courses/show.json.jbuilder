json.(@course, :id, :name, :location, :day, :description)
json.start_time Course.parsed_time(@course.start_time)
json.end_time Course.parsed_time(@course.end_time)
json.instructors @course.instructors do |instructor|
	json.id instructor.id
	json.lname instructor.lname
	json.fname instructor.fname
end

if has_course_access_view(current_user)
  
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

  json.announcements @course.announcements do |announcement|
    json.id announcement.id
    json.title announcement.title
    json.body announcement.body
    json.user_id announcement.user_id
  end

  json.assignments @course.assignments do |assignment|
    json.id assignment.id
    json.title assignment.title
    json.description assignment.description
    json.due_date assignment.due_date
  end

end
