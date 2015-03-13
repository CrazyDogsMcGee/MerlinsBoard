module Scheduling
#   def conflicts_with_link
#     new_enroll = self.course
#     user = self.user.includes(:courses,:taughtcourses) #user doesn't exist, if I want to use this, I'll have to do a hell of a lot of refactoring to make sure my references are congruent
    
#     user_courses = user.courses.where("location = ? AND day = ?", self.location, self.day) #ugly as sin, will need to be refactored to reduce # of queries
#     user_taughtcourses = user.taughtcourses.where("location = ? AND day = ?", self.location, self.day)
    
#     course_conflict(new_enroll, user_courses+user_taughtcourses)
#   end
#   
  def conflicts_with_link
    new_enroll = self.course
    user = User.includes(:courses,:taughtcourses).find(self.user_id)
    
    user_courses = user.courses.where("location = ? AND day = ?", new_enroll.location, new_enroll.day) #ugly as sin, will need to be refactored to reduce # of queries
    user_taughtcourses = user.taughtcourses.where("location = ? AND day = ?", new_enroll.location, new_enroll.day)
    
    course_conflict(new_enroll, user_courses+user_taughtcourses,{eval_enroll: true})
  end
  
  def course_conflict(course, course_array, options)
    course_array.each do |existing_course| #straight O(n) query also not ideal
      if options[:eval_enroll]
        next if existing_course.id == course.id #I need this because the course is always saved to the database before the enrollment, which will then undergo its own validation. It will be part of the users courses already
      end
      
      if overlapping_time?(course,existing_course)
        errors.add(:base, "Time/location conflict with existing class #{existing_course.name}")
        return
      else
        next
      end
    end
  end
  
  
  def overlapping_time?(course1,course2)
    end_time_1 = course1.end_time.to_i
    start_time_1 = course1.start_time.to_i
    
    end_time_2 = course2.end_time.to_i
    start_time_2 = course2.start_time.to_i
    
    return (start_time_1 - end_time_2) * (start_time_2 - end_time_1) >= 0
  end
  
end