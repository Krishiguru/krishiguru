class NewsController < ApplicationController
  def index
    @items = DataStore.news.all
  end

  def show
    @item = DataStore.find params[:id]
  end
end
