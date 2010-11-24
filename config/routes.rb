Audio::Application.routes.draw do
  devise_for :users

  resources :songs
  resources :albums

  root :to => "albums#index"

end
