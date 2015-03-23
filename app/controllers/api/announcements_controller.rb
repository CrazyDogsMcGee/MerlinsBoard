class Api::AnnouncementsController < Api::ApiController
  before_action(except: [:index, :show]) {admins_only(assignment_params["course_id"])}
  
  def index
    @announcements = Announcement.all
    render json: @announcements
  end

  def create #form AJAX
    @announcement = Announcement.new(announcement_params)
    if @announcement.save
      render json: @announcement
    else
      render status: 422, json: @announcement.errors.full_messages
    end
  end
  
  def update #form AJAX
    @announcement = Announcement.find(params[:id]) #how do params get set here if the url is a partial, or does that not matter because of the # sign?
    
    if @announcement.update(announcement_params)
      render json: {}
    else
      render status: 422, json: @announcement.errors.full_messages
    end
  end
  
  def destroy #form AJAX
    @announcement = Announcement.find(params[:id])
    @announcement.destroy
    render json: {} #should have a conditional here
  end
  
  def show #unnested id
    @announcement = Announcement.find(params[:id])
    render json: @announcement
  end
  
  private
  
  def announcement_params
    params.require(:announcement).permit(:title,:body,:user_id,:course_id)
  end

end
