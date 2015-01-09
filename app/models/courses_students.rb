class CoursesStudents < ActiveRecord::Base
  belongs_to(
    :student,
    class_name: "User",
    foreign_key: :user_id
  )

  belongs_to :course

  validate :conflicts_with
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

end
