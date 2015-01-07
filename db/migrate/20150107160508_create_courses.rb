class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name, null:false
      t.string :location
      t.time :time

      t.timestamps
    end

    add_index :courses, :name, unique: true
  end
end
