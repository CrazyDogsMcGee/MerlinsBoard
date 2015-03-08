class Assignmentsnullfalse < ActiveRecord::Migration
  def change
    change_column :assignments, :title, :string, null: false
    change_column :assignments, :description, :text, null: false
    change_column :assignments, :due_date, :date, null: false
    change_column :assignments, :course_id, :integer, null: false
  end
end
