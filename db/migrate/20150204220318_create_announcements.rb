class CreateAnnouncements < ActiveRecord::Migration
  def change
    create_table :announcements do |t|
      t.string :title
      t.text :body
      t.integer :user_id
      t.integer :course_id

      t.timestamps
    end
    add_index :announcements, :user_id
    add_index :announcements, :course_id
  end
end
