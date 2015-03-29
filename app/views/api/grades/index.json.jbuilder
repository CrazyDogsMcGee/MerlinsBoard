json.grades @grades do |grade_obj|
  json.id grade_obj.id
  json.score grade_obj.score
  json.allow_submission grade_obj.allow_submission

  json.assignment do
    json.id grade_obj.assignment_id
    json.title grade_obj.assignment.title
    json.description grade_obj.assignment.description
    json.due_date grade_obj.assignment.due_date
  end

  json.course do
    json.id @course_id
  end

  json.student do
    json.id grade_obj.user_id
  end

end

json.student_fname @student.fname
json.student_lname @student.lname
json.course_id @course_id
