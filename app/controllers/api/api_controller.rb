class Api::ApiController < ApplicationController
	before_action :require_signed_in! #found in application controller - will be inherited 
	#any other backbone specific universal methods  should go here
	
  def admins_only(course_id)
    course = Course.find(course_id)
    begin
      status = course.instructors.find(current_user.id)
    rescue
      render :status => :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end
  
  def get_course_id(incoming_params)
    #I think I would just break it open and iterate, unless I can find some rails metaprogramming that allows me to get the calling class
  end
  
end

