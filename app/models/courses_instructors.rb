class CoursesInstructors < ActiveRecord::Base
  include Scheduling
  validate :conflicts_with_link
  validates :user_id, uniqueness: {scope: :course_id, message: "Can't teach the same class twice"}

  belongs_to(
    :instructor,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :courses_instructors
  )
  belongs_to :course, inverse_of: :courses_instructors

end
