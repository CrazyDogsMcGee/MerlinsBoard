Rails.application.routes.draw do
	root to: "static_pages#root"

	resources :users, only: [:new, :create, :show]
	resource :session, only: [:new, :create, :destroy]
  resources :coursesinstructors, only: [:create, :destroy]
	resources :coursesstudents, only: [:create, :destroy], controller: "courses_students"
  resources :courses, only: [:create, :index, :destroy, :new, :show]
    
  namespace :api, defaults: { format: :json } do #duplicate views into this
      resources :coursesinstructors, only: [:create, :destroy]
  		resources :coursesstudents, only: [:create, :destroy]
  		resources :courses, only: [:create, :index, :destroy, :new, :show]
			resources :users, only: [:show, :index]
  end
        
end
