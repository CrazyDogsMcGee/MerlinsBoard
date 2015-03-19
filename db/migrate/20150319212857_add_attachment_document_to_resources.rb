class AddAttachmentDocumentToResources < ActiveRecord::Migration
  def self.up
    change_table :resources do |t|
      t.attachment :document
    end
  end

  def self.down
    remove_attachment :resources, :document
  end
end
