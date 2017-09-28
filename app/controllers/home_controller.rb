class HomeController < ApplicationController
  def index
    @news = DataStore.news.all.limit(2)
    @market = DataStore.market.all.limit(2)
    @finance = DataStore.finance.all.limit(2)
    @blogs = DataStore.blogs.all.limit(2)
    @guides = DataStore.guides.all.limit(2)
  end
end
