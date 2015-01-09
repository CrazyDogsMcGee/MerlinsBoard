Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:new, :create, :show]
  resources :coursesinstructors, only: [:create, :destroy]
  resources :coursesstudents, only: [:create, :destroy]
  resources :courses, only: [:create, :index, :destroy, :new,]
  resource :session, only: [:new, :create]

end
