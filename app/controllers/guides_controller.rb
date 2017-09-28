class GuidesController < ApplicationController
  def index
    @items = DataStore.guides.all
  end

  def show
    @item = DataStore.find params[:id]
  end
end
