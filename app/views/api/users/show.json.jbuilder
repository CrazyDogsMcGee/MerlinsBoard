json.(@user, :id, :fname, :lname, :email)

json.courses @user.courses do |course|
 	json.id course.id
 	json.name course.name
end
	
json.taughtcourses @user.taughtcourses do |taughtcourse|
 	json.id taughtcourse.id
 	json.name taughtcourse.name
end

json.announcements @user.announcements.includes(:author,:course) do |announcement|
  json.id announcement.id
  json.title announcement.title
  json.body announcement.body
  json.posted_at announcement.created_at
  json.courseN announcement.course
  json.author announcement.author
end

#A thought, does it matter whether the JSON response is contained in an array? Can it still be set properly to a collection?
#If a JSON response has a name, does the top-level name have to be the same name as the collection for it to be properly parsed? Will it ever ignore the top-level name and look inside the JSON to see if the attributes are valid?