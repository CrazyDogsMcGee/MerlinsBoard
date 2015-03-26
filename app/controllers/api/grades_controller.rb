class Api::GradesController < Api::ApiController
  before_action(only: :show) {admins_only(grade_params({weak: true})["course_id"])} #needs to be included manually on ANY change
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
  #will need to create unique validator to ensure congruency between course auth and resource id course....
  def update
    @grade = Grade.find(params[:id])
    
    unless @grade.course.id == grade_params({weak: true})["course_id"].to_i
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

  def grade_params(options={weak: false})
    if options[:weak] == true
      params.require(:grade) #will need something similar for all file parsed things...
    end
    
    if Course.find(grade_params({weak: true})["course_id"]).isInstructor?(current_user)
      params.require(:grade).permit(:score, :assignment_id, :user_id, :submission)
    else
      params.require(:grade).permit(:submission)
    end
  end

  #Here's what's going on: When I fetch the grades from the index, I get them by course and user id,
  #with jbuilder, I dredge a lot of extra information like assignment name, user_id and course_id to
  #get the page to display properly and for certain validations. Because of how I overwrite toJSON
  #to process the attached document, these dangling attributes are still on the model when I process
  #any changes. I need some of these extra attrs, so I included a weak options to deal with them.any
  #It prbably behooves me to separate out these attrs as extra data during the request so this can be
  #better organized, or I should overwrite the save method to always include these important parameters
  #and the parse method to better organize these attributes too.
  #
  #The way it looks, I should pass everything else as loose params in the data area so I can refer to it directly.
  #The only time i should deal with whole params is on update
end
