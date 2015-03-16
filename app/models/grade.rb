class Grade < ActiveRecord::Base
  validates :grade, :assignment_id, :user_id, presence: true
  validates :grade, inclusion: {in: 0..100}
  
  belongs_to :user
  belongs_to :assignment
  
  delegate :course, to: :assignment, allow_nil: :true
  #What this means is, It will be orphaned from a course without a linking assignment...which should be the case anyway I think...
end
