# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


(1..10).each do |user_no|
  User.create(
    fname: Faker::Name.first_name,
    lname: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: Faker::Internet.password(8),
  )
end

weekdays = ["Monday,Tuesday,Wednesday,Thursday,Friday"]

(1..5).each do |course_no|
  time_string = "12:0" + course_no.to_s
  end_time_string = "12:0" + (course_no+2).to_s
  
  Course.create(
    name: Faker::Lorem.word,
    location: Faker::Address.street_address,
    day: weekdays[rand(5)],
    description: Faker::Lorem.sentence,
    start_time: time_string,
    end_time: end_time_string
  )
end

#enrollment

(1..20).each do |enroll| #will inevitably cause double enrollments somewhere...
  course_no = (rand(5)+1)
  student_no = (enroll%10)
  
  CoursesStudents.create(
    user_id: student_no,
    course_id: course_no
  )
end

(1..10).each do |teacher|
  course_no = (rand(5)+1)
  instructor_no = (rand(10)+1)
  
  CoursesInstructors.create(
    user_id: instructor_no,
    course_id: course_no
  )
end

#for announcements and assignments, need to set up inverse relationship... maybe. Will need to think about it for a bit

CousesInstructors.all.each do |admin_link|
  course_no = admin_link.course_id
  admin_id = admin_link.user_id
  
  3.times { 
    Announcement.create(
      title: Faker::Lorem.word.capitalize,
      body: Faker::Lorem.paragraph,
      user_id: admin_id,
      course_id: course_no,
    )
  }
  
  2.times {
    Assignment.create(
      title: Faker::Lorem.word.capitalize,
      description: Faker::Lorem.sentence,
      due_date: Faker::Date.forward(10), #should find someway to exclude weekends
      course_id: course_no
    )  
  }
  
end

CoursesStudents.all.each do |student_link|
  #grades here
end