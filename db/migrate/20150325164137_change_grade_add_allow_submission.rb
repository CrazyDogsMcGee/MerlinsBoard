class ChangeGradeAddAllowSubmission < ActiveRecord::Migration
  def change
    rename_column :grades, :grade, :score
    add_column :grades, :allow_submission, :boolean
  end
end
