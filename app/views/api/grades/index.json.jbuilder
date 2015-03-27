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


#What should I do here?
# 1) Fetch on each item individually and make a new jbuilder for the show file - the disadvantage being the multiple fetch
# 2) Parse out the information onto the grade model, I would have to override collection set or model set..unsure which one

json.student_fname @student.fname
json.student_lname @student.lname
json.course_id @course_id
