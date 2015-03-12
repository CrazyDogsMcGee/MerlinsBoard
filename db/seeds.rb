# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


harry = User.create(fname: "Harry", lname: "Potter", email: "chosen1@gmail.com", password: "iamsogreat") #1
ron = User.create(fname: "Ron", lname: "Weasley", email: "gingerlad@gmail.com", password: "butter_mellow") #2
hermione = User.create(fname: "Hermione", lname: "Granger", email: "levi0sa@gmail.com", password: "alohomora") #3

Course.create()
Course.create()

Announcement.create()
Announcement.create() 
Announcement.create()
Announcement.create()

Assignment.create()
Assignment.create()
Assignment.create()
Assignment.create()
Assignment.create()

CoursesStudents.create()
CoursesStudents.create()
CoursesStudents.create()

CoursesInstructors.create()
CoursesInstructors.create()

# Grade.create()
# Grade.create()
# Grade.create()
