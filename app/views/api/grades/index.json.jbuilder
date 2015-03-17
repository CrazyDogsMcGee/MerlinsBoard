json.grades @grades do |grade_obj|
  json.grade grade_obj.grade
  json.assignment_id grade_obj.assignment_id
  json.user_id grade_obj.user_id
  json.assignment_title grade_obj.assignment.title
  json.assignment_description grade_obj.assignment.description
end

json.student_fname @student.fname
json.student_lname @student.lname
