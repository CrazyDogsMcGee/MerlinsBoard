class CoursesInstructors < ActiveRecord::Base
  # validate :conflicts_with

  belongs_to(
    :instructor,
    class_name: "User",
    foreign_key: :user_id
  )

  belongs_to :course

  def conflicts_with
    #This is supposed to see if the teacher has any other scheduled classes for the same day and time
  end

end
