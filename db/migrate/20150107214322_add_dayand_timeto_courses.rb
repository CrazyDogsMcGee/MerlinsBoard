class AddDayandTimetoCourses < ActiveRecord::Migration
  def change
    remove_column :courses, :time
    add_column :courses, :start_time, :integer
    add_column :courses, :end_time, :integer
    add_column :courses, :day, :string
  end
end
