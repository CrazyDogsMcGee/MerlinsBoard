class CoursesController < ApplicationController
  def index
    #can create new enrollments from this view
    @courses = Course.all
    #<td><%= button_to '+', {:controller => "votes", :action => "create", :car_id => car.id, :user_id=> session[:user_id]} , :method=>:post  %></td>
  end

  def new
  end

  def create
  end

  private

  def course_params
  end
end
