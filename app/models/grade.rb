class Grade < ActiveRecord::Base
  validates :grade, :assignment_id, :user_id, presence: true
  validates :grade, inclusion: {in: [0..100]}
  
  belongs_to :user
end
