class Announcement < ActiveRecord::Base
  validates :title, :body, :user_id, :course_id, presence: true
  
  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    dependent: :destroy
  )
  
  belongs_to :course, dependent: :destroy
end
