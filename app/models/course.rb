class Course < ActiveRecord::Base
  WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  validates :name, :location, :start_time, :end_time, :day, :description, presence: true
  validates :name, uniqueness: true
  validates :day, inclusion: {in: WEEKDAYS}
  validate :conflicts_with

  has_many(
  :courses_students, #maybe should change this to enrollments
  class_name:  "CoursesStudents",
  dependent: :destroy)

  has_many(
  :courses_instructors, #and this to professorships or something
  class_name: "CoursesInstructors",
  dependent: :destroy)
  
  has_many :announcements
  has_many :students, through: :courses_students, source: :student
  has_many :instructors, through: :courses_instructors, source: :instructor

  #NO SNAKE CASE IN RUBY
  #Associations are found through filenames? not necessarily class names?

  def conflicts_with
    newCourse = self

    Course.all.each do |existingcourse|
      if newCourse.location == existingcourse.location
        if existingcourse.day == newCourse.day
          if (
            ((existingcourse.end_time < newCourse.start_time) && (existingcourse.start_time < newCourse.start_time)) || ((existingcourse.start_time > newCourse.end_time) && (existingcourse.end_time > newCourse.end_time))
            )
            next
          else
            errors.add(:base, "Time/location conflict with existing class")
            return
          end
        end
      end
    end

  end

end
