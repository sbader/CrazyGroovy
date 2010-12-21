Audio::Application.routes.draw do
  devise_for :users

  resources :songs
  resources :albums
  
  devise_scope :user do
    get "signin", :to => "devise/sessions#new", :as => "new_user_session"
    get "signout", :to => "devise/sessions#destroy", :as => "destroy_user_session"
    get "signup", :to => "devise/registrations#new", :as => "new_user_registration"
    post "signin", :to => "devise/sessions#create", :as => "new_user_session"
    post "signup", :to => "devise/registrations#create", :as => "new_user_registration"
    get "forgotpassword", :to => "devise/passwords#new", :as => "new_user_password"
    post "forgotpassword", :to => "devise/passwords#create", :as => "new_user_password"
  end

  root :to => "albums#index"

end
