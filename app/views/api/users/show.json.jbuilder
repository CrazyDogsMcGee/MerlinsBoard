json.(@user, :id, :fname, :lname, :email)

 json.courses @user.courses do |course|
 	json.id course.id
 	json.name course.name
end
	
	#so far, all I wanted to use this for was enrollments...to see if a current_user was already in a class, probably by ID..
	#it  may be simpler just to have class enrollment/dropping/deleting ALL on the single courses show page
	
json.taughtcourses @user.taughtcourses do |taughtcourse|
 	json.id taughtcourse.id
 	json.name taughtcourse.name
end