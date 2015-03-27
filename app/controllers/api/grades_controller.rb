class Api::GradesController < Api::ApiController
  before_action(only: :show) {admins_only(params["course_id"])} #needs to be included manually on ANY change
  before_action :is_user_or_instructor?, only: [:index]
  wrap_parameters false

  def index
    @grades = Grade.includes(:assignment,:course,:user).where("user_id = ?", params["user_id"])
    
    #unsure if this is warranted, it does prevent an n+1 query, but not by much, since I don't go through ALL the entries anyway
    
    @student = @grades.first.user
    @course_id = params["course_id"].to_i
    
    @grades = @grades.select {|grade| grade.course.id == @course_id}
  end

  def show
    @grade = Grade.find(params[:id])
    render json: @grade
  end
  
  def update
    @grade = Grade.find(params[:id])
    
    byebug
    
    unless @grade.course.id == params["course_id"].to_i
      render text: "You do not have sufficient rights to perform this action", status: 403
      return
    end
    
    if @grade.update(grade_params)
      render json: @grades
    else
      render json: @grade.errors.full_messages, status: 422
    end
  end

  private

  def is_user_or_instructor?
    return if current_user.id == params["user_id"].to_i
    admins_only(params["course_id"])
  end

  def grade_params
    if Course.find(params["course_id"]).isInstructor?(current_user)
      params.require(:grade).permit(:score, :submission)
    else
      params.require(:grade).permit(:submission)
    end
  end
end
