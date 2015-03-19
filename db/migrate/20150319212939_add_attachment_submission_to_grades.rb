class AddAttachmentSubmissionToGrades < ActiveRecord::Migration
  def self.up
    change_table :grades do |t|
      t.attachment :submission
    end
  end

  def self.down
    remove_attachment :grades, :submission
  end
end
