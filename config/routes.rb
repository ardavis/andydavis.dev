Rails.application.routes.draw do
  root "users#show"

  devise_for :users

  resources :users do
    resources :academic_experiences
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
