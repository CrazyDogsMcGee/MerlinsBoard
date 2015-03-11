json.users @users do |user|
	json.id
	json.lname
	json.fname
	json.email
end

#will probably want ids to be top-level for easy access
# Actually, should probably change this so it can be actually set onto a collection

#Final thoughtL scratch this. Just render json, the collection can take care of rendering things properly.