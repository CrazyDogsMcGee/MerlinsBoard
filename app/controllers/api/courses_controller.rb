class Api::CoursesController < Api::ApiController 
  #before_action :has_course_access, only: [:create, :update]
  helper_method :has_course_access_view
  
	def index
    @courses = Course.all
		render json: @courses 
  end

  def create
    @course = Course.new(course_params)
		
		if @course.valid?
      current_user.taughtcourses.create(course_params)
      render json: @course
    else
      render json: @course.errors.full_messages, status: 422
    end

  end

  def show
    @course = Course.includes(:students, :courses_students, :instructors, :announcements, :assignements, :grades).find(params[:id])
    render :show #jbuilder render
  end
  
  def update
    @course = Course.find(params[:id])
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors.full_messages, status: 422
    end
  end
	
	def destroy
		@course = Course.find(params[:id])
		@course.destroy
		render json: {}
	end
  
  #not implemented
  
  def has_course_access #figure out how to separate this...my first instinct is to have a sha
    @course = Course.includes(:instructors,:students).find(params[:id])
    user_id = current_user.id
    
    if (@course.instructors.exists?(user_id) || @course.students.exists?(user_id))
      return
    else
      render :status => :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end
  
  def course_access_view(user) #will it still run from this context? - curious
    @course = Course.includes(:instructors,:students).find(params[:id])
    
    if @course.students.exists?(user.id)
      return :student
    elsif @course.instructors.exists?(user.id)
      return :instructor
    else
      return false
    end
  end
  
  private

  def course_params
    params.require(:course).permit(:name, :start_time, :end_time, :description, :location, :day)
  end
	
end
