json.@grades do |grade_obj|
  json.grade grade_obj.grade
  json.assignment_id grade_obj.assignment_id
  json.user_id grade_obj.user_id
  json.assignment_title grade_obj.assignment.title
  json.assignment_description grade_obj.assignment.description
  json.course grade_obj.course.name
end