class Api::CoursesController < Api::ApiController 
	def index
    @courses = Course.all.includes(:students)
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
			render json: @course.errors.full_messages, status: 422 #what if this wasn't here? it would probably still try to process as usual..
    end

  end

  def show
		@course = Course.find(params[:id])
		render :show 
# 		if @course == nil
# 			render :SomeErrorsObject -- should probably be processed on the backbone side anyway...
# 		else
# 			render :show, status: 404
# 		end
  end
	
	def destroy
		@course = Course.find(params[:id])
		@course.destroy #this could also be #try, why would that be used? Probably for seamlessness, allows error to be passed back instead of non-specific internal server error
		render json: {} #sends back no params/JSON - should send back error if @course.try(:destroy) == false
	end

  private

  def course_params
    params.require(:course).permit(:name, :start_time, :end_time, :description, :location, :day)
		#serializeJSON way
  end
	
end
