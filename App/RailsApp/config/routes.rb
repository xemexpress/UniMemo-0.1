Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    devise_for :users, controllers: { sessions: :sessions },
                       path_names: { sign_in: :login }
    resource :user, only: [:show, :update] do
      resources :gifts, param: :gift_id, except: [:edit, :new]
    end

    resources :profiles, param: :username, only: [:show] do
      resource :favor, only: [:create, :destroy]
    end

    resources :requests, param: :request_id, except: [:edit, :new] do
      resource :wish, only: [:create, :destroy]
      resource :take, only: [:create, :destroy]
      resources :comments, except: [:edit, :new, :show]
      resources :confirms, param: :username, only: [:index, :show]
      resources :ends, param: :mem, only: [:show]
      get :collect, on: :collection
    end

    resources :tags, only: [:index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
