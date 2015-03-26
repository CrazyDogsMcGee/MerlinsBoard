class Api::ApiController < ApplicationController
	before_action :require_signed_in!
	#any other backbone specific universal methods  should go here

  def admins_only(course_id)
    course = Course.find(course_id)
    is_admin = course.instructors.exists?(current_user.id)
    
    unless is_admin 
      render status: :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end
  
  def students_only(course_id)
    course = Course.find(course_id)
    is_student = course.students.exists?(current_user.id)
    
    unless is_student 
      render status: :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end
  
end
