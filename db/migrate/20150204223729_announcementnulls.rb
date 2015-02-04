class Announcementnulls < ActiveRecord::Migration
  def change
    change_column :announcements, :title, :string, null: false
    change_column :announcements, :body, :text, null: false
    change_column :announcements, :user_id, :integer, null: false
    change_column :announcements, :course_id, :integer, null: false
  end
end
