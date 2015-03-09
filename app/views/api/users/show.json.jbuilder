json.(@user, :id, :fname, :lname, :email)

json.courses @user.courses do |course|
 	json.id course.id
 	json.name course.name
end
	
json.taughtcourses @user.taughtcourses do |taughtcourse|
 	json.id taughtcourse.id
 	json.name taughtcourse.name
end

#this information is incomplete, but I can call .fetch() on any course object I need more information about...