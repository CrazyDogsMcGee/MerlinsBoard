class SessionsController < ApplicationController

  def new
		@user = User.new #case in point, all controllers have access to all models, despite naming
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user.nil? # user DNE or wrong password
      flash.now[:errors] = ["Credentials were incorrect"]
			@user = User.new(email: params[:user][:email])
      render :new
    else
      login!(@user) #available everywhere because its in AppController
      redirect_to root_url
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

end
