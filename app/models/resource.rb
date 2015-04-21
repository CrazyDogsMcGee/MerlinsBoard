class Resource < ActiveRecord::Base
  #paperclip
  has_attached_file :document,
    :url => ":class/:attachment/:id/resource_:course_id_:id.:extension",
    :path => ":class/:attachment/:id/resource_:course_id_:id.:extension"
  
  validates_attachment_content_type :document, :content_type => [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain"]
  
  validates :name, :description, :course_id, presence: true

  belongs_to :course
  
  def document_from_url(url)
    self.document = URI.parse(url)
    self.save!
  end
  
  private
  
  Paperclip.interpolates :course_id do |attachment, style|
    attachment.instance.course_id
  end
  
end
