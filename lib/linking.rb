module Linking
  
  def conflicts_with
    attended_courses = self.user.courses + self.user.taughtcourses
    
    attended_courses 
  end
  
end