class ResourceNotNull < ActiveRecord::Migration
  def change
    change_column :resources, :name, :string, null: false
    change_column :resources, :description, :text, null: false
    change_column :resources, :course_id, :integer, null: false
  end
end
