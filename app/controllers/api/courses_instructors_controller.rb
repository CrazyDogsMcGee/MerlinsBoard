class Api::CoursesInstructorsController < Api::ApiController
  #before_action

def create
    @professorship = CoursesInstructors.new(enrollment_params)
		
    if @professorship.save
      render json: {message: "Successfully enstated"}
    else
      render json: {errors: @enrollment.errors.full_messages}
    end
  end

def destroy
  @professorship = CoursesInstructors.find(params[:id])
  
  if @professorship.destroy
    render json: {message: "DESYSOPPED"}
  end
end

#somehow new instructors can be onboarded.
  private 
  
  def professorship_params
    params.require(:courses_instructor).permit(:user_id, :course_id)
  end

end
