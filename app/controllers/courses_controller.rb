class CoursesController < ApplicationController
	before_action :require_signed_in!
	
  def index
    #can create new enrollments from this view
    @courses = Course.all #.includes(:students)
		render json: @courses
  end

  def new
    @course = Course.new()
  end

  def create
    @course = Course.new(course_params)
		
		if @course.valid?
			
			Course.transaction do
				@course.save
      	CoursesInstructors.create(user_id: current_user.id, course_id: @course.id)
			end #need exception handling here in case db is broken - http://api.rubyonrails.org/classes/ActiveRecord/Transactions/ClassMethods.html

      redirect_to course_url(@course)
    else
      flash.now[:errors] = @course.errors.full_messages
      render :new
    end

  end

  def show
		@course = Course.find(params[:id]) #its a bit much to try and prefetch for ONE item.
  end
	
	def destroy
		@course = Course.find(params[:id])
		@course.destroy
		redirect_to courses_url
	end

  private

  def course_params
    params.require(:course).permit(:name, :start_time, :end_time, :description, :location, :day)
  end
end
