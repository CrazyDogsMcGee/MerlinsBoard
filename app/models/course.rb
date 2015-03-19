class Course < ActiveRecord::Base
  WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  include Scheduling
  include PgSearch
  pg_search_scope :search_by_name_and_desc, against: [:name, :description]

  validates :name, :location, :start_time, :end_time, :day, :description, presence: true
  validates :name, uniqueness: true
  validates :day, inclusion: {in: WEEKDAYS}
  validate :conflicts_with_any_course, on: :create
  #validate :start_before_end

  has_many(
  :courses_students,
  class_name:  "CoursesStudents",
  dependent: :destroy,
  inverse_of: :course
  )

  has_many(
  :courses_instructors,
  class_name: "CoursesInstructors",
  dependent: :destroy,
  inverse_of: :course
  )

  has_many :announcements, dependent: :destroy
  has_many :resources, dependent: :destroy
  has_many :assignments, dependent: :destroy

  has_many :students, through: :courses_students, source: :student
  has_many :grades, through: :assignments, source: :grades
  has_many :instructors, through: :courses_instructors, source: :instructor

  def conflicts_with_any_course
    new_course = self
    possible_matches = Course.where("location = ? AND day = ?", self.location, self.day) #should index on these fields then
    course_conflict(self, possible_matches, {eval_enroll: false})
  end

  def start_before_end
    errors.add(:base, "Course end time must be greater than course start time") if Course.parsed_time(self.end_time) <= Course.parsed_time(self.start_time)
  end

  def self.parsed_time(time)
    time_regexp = Regexp.new(/\d\d:\d\d/)
    return time_regexp.match(time.to_s)[0]
  end

end
