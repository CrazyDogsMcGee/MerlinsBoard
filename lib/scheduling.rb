module Scheduling
  
  def conflicts_with_link
    new_link = self
    new_enroll = self.course
    user_courses = self.user.courses #violation of LoD - should investigate
    
    course_conflict(new_enroll)
  end
  
  def conflicts_with_any_course
    new_course = self
    #will want to optimize this later, unsure whether a giant SQL statement is the way to go
    possible_matches = Course.where("location = ? AND day = ?", self.location, self.day)
    
    course_conflict(self, possible_matches)
  end
  
  #private 
  
  def overlapping_time?(course1,course2)
    end_time_1 = course1.end_time.to_i
    start_time_1 = course1.start_time.to_i
    
    end_time_2 = course2.end_time.to_i
    start_time_2 = course2.start_time.to_i
    
    return (start_time_1 - end_time_2) * (start_time_2 - end_time_1) >= 0
  end
  
  def course_conflict(course, course_array)
    course_array.each do |existing_course| #straight O(n) query also not ideal
      next if existing_course.id == course.id
      
      if overlapping_time?(self,existing_course)
        errors.add(:base, "Time/location conflict with existing class #{existing_course.name}")
      else
        next
      end
    end
  end
end