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
			
      begin
        Course.transaction do
          @course.save!
          CoursesInstructors.create!(user_id: current_user.id, course_id: @course.id)
        end #need exception handling here in case db is broken - http://api.rubyonrails.org/classes/ActiveRecord/Transactions/ClassMethods.html
      rescue ActiveRecord::RecordNotSaved => e
        render status: 500, text: "Internal Server Error - Contact system admin and try again"
      end

      render json: @course
    else
      render json: @course.errors.full_messages, status: 422
    end

  end

  def show
		@course = Course.find(params[:id])
    render :show #jbuilder render
  end
  
  def update
    @course = Course.find(params[:id])
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors.full_messages
    end
  end
	
	def destroy
		@course = Course.find(params[:id])
		@course.destroy
		render json: {}
	end
  
  #not implemented
  
  def grades #easier to just include with course Jbuilder response?
    @courseGrades = Course.find(params[:id]).grades
    render json: @courseGrades 
  end
  
  def has_course_access #figure out how to separate this...my first instinct is to have a sha
    @course = Course.includes(:instructors,:students).find(params[:id])
    user_id = current_user.id
    
    if (@course.instructors.exists?(user_id) || @course.students.exists?(user_id))
      return
    else
      render :status => :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end
  
  def has_course_access_view(user) #will it still run from this context? - curious
    @course = Course.includes(:instructors,:students).find(params[:id])
    
    if (@course.instructors.exists?(user.id) || @course.students.exists?(user.id))
      return true
    else
      return false
    end
  end

  private

  def course_params
    params.require(:course).permit(:name, :start_time, :end_time, :description, :location, :day)
  end
	
end
