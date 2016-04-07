class ExploreController < ApplicationController
  def index
    @title = t 'titles.explore'
  end

  def show
    @exploreSlug = params["id"]
  end
end
