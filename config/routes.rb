Rails.application.routes.draw do
	root to: "static_pages#root"

 	resources :users, only: [:new, :create, :show]
	resource :session, only: [:new, :create, :destroy]
#   resources :coursesinstructors, only: [:create, :destroy]
# 	resources :coursesstudents, only: [:create, :destroy], controller: "courses_students"
#   resources :courses, only: [:create, :index, :destroy, :new, :show]

  namespace :api, defaults: { format: :json } do
    resources :coursesinstructors, only: [:create, :destroy]
    resources :coursesstudents, only: [:create, :destroy], controller: "courses_students"
    resources :courses
    resources :announcements #might have to "member do" for easy-access custom routes from a particular course
    resources :assignments
    resources :users, only: [:show, :index] do
      resources :grades, only: [:index]
    end
  end

end
