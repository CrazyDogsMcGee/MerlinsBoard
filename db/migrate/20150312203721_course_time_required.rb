class CourseTimeRequired < ActiveRecord::Migration
  def change
    change_column :courses, :end_time, :time, null: false
    change_column :courses, :start_time, :time, null: false
  end
end
