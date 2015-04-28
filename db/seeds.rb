User.create(fname:"Jonathan", lname: "Lee", email: "l33.jonathan@gmail.com", password: "testing")
User.create(fname:"Pat", lname: "Doe", email: "user123@test.com", password: "Welcome")

(1..50).each do |user_no|
  User.create(
    fname: Faker::Name.first_name,
    lname: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: Faker::Internet.password(8),
  )
end

weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
course_names = ["Biology", "Computer Science","Calculus","Anthropology","Modern Lit."]

(0..5).each do |course_no|
  time_string = "12:0" + course_no.to_s
  end_time_string = "12:0" + (course_no+2).to_s

  Course.create(
    name: course_names[course_no],
    location: Faker::Address.street_address,
    day: weekdays[course_no],
    description: "A course where you learn about #{course_names[course_no]}",
    start_time: time_string,
    end_time: end_time_string
  )
end


#enrollment
[1].each do |odd|
  CoursesStudents.create(user_id: 1, course_id: odd)
end

[2].each do |odd|
  CoursesStudents.create(user_id: 2, course_id: odd)
end

2.times{
  User.all.each do |user|
    next if user == 1 || user == 2
    course_no = rand(1..5)
    student_no = user.id

    CoursesStudents.create( #to make this less haphazard, I could just iterate over the courses and users and match up it to avoid collisions.
      user_id: student_no,
      course_id: course_no
    )
  end
}

[2].each do |even|
  CoursesInstructors.create(user_id: 1, course_id: even)
end

[1,4].each do |odd|
  CoursesInstructors.create(user_id: 2, course_id: odd)
end

(2..11).each do |teacher| #not getting hit enough times, need to rejigger to avoid conflicts or just increase number to increase chances of seeding database
  course_no = rand(1..5)
  instructor_no = rand(3..50)

  CoursesInstructors.create(
    user_id: instructor_no,
    course_id: course_no
  )
end

CoursesInstructors.all.each do |admin_link|
  course_no = admin_link.course_id
  admin_id = admin_link.user_id

  announcement_body = [
    "Class will not be meeting next time due to inclement weather. The exam has been postponed to next week.",
    "Reminder that your in-class projects are due in a couple days. Meet with your groups to discuss your presentations.",
    "Don't forget to bring your textbook to class tommorow for the reading period."
  ]
  
  (0..2).each {|x|
    Announcement.create(
      title: "Hello!",
      body: announcement_body[x],
      user_id: admin_id,
      course_id: course_no
    )
  }

end

Course.all.each do |course|
  
  3.times {
    Assignment.create(
      title: "Worksheets",
      description: "Complete the worksheets given out in class by the due date.",
      due_date: Faker::Date.forward(10), #should find someway to exclude weekends
      course_id: course.id
    )
  }
end

CoursesStudents.all.each do |student_link|
  course_id = student_link.course_id
  user_id = student_link.user_id
  course = Course.find(course_id)

  course.assignments.each do |assignment|
    Grade.create(user_id: user_id, assignment_id: assignment.id, score: rand(101), allow_submission: true)
  end
end


[1].each do |odd|
  r_odd = Resource.create(course_id: odd, name: "Gene expression", description: "How do developmental paradigms receive temporal signals?")
  r_odd.document_from_url("https://s3.amazonaws.com/merlinsboardapp/Application/plbi-10-11-Gregorio-primer.pdf")
  
  Course.find(odd).grades.where(user_id: 1).first.submission_from_url("https://s3.amazonaws.com/merlinsboardapp/Application/Essay.docx")
end

[2].each do |even|
  r_even = Resource.create(course_id: even, name: "Intro to MongoDB", description: "Learn about NoSQL databases!")
  r_even.document_from_url("https://s3.amazonaws.com/merlinsboardapp/Application/MongoDB-CheatSheet-v1_0.pdf")
  
  Course.find(even).grades.where(user_id: 2).first.submission_from_url("https://s3.amazonaws.com/merlinsboardapp/Application/lorem.docx")
end