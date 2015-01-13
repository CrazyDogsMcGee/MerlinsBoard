class CoursesStudentsController < ApplicationController
  #model name is case sensitive..
  before_action :require_signed_in!

  def create
    @enrollment = CoursesStudents.new(enrollment_params)

    if @enrollment.save
      flash[:errors] = ["Successfully Enrolled!"]
      redirect_to courses_url
    else
      flash[:errors] = @enrollment.errors.full_messages
      redirect_to courses_url
    end
  end

  def destroy
    @enrollment = CoursesStudents.find(params[:id]) #passed in as part of action portion of form

    if @enrollment.destroy
      flash[:errors] = ["Successfully Dropped!"]
    end

    redirect_to courses_url
  end

  private

  def enrollment_params
    params.require(:enrollment).permit(:user_id, :course_id)
  end

end

#redirect_to vs render - A render will send the post request again if you re-render the form!!
# http://stackoverflow.com/questions/7493767/are-redirect-to-and-render-exchangeable
