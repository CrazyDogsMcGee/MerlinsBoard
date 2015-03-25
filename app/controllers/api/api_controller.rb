class Api::ApiController < ApplicationController
	before_action :require_signed_in!
	#any other backbone specific universal methods  should go here

  def admins_only(course_id)
    course = Course.find(course_id)
    
    begin
      status = course.instructors.find(current_user.id)
    rescue ActiveRecord::RecordNotFound
      render :status => :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end
  
end
