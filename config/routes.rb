Rails.application.routes.draw do
  get "desks/show"
  root "users#show"

  devise_for :users

  resources :users do
    resources :academic_experiences
  end

  # resource :cityscape, only: :show
  resource :desk, only: :show

  namespace :api do
    # resource :cityscape
    resource :desk
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
