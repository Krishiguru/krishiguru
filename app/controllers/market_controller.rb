class MarketController < ApplicationController
  def index
    @items = DataStore.market.all
  end

  def show
    @item = DataStore.find params[:id]
  end
end
