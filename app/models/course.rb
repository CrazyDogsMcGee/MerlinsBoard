class Course < ActiveRecord::Base
  validates :name, presence: true

  has_many(
  :courses_students, #maybe should change this to enrollments
  class_name:  "CoursesStudents"
  )
  
  has_many(
  :courses_instructors, #and this to professorships or something
  class_name: "CoursesInstructors"
  )

  has_many :students, through: :courses_students, source: :student
  has_many :instructors, through: :courses_instructors, source: :instructor

  #NO SNAKE CASE IN RUBY
  #Associations are found through filenames? not necessarily class names?


end
