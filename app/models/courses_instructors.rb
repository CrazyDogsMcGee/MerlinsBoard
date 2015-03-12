class CoursesInstructors < ActiveRecord::Base
  validate :conflicts_with

  belongs_to(
    :instructor,
    class_name: "User",
    foreign_key: :user_id,
    dependent: :destroy,
    inverse_of: :courses_instructors
  )
  belongs_to :course, dependent: :destroy, inverse_of: :courses_instructors

  def conflicts_with
    newCourse = self.course

    self.instructor.courses.each do |taughtcourse|
      if taughtcourse.day == newCourse.day
        if (
          ((taughtcourse.end_time < newCourse.start_time) && (taughtcourse.start_time < newCourse.start_time)) || ((taughtcourse.start_time > newCourse.end_time) && (taughtcourse.end_time > newCourse.end_time))
          )
          next
        else
          errors.add(:course_id, "Time conflict with another taught class")
        end
      end
    end
  end

end
