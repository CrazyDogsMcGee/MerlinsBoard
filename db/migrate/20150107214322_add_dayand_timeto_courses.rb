class AddDayandTimetoCourses < ActiveRecord::Migration
  def change
    rename_column :courses, :time, :start_time
    add_column :courses, :end_time,
    add_column :courses, :day, :string 
  end
end
