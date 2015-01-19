class Api::CoursesStudentsController < Api::ApiController
	def create
    @enrollment = CoursesStudents.new(enrollment_params)
		
    if @enrollment.save
			render json: {message: "Successfully enrolled"}#success message should go here, what would be the format?
    else
			render json: @enrollment.errors.full_messages
    end
  end

  def destroy
    @enrollment = CoursesStudents.find(params[:id])

    if @enrollment.destroy
			render json: {message: "Dropped Class"} #will need to have this actually appear..
    end
  end

  private

  def enrollment_params
		params.require(:enrollment).permit(:user_id, :course_id) #params can still be caught as normal for a JSON response
  end
end
