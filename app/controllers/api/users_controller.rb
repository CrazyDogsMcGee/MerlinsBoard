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
  
  def update
    @user = User.find(params[:id])
    
    if @user.update(user_params)
    else
    end
  end

	def users_search
		@users = User.search_by_full_name(params["query"])
		render :index
	end
    
  def user_params
    #params are the response from the form
    params.require(:user).permit(:fname,:lname,:password,:email, :avatar)
  end
    
end

# #JSON items
