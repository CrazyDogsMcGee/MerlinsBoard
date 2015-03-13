class CoursesInstructors < ActiveRecord::Base
  include Scheduling
  #validate :conflicts_with

  belongs_to(
    :instructor,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :courses_instructors
  )
  belongs_to :course, inverse_of: :courses_instructors
  
  def conflicts_with_link
    new_link = self
    new_enroll = self.course
    user_courses = self.user.courses #violation of LoD - should investigate
    
    course_conflict(new_enroll)
  end
end
