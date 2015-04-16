class Api::AssignmentsController < Api::ApiController
  before_action(except: [:index, :show]) {admins_only(assignment_params["course_id"])}

  def index
    @assignments = Assignment.all
    render json: @assignments
  end

  def create
    @assignment = Assignment.new(assignment_params)
    if @assignment.save
      render json: @assignment, status: 200
      create_grades(@assignment)
    else
      render status: 422, json: @assignment.errors.full_messages
    end
  end

  def update
    @assignment = Assignment.find(params[:id])

    if @assignment.update(assignment_params)
      render json: @assignment
    else
      render status: 422, json: @assignment.errors.full_messages
    end
  end

  def destroy
    @assignment = Assignment.find(params[:id])
    @assignment.destroy
    render json: {}
  end

  def show 
    @assignment = Assignment.find(params[:id])
    render json: @assignment
  end

  private

  def assignment_params
    params.require(:assignment).permit(:title, :description, :due_date, :course_id, :grade)
  end

  def create_grades(assignment)
    course = Course.find(assignment_params["course_id"])
    students = course.students

    students.each do |student| #Grades are automatically created for this assignment for all students in the class
      Grade.create(user_id: student.id, assignment_id: assignment.id, score: 0, allow_submission: !!params["allow_submission"])
    end
  end
end
