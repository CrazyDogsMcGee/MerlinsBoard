class Api::AnnouncementsController < Api::ApiController
  before_action(except: [:index, :show]) {admins_only(announcement_params["course_id"])}
  
  def index
    @announcements = Announcement.all
    render json: @announcements
  end

  def create 
    @announcement = Announcement.new(announcement_params)
    if @announcement.save
      render json: @announcement
    else
      render status: 422, json: @announcement.errors.full_messages
    end
  end
  
  def update 
    @announcement = Announcement.find(params[:id])
    
    if @announcement.update(announcement_params)
      render json: {}
    else
      render status: 422, json: @announcement.errors.full_messages
    end
  end
  
  def destroy
    @announcement = Announcement.find(params[:id])
    @announcement.destroy
    render json: {} 
  end
  
  def show 
    @announcement = Announcement.find(params[:id])
    render json: @announcement
  end
  
  private
  
  def announcement_params
    params.require(:announcement).permit(:title,:body,:user_id,:course_id)
  end

end
