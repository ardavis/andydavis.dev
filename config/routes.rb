Rails.application.routes.draw do
  root "users#show"

  devise_for :users

  resources :users do
    resources :academic_experiences
  end

  resource :cityscape, only: :show

  namespace :api do
    resource :cityscape
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
