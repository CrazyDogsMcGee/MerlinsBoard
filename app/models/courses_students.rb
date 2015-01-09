class CoursesStudents < ActiveRecord::Base
  belongs_to(
    :student,
    class_name: "User",
    foreign_key: :user_id
  )

  belongs_to :course

  validate :conflicts_with, on: :create

  def conflicts_with
    newCourse = self.course

    self.student.courses.each do |enrolledcourse|
      if enrolledcourse.day == newCourse.day
        if (
          (enrolledcourse.end_time < newCourse.start_time && enrolledcourse.start_time < newCourse.start_time)  || (enrolledcourse.end_time > newCourse.end_time && enrolledcourse.end_time > newCourse.end_time))
          errors.add("Time conflict with another class")
        end
      end
    end

  end

end
