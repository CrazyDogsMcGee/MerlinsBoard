class Api::CoursesController < Api::ApiController #does not need the scope resolution operator - already knows to look in own module scope?

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

			render json: @course #when the backbone router is called to redirect to the show page, this is what it will receive
    else
			render json: @course.errors.full_messages, status: 422 #what if this wasn't here? it would probably still try to process as usual..
    end

  end

  def show
		@course = Course.find(params[:id])
		render json: @course #how to fetch associations?  @board = Board.includes(:members, lists: :cards).find(params[:id])
		# TODO: might need instructors association... also need jbuilder template
  end
	
	def destroy
		@course = Course.find(params[:id])
		@course.destroy #this could also be #try, why would that be used?
		render json: {} #sends back no params/JSON
	end

  private

  def course_params
    params.require(:course).permit(:name, :start_time, :end_time, :description, :location, :day)
		#serializeJSON way
  end
	
end
