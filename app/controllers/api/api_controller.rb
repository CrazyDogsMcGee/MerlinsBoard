class Api::ApiController < ApplicationController

  def admins_only(course_id) #returns 403 error to current_user if they are not an instructor
    course = Course.find(course_id)
    is_admin = course.instructors.exists?(current_user.id)
    
    unless is_admin 
      render status: :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end
  
  def students_only(course_id) #returns 403 error to current_user if they are not a student
    course = Course.find(course_id)
    is_student = course.students.exists?(current_user.id)
    
    unless is_student 
      render status: :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end
  
  def require_signed_in
    unless signed_in?
      render status: 403, :text => "You must be signed in to perform that action"
    end
    #http://stackoverflow.com/questions/19410867/rails-4-why-cant-i-redirect-after-save
  end
  
end
