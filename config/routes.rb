Rails.application.routes.draw do

  root 'homepage#index'

  # Explore page
  resources :explore, only: [:index, :show]

  # Countries dashboard
  resources :countries, only: [:index, :show]

  # Insights
  resources :insights, only: [:index]

  # Planet pulse
  get 'planet-pulse', to: 'planet_pulse#index', as: 'planet_pulse'

end
