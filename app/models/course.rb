class Course < ActiveRecord::Base
  WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  validates :name, :location, :start_time, :end_time, :day, :description, presence: true
  validates :name, uniqueness: true
  validates :day, inclusion: {in: WEEKDAYS}

  has_many(
  :courses_students, #maybe should change this to enrollments
  class_name:  "CoursesStudents",
  dependent: :destroy)

  has_many(
  :courses_instructors, #and this to professorships or something
  class_name: "CoursesInstructors",
  dependent: :destroy)

  has_many :students, through: :courses_students, source: :student
  has_many :instructors, through: :courses_instructors, source: :instructor

  #NO SNAKE CASE IN RUBY
  #Associations are found through filenames? not necessarily class names?


end
