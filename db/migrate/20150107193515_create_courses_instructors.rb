class CreateCoursesInstructors < ActiveRecord::Migration
  def change
    create_table :courses_instructors do |t|
      t.integer :user_id, null:false
      t.integer :course_id, null:false

      t.timestamps
    end
    add_index :courses_instructors, [:user_id,:course_id], unique: true
  end
end
