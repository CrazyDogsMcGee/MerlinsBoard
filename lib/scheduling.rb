module Scheduling
  def conflicts_with_link
    new_enroll = self.course
    user = User.includes(:courses,:taughtcourses).find(self.user_id)

    case self #case statements use triple-equals (a === b) - is 'b' an instance of 'a'?
    when CoursesStudents
      double_enrolled?(self.course_id, user.taughtcourses)
    when CoursesInstructors
      double_enrolled?(self.course_id, user.courses)
    else
      raise "else"
    end

    begin
    user_courses = user.courses.select {|course| (course.location == new_enroll.location) && (course.day == new_enroll.day)} #ugly as sin, will need to be refactored to reduce # of queries
    user_taughtcourses = user.taughtcourses.select {|course| (course.location == new_enroll.location) && (course.day == new_enroll.day)}
    rescue
      puts user
    end

    course_conflict(new_enroll, user_courses+user_taughtcourses,{eval_enroll: true})
  end

  def double_enrolled?(course_id, course_array)
    match_array = course_array.select {|course| course.id == course_id}

    unless match_array.empty?
      errors.add(:course_id, "cannot be the same as an already attended/taught class")
    end
  end

  def course_conflict(course, course_array, options)
    course_array.each do |existing_course| #straight O(n) query also not ideal
      if options[:eval_enroll]
        next if existing_course.id == course.id #I need this because the course is always saved to the database before the enrollment, which will then undergo its own validation. It will be part of the users courses already
      end

      if overlapping_time?(course,existing_course)
        errors.add(:course_id, "Time/location conflict with existing class #{existing_course.name}")
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
