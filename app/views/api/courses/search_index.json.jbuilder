json.array! (@courses) do |course|
  json.id course.id
  json.name course.name
end
