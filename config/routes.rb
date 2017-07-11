Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'homepage#index'

  # Explore page
  resources :explore, only: [:index, :show]

  # Countries dashboard
  resources :countries, only: [:index, :show]

  # Insights
  resources :insights, only: [:index]

  # Insights
  resources :partners, only: [:index]

  # Planet pulse
  get 'pulse', to: 'planet_pulse#index', as: 'planet_pulse'

end
