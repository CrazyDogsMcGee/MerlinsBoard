class UsersController < ApplicationController
  def new
    @user = User.new #these get automatically passed into the view
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user) #sets session token and current user
      redirect_to user_url(@user) #url helpers are here
    else
      flash.now[:errors] = @user.errors.full_messages #this is already an array
      render :new #local can get passed in automatically through partial?
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def user_params
    #params are the response from the form
    params.require(:user).permit(:fname,:lname,:password,:email)
  end
end
