class Api::GradesController < Api::ApiController
  
  def show
    Grade.find(params[:id])
  end
  
  def destroy
  end
  
  def create
  end
  
  def update
  end
  
  private 
  
  def grade_params
    params.require(:grade).permit(:grade, :assignment_id, :user_id)
  end
end
