Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'homepage#index'

  resources :explore, only: [:index, :show]
  resources :countries, only: [:index, :show]

  # Static pages
  get 'terms-of-service', to: 'static#terms', as: 'terms'
  get 'privacy', to: 'static#privacy', as: 'privacy'

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
