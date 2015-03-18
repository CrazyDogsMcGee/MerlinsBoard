class Api::CoursesController < Api::ApiController
  #before_action :isAdmin?
  helper_method :course_access_view

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
    @course = Course.includes(:students, :courses_students, :instructors, :announcements, :assignments, :grades).find(params[:id])
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

  def course_search
    @courses = Course.search_by_name_and_desc(params["query"])
    render :search_index
  end

  def course_access_view(user)
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
