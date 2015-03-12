class ChangeTimeColumnCourse < ActiveRecord::Migration
  def change
    remove_column :courses, :start_time
    remove_column :courses, :end_time
    
    add_column :courses, :start_time, :time
    add_column :courses, :end_time, :time
  end
end
