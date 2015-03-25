class Api::GradesController < Api::ApiController
  before_action(only: [:update, :show]) {admins_only(params["course_id"])} #needs to be included manually on ANY change
  before_action :is_user_or_instructor?, only: [:index]
  #wrap_parameters false

  def index
    @grades = Grade.includes(:assignment,:course,:user).where("user_id = ?", params["user_id"])
    @student = @grades.first.user
    @course_id = params["course_id"].to_i
    
    @grades = @grades.select {|grade| grade.course.id == @course_id}
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
    #     if current_user
#     else
#     end
    params.require(:grade).permit(:score, :assignment_id, :user_id, :submission)
  end
  
  def grade_course_congruency(grade) #how to see if the cu is an admin of that grade's course? I think you can call association methods even before things are saved/committed
    unless self.course.id == params["course_id"].to_i
      render text: "You do not have sufficient rights to perform this action", status: 403
    end
  end

end
