class Api::CoursesController < Api::ApiController 
	def index
    @courses = Course.all
		render json: @courses 
  end

#   def new
#     @course = Course.new()
#   end

  def create
    @course = Course.new(course_params)
		
		if @course.valid?
			
			Course.transaction do
				@course.save
      	CoursesInstructors.create(user_id: current_user.id, course_id: @course.id)
			end #need error handling still for this block

			render json: @course 
    else
      render json: @course.errors.full_messages, status: 422
    end

  end

  def show
		@course = Course.find(params[:id])
		render :show 
  end
  
  def update
    @course = Course.find(params[:id])
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors.full_messages
    end
  end
	
	def destroy
		@course = Course.find(params[:id])
		@course.destroy
		render json: {}
	end
  
  #not implemented
  
  def assignments
    @courseAssignments = Course.find(params[:id]).assignments
    render json: @courseAssignments
  end
  
  def grades
    @courseGrades = Course.find(params[:id]).grades
    render json: @courseGrades
  end

  private

  def course_params
    params.require(:course).permit(:name, :start_time, :end_time, :description, :location, :day)
		#serializeJSON way
  end
	
end
