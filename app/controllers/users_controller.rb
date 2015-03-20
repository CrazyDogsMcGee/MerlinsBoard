class UsersController < ApplicationController
  #wrap_parameters false
  
  def new
    @user = User.new #This doesn't even need to be here tbh, this is only necessary if using something like a partial
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user) #sets session token and current user
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages #this is already an array
      render :new #local can get passed in automatically through partial?
    end
  end

  def show
		@user = User.find(params[:id]) #will this be the user's profile page?
  end
  
  def index
    
  end

  private

  def user_params
    #params are the response from the form
    params.require(:user).permit(:fname,:lname,:password,:email)
  end
end
