class Course < ActiveRecord::Base
  WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  include Scheduling
  
  validates :name, :location, :start_time, :end_time, :day, :description, presence: true
  validates :name, uniqueness: true
  validates :day, inclusion: {in: WEEKDAYS}
  validate :conflicts_with_any_course
  #validate endstartime

  has_many(
  :courses_students, #maybe should change this to enrollments
  class_name:  "CoursesStudents",
  dependent: :destroy,
  inverse_of: :course
  )

  has_many(
  :courses_instructors, #and this to professorships or something
  class_name: "CoursesInstructors",
  dependent: :destroy,
  inverse_of: :course
  )
  
  has_many :announcements, dependent: :destroy
  has_many :students, through: :courses_students, source: :student
  has_many :instructors, through: :courses_instructors, source: :instructor
  has_many :assignments, dependent: :destroy
  has_many :grades, through: :assignments, source: :grade
  
  def conflicts_with_any_course
    new_course = self
    #will want to optimize this later, unsure whether a giant SQL statement is the way to go
    possible_matches = Course.where("location = ? AND day = ?", self.location, self.day)
    course_conflict(self, possible_matches)
  end
#   
  def self.parsed_time(time)
    time_regexp = Regexp.new(/\d\d:\d\d/)
    return time_regexp.match(time.to_s)[0]
  end

end
