class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :site_name

  private
  
    def site_name
      @site_name = 'Resource Watch'
    end

end
