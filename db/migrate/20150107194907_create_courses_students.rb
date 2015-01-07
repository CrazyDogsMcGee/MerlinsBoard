class CreateCoursesStudents < ActiveRecord::Migration
  def change
    create_table :courses_students do |t|
      t.integer :user_id, null:false
      t.integer :course_id, null:false

      t.timestamps
    end
    add_index :courses_students, [:user_id,:course_id], unique: true
  end
end
