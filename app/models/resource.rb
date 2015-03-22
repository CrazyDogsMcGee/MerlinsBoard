class Resource < ActiveRecord::Base
  #paperclip
  has_attached_file :document,
  :content_type => { :content_type => ["application/pdf",
    "application/vnd.ms-excel",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain"] }

  #active record
  belongs_to :course
  
end
