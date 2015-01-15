class Api::CoursesController < ApiController #does not need the scope resolution operator - already knows to look in own module scope?

	def index
    @courses = Course.all.includes(:students)
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
			end

      redirect_to course_url(@course)
    else
      flash.now[:errors] = @course.errors.full_messages
      render :new
    end

  end

  def show
		@course = Course.find(params[:id])
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
