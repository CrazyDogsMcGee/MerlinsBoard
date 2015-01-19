json(@course, :name, :location, :start_time, :end_time, :day, :description)

json.instructors @course.instructors do |instructors|
	json.id instructor.id
	json.lname instructor.lname
	json.fname instructor.fname
end

json.array! @course.students do |student|
	json.id student.id
end

#the question is, do I actually turn these into collections or just let them stay as ids? At first, I'll just do the collection for easier organizing..