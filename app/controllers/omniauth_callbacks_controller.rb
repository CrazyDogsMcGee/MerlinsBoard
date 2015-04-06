class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
      @user = User.find_for_google_oauth2(request.env["omniauth.auth"], current_user)

      if @user.persisted?
        flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
        login!(@user)
        redirect_to root_path
      else
        byebug
        session["devise.google_data"] = request.env["omniauth.auth"]
        redirect_to 
      end
  end
end