class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.string :title
      t.text :description
      t.date :due_date
      t.integer :course_id
      t.integer :grade

      t.timestamps
    end
    add_index :assignments, :course_id
  end
end
