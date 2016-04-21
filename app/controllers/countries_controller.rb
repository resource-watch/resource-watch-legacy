class CountriesController < ApplicationController
  def index
    @title = t 'titles.dashboards'
  end

  def show
    @countrySlug = params["id"]
  end
end
