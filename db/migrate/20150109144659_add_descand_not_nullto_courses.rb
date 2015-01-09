class AddDescandNotNulltoCourses < ActiveRecord::Migration
  def change
    change_column :courses, :location, :string, null: false
    change_column :courses, :start_time, :integer, null: false
    change_column :courses, :end_time, :integer, null: false
    add_column :courses, :description, :text, null: false
  end
end
