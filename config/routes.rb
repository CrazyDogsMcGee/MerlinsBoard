Rails.application.routes.draw do
	root to: "static_pages#root"

 	resources :users, only: [:new, :create, :show]
	resource :session, only: [:new, :create, :destroy]
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }

  namespace :api, defaults: { format: :json } do
    resources :coursesinstructors, only: [:create, :destroy]
    resources :coursesstudents, only: [:create, :destroy], controller: "courses_students"
    resources :announcements #might have to "member do" for easy-access custom routes from a particular course
    resources :assignments
    resources :resources
    resources :grades, only: [:update, :show]
    resources :courses do
      get "course_search", on: :collection
      get "student_search", on: :member
    end
    resources :users, only: [:show, :index, :update] do
      get "users_search", on: :collection
      resources :grades, only: [:index]
    end
  end

end
