json.array! @courses do |course|
  json.name course.name
  json.location course.location
  json.day course.day
  json.description course.description
  json.start_time Course.parsed_time(course.start_time)
  json.end_time Course.parsed_time(course.end_time)
  json.instructor do
    json.fname course.instructor.fname
    json.lname course.instructor.lname
  end
end