class CoursesStudents < ActiveRecord::Base
  include Scheduling
  
  validate :conflicts_with_link, :not_instructor
  
  belongs_to(
    :student,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :courses_students
  )
  belongs_to :course, inverse_of: :courses_students
  
  has_many :assignments, foreign_key: :course_id, primary_key: :course_id #rails probably guesses the class/object-type smartly
  has_many :announcements, foreign_key: :course_id, primary_key: :course_id
  #A "belongs_to" association is only valid when then the resource in question has the resource ID of its "owner" object
  
  validate :not_instructor
  validates :user_id, uniqueness: {scope: :course_id, message: "Can't enroll in the same class twice"}

  def conflicts_with_link
    new_link = self
    new_enroll = self.course
    user_courses = self.user.courses #violation of LoD - should investigate and refactor
    user_courses = user_courses.where("location = ? AND day = ?", self.location, self.day) #ugly as sin, will need to be refactored to reduce # of queries
    
    course_conflict(new_enroll, user_courses)
  end

end
