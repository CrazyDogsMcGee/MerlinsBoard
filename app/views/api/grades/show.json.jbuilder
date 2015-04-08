json.(@grade, :id, :score, :allow_submission)

json.url @grade.submission.url
json.attachment_exists @grade.submission.exists?

json.assignment do
  json.id @grade.assignment_id
  json.title @grade.assignment.title
  json.description @grade.assignment.description
  json.due_date @grade.assignment.due_date
end

json.course do
  json.id @course_id
end

json.student do
  json.id @grade.user_id
end
