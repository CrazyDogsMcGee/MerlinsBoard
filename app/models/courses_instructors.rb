class CoursesInstructors < ActiveRecord::Base
  #validate :conflicts_with

  belongs_to(
    :instructor,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :courses_instructors
  )
  belongs_to :course, inverse_of: :courses_instructors

end
