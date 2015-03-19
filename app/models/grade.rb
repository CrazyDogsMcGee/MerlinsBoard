class Grade < ActiveRecord::Base
  validates :grade, :assignment_id, :user_id, presence: true
  validates :grade, inclusion: {in: 0..100}

  belongs_to :user
  belongs_to :assignment

  has_one :course, through: :assignment, source: :course #belongs_to through doesn't exist
end
