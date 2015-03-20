class ResourcesController < Api::ApiController
  #before_action :isAdmin only edit, create, destroy
  #wrap_parameters false
  
  def index
    @resources = Resource.all
    render json: @resources
  end

  def create
    @resource = Resource.new(resource_params)
    
    if @resource.save
      render json: @resource
    else
      render json: @resource.errors.full_messages, status: 422
    endg
  end

  def update
    @resource = Resource.find(params[:id])
    if @resource.update(resource_params)
      render json: @resource
    else
      render json: @resource.errors.full_messages, status: 422
    end
  end

  def destroy
    @resource = Resource.find(params[:id])
    @resource.destroy
    render json: {}
  end

  private

  def resource_params
    params.require(:resource).permit(:name, :description, :course_id, :document)
  end
end
