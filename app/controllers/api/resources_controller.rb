class ResourcesController < Api::ApiController
  #before_action :isAdmin only edit, create, destroy


  # def index
  #   @resources = Resource.all
  #   render json: @resources
  # end

  def show
    @resource = Resource.find()
  end

  def edit

  end

  def create
    @resource = Resource.new(resource_params)
  end

  def update

  end

  def destroy
    @resource.destroy
  end

  private

  def resource_params
    params.require(:resource).permit(:name, :description, :course_id)
  end
end
