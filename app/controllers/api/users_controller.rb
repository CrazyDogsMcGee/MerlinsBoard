class Api::UsersController < Api::ApiController
	#this is because I will need access to the current user in the backbone views...
	def show
		@user = User.includes(:courses, :taughtcourses).find(params[:id])
		render :show
	end
	
	def index
		@users = User.all
		render :index
	end
	
end
