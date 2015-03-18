json.array! @users do |user|
	json.id user.id
	json.lname user.lname
	json.fname user.fname
	json.email user.email
end
