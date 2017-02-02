class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  http_basic_authenticate_with name: ENV["USERNAME"], password: ENV["PASSWORD"]
  before_action :site_name, :set_fitscreen

  private

    def site_name
      @site_name = 'Resource Watch'
    end

    def set_fitscreen
      pages_fitscreen = ['explore', 'planet_pulse']
      @is_fitscreen = pages_fitscreen.include?(controller_name)
    end

end
