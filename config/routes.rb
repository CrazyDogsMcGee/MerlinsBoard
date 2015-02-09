Rails.application.routes.draw do
	root to: "static_pages#root"

	resources :users, only: [:new, :create, :show]
	resource :session, only: [:new, :create, :destroy]
  resources :coursesinstructors, only: [:create, :destroy]
	resources :coursesstudents, only: [:create, :destroy], controller: "courses_students"
  resources :courses, only: [:create, :index, :destroy, :new, :show]
    
  namespace :api, defaults: { format: :json } do
    resources :coursesinstructors, only: [:create, :destroy]
    resources :coursesstudents, only: [:create, :destroy], controller: "courses_students" #this will automatically be namespaced as well
    resources :courses, only: [:create, :index, :destroy, :new, :show, :update]
    resources :announcements
		resources :users, only: [:show, :index]
  end
        
end
