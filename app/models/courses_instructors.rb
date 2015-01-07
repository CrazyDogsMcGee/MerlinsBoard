class CoursesInstructors < ActiveRecord::Base
  validate :conflicts_with

  belongs_to(
    :instructor,
    class_name: "User",
    foreign_key: :user_id
  )

  belongs_to :course

  def conflicts_with
    errors.add("Time conflict with another class")
  end

end
