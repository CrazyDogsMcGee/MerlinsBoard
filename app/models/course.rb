class Course < ActiveRecord::Base
  WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  validates :name, :location, :start_time, :end_time, :day, :description, presence: true
  validates :name, uniqueness: true
  validates :day, inclusion: {in: WEEKDAYS}
  validate :conflicts_with
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

  def conflicts_with #refactor with a where search - may have to index on some of these properties
    newCourse = self
    Course.all.each do |existingcourse|
      next if newCourse.id == existingcourse.id
      if newCourse.location == existingcourse.location
        if existingcourse.day == newCourse.day
          if (
            ((existingcourse.end_time < newCourse.start_time) && (existingcourse.start_time < newCourse.start_time)) || ((existingcourse.start_time > newCourse.end_time) && (existingcourse.end_time > newCourse.end_time))
            )
            next
          else
            errors.add(:base, "Time/location conflict with existing class #{existingcourse.name}")
            return
          end
        end
      end
    end

  end
  
  def conflicts_with_new
    new_course = self
    #will want to optimize this later, unsure whether a giant SQL statement is the way to go
    possible_matches = Course.where("location = ? AND day = ?", self.location, self.day)
    
    possible_matches.each do |existing_course| #straight O(n) query also not ideal
      next if existing_course.id == new_course.id
      
      if overlapping_time?(self,existing_course)
        errors.add(:base, "Time/location conflict with existing class #{existing_course.name}")
      else
        next
      end
    end
  end
  
  def self.parsed_time(time)
    time_regexp = Regexp.new(/\d\d:\d\d/)
    return time_regexp.match(time.to_s)[0]
  end

  #private 
  
  def overlapping_time?(course1,course2)
    end_time_1 = course1.end_time.to_i
    start_time_1 = course1.start_time.to_i
    
    end_time_2 = course2.end_time.to_i
    start_time_2 = course2.start_time.to_i
    
    return (start_time_1 - end_time_2) * (start_time_2 - end_time_1) >= 0
  end

end
