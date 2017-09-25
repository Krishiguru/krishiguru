Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
  get :faqs, to: 'static#faq'
  get :disclaimer, to: 'static#disclaimer'
  get :privacy_policy, to: 'static#privacy_policy'
  get :website_tutorial, to: 'static#website_tutorial'

  get :weather, to: 'weather#index'
  resources :market, only: [:index, :show]
  resources :news, only: [:index, :show]
  resources :guides, only: [:index, :show]
  resources :finance, only: [:index, :show]
end
