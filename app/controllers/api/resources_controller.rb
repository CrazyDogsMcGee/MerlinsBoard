class ResourcesController < Api::ApiController
  before_action :set_resource, only: [:show, :edit, :update, :destroy]

  def index
    @resources = Resource.all
  end

  def show
  end

  def new
    @resource = Resource.new
  end

  def edit
  end

  def create
    @resource = Resource.new(resource_params)

  end

  # PATCH/PUT /resources/1
  # PATCH/PUT /resources/1.json
  def update

  end

  # DELETE /resources/1
  # DELETE /resources/1.json
  def destroy
    @resource.destroy

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_resource
      @resource = Resource.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def resource_params
      params.require(:resource).permit(:name, :description, :course_id)
    end
end
