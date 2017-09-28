class FinanceController < ApplicationController
  def index
    @items = DataStore.finance.all
  end

  def show
    @item = DataStore.find params[:id]
  end
end
