json.grades @grades do |grade_obj|
  json.id grade_obj.id
  json.score grade_obj.score
  json.assignment_id grade_obj.assignment_id
  json.user_id grade_obj.user_id
  json.title grade_obj.assignment.title
  json.description grade_obj.assignment.description
  json.allow_submission grade_obj.allow_submission
  json.course_id @course_id
end

json.student_fname @student.fname
json.student_lname @student.lname
json.course_id @course_id
