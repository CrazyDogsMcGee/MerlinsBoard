class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

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
end
