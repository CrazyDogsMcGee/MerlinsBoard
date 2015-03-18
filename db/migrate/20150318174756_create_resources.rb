class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :name
      t.text :description
      t.integer :course_id

      t.timestamps
    end

    add_index :resources, :course_id
  end
end
