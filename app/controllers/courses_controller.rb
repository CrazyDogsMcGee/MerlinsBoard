class CoursesController < ApplicationController
  def index
    #can create new enrollments from this view
    @courses = Course.all.includes(:students, :courses_students)
    # Ok, a includes association needs to be here on the students and perhaps the enrollments as well
  end

  def new
    @course = Course.new()
  end

  def create

    @course = Course.new(course_params)

    if @course.save
      CoursesInstructors.create(user_id: current_user.id, course_id: @course.id) #dangerous, will have to bundle into a transaction later.
      redirect_to course_url(@course)
    else
      flash[:errors] = @course.errors.full_messages
      render :new
    end

  end

  def show
    @course = Course.find(params[:id]) #its a bit much to try and prefetch for ONE item.
  end

  private

  def course_params
    params.require(:course).permit(:name, :start_time, :end_time, :description, :location, :day)
  end
end
