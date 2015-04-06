class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception
	
	helper_method :current_user, :signed_in? #available in all views

  def login!(user) #sets congruency between session token of user and session
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.try(:reset_session_token!) #resets session token - the cookie will be this session token when there's another login - Why does this have to be try?
    session[:session_token] = nil #current session_token is anulled
  end

  def current_user
    return nil if session[:session_token].nil? #this is a session cookie - no user is logged in if there's no cookie information
    @current_user ||= User.find_by_session_token(session[:session_token])
  end #will return current user
  
  def signed_in?
		!!current_user
	end
	
	def require_signed_in!
		redirect_to new_session_url unless signed_in? #will be available everywhere
  end
  
#   def after_sign_in_path_for(resource)
#     root_path
#     #request.env['omniauth.origin'] || stored_location_for(resource) || root_path
#   end
  
end
