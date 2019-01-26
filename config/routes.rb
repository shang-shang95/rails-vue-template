Rails.application.routes.draw do
  root to: "root#index"
  resources :root, only: [:show]
end
