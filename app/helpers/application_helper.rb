module ApplicationHelper
  def active_page_class?(path)
    return '-active' if request.path == path
    ''
  end
end
