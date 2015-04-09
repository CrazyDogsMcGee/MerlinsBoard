json.(@course, :id, :name, :location, :day, :description)
json.start_time Course.parsed_time(@course.start_time)
json.end_time Course.parsed_time(@course.end_time)
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

access = course_access_view(current_user)

if (access == :student) || (access == :instructor)
  json.announcements @course.announcements do |announcement|
    json.id announcement.id
    json.title announcement.title
    json.body announcement.body
    json.user_id announcement.user_id
    json.course_id announcement.course_id
  end

  json.assignments @course.assignments do |assignment|
    json.id assignment.id
    json.title assignment.title
    json.description assignment.description
    json.due_date assignment.due_date
    json.course_id assignment.course_id
  end
  
  json.resources @course.resources do |resource|
    json.id resource.id
    json.name resource.name
    json.description resource.description
    json.url resource.document.url
  end

end

if (access == :instructor)
  json.professorships @course.courses_instructors do |professorship|
    json.id professorship.id
    json.course_id professorship.course_id
    json.user_id professorship.user_id
  end
end

