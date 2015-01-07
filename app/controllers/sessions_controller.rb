class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user.nil? # user DNE or wrong password
      flash.now[:errors] = ["Credentials were incorrect"]
      render :new
    else
      login!(user) #available everywhere because its in AppController
      redirect_to user_url(@user)
    end
  end

end
