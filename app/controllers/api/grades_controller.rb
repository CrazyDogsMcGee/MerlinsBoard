class Api::GradesController < Api::ApiController
  before_action(only: [:update, :show]) {admins_only(params["course_id"])}
  before_action :is_user_or_instructor?, only: [:index]
  #wrap_parameters false

  def index
    @grades = Grade.includes(:assignment,:course,:user).where("user_id = ?", params["user_id"])
    @student = @grades.first.user
    @course_id = params["course_id"].to_i #should change this too into something less ghetto
    @grades = @grades.select {|grade| grade.course.id == params["course_id"].to_i}
  end

  def show
    @grade = Grade.find(params[:id])
    render json: @grade
  end
  #will need to create unique validator to ensure congruency between course auth and resource id course....
  def update
    @grade = Grade.find(params[:id])

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
    params.permit(:grade, :assignment_id, :user_id, :submission)
    #need to change grade column - it confuses params_wrapper I think.
    #change the column name and see what happens...would also have to refactor backbone views and jbuilder
  end
  
  def grade_course_congruency
    unless self.course_id == params["course_id"].to_i
      render text: "You do not have sufficient rights to perform this action", status: 403
    end
  end

end
