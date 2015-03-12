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
  
  validate :conflicts_with, :not_instructor
  validates :user_id, uniqueness: {scope: :course_id, message: "Can't enroll in the same class twice"}

  def conflicts_with
    newCourse = self.course

    self.student.courses.each do |enrolledcourse|
      if enrolledcourse.day == newCourse.day
        if (
          ((enrolledcourse.end_time < newCourse.start_time) && (enrolledcourse.start_time < newCourse.start_time)) || ((enrolledcourse.start_time > newCourse.end_time) && (enrolledcourse.end_time > newCourse.end_time))
          )
          next
        else
          errors.add(:course_id, "Time conflict with another class")
        end
      end
    end

  end
	
	def not_instructor
		course = self.course
		user = User.find(self.student)
		
		if course.instructors.include?(user)
			errors.add(:base, "Instructor cannot be student of class!")
		end
		
	end

end
