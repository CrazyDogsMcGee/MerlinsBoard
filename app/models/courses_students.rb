class CoursesStudents < ActiveRecord::Base
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

  def conflicts_with
    newCourse = self.course
  end
	
	def not_instructor
		course = self.course
		user = User.find(self.student)
		
		if course.instructors.include?(user)
			errors.add(:base, "Instructor cannot be student of class!")
		end
		
	end

end
