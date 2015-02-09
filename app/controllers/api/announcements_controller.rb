class Api::AnnouncementsController < Api::ApiController
#   def courseindex
#     @announcements = Announcement.where({course_id: params["course_id"]})
#     render json: @announcements
#   end
#   before_action :admins_only, :except [:index]
  
  def index
    @announcements = Announcement.all
    render json: @announcements
  end

  def create
    #i'll assume I set ownership
    @announcement = Announcement.new(announcement_params)
    if @announcement.save
      render json: @announcement
    else
      render json: @announcement.errors.full_messages
    end
  end
  
  def update
    @announcement = Announcement.find(params[:id]) #how do params get set here if the url is a partial, or does that not matter because of the # sign?
    
    if @announcement.update(announcement_params)
      render json: {}
    else
      render json: @announcement.errors.full_messages
    end
  end
  
  def destroy
    @announcement = Announcement.find(params[:id])
    @announcement.destroy
    render json: {} #should have a conditional here
  end
  
  private
  
  def announcement_params
    params.require(:announcement).permit(:title,:body,:user_id,:course_id)
  end

end
