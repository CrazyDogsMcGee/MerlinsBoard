class Api::CoursesInstructorsController < Api::ApiController
  #before_action {admins_only(params["course_id"])}
  
  def create
    @professorship = CoursesInstructors.new(professorship_params)

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

  private

  def professorship_params
    params.require(:courses_instructor).permit(:user_id, :course_id)
  end

end
