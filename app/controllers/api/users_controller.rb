class Api::UsersController < Api::ApiController
  before_action :is_current_user?, only: [:update]
	#wrap_parameters false
  
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
      render :show
    else
      render json: @user.errors.full_messages
    end
  end
  
  def change_password 
    @user = User.find(params[:id])
    
    unless @user.is_password?(params["supplied_password"])
      render :json => {:errors => ["Incorrect password"]}, :status => 403
      return
    end
    
    if @user.update(user_password)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

	def users_search
    @users = User.search_by_full_name(params["query"])
		render :index
	end
  
  private
  
  def user_params
    params.require(:user).permit(:fname, :lname, :email, :avatar, :id)
  end
  
  def user_password
    params.require(:user).permit(:id, :password)
  end
  
  def is_current_user?
    unless current_user.id == user_params["id"].to_i
      render :text => "You do not have permission to edit this user", :status => 403
    end
  end
    
end

# #JSON items
