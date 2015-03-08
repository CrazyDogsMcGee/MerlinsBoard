class DeleteGrade < ActiveRecord::Migration
  def change
    remove_column :assignments, :grade
  end
end
