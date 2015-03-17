class Api::AssignmentsController < Api::ApiController
  #before_action(except: [:index]) {admins_only(params[:assignment][:course_id])}

  def index
    @assignments = Assignment.all
    render json: @assignments
  end

  def create #form AJAX
    @assignment = Assignment.new(assignment_params)
    if @assignment.save
      render json: @assignment
    else
      render status: 422, json: @assignment.errors.full_messages
    end
  end

  def update #form AJAX
    @assignment = Assignment.find(params[:id])

    if @assignment.update(assignment_params)
      render json: @assignment
    else
      render status: 422, json: @assignment.errors.full_messages
    end
  end

  def destroy #form AJAX
    @assignment = Assignment.find(params[:id])
    @assignment.destroy
    render json: {}
  end

  def show #flat ID
    @assignment = Assignment.find(params[:id])
    render json: @assignment
  end

  private

  def assignment_params
    params.require(:assignment).permit(:title, :description, :due_date, :course_id, :grade)
  end
end
