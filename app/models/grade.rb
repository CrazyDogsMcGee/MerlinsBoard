class Grade < ActiveRecord::Base
  validates :score, :assignment_id, :user_id, presence: true
  validates :score, inclusion: {in: 0..100}

  belongs_to :user
  belongs_to :assignment

  has_one :course, through: :assignment, source: :course

  #paperclip
  has_attached_file :submission,
   :content_type => { :content_type => ["application/pdf",
    "application/vnd.ms-excel",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain"] }
end
