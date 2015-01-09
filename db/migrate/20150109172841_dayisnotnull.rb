class Dayisnotnull < ActiveRecord::Migration
  def change
    change_column :courses, :day, :string, null: false
  end
end
