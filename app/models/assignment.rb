class Assignment < ActiveRecord::Base
  validates :title, :description, :due_date, :course_id, presence: true
  #validate due date is after current date
  
  belongs_to :course
  has_many :grades, dependent: :destroy
  
end
