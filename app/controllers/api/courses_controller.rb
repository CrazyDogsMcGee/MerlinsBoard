class Api::CoursesController < Api::ApiController 
  #before_action :has_course_access, only: [:create, :show, :update]
  #How will I grant access? A seperate route or collection perhaps?
  
	def index
    @courses = Course.all
		render json: @courses 
  end

  def create
    @course = Course.new(course_params)
		
		if @course.valid?
			
			Course.transaction do
				@course.save!
        CoursesInstructors.create!(user_id: cuid, course_id: cid)
			end #need error handling still for this block

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
  
  def has_course_access
    @course = Course.includes(:instructors,:students).find(params[:id])
    user_id = current_user.id
    
    if (@course.instructors.exists?(user_id) || @course.students.exists?(user_id))
      return
    else
      render :status => :forbidden, :text => "You do not have sufficient rights to perform that action"
    end
  end

  private

  def course_params
    params.require(:course).permit(:name, :start_time, :end_time, :description, :location, :day)
  end
	
end
