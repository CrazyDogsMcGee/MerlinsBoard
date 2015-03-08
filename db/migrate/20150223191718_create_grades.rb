class CreateGrades < ActiveRecord::Migration
  def change
    create_table :grades do |t|
      t.integer :grade
      t.integer :assignment_id
      t.integer :user_id

      t.timestamps
    end
    
    add_index :grades, :user_id
    add_index :grades, :assignment_id
  end
end
