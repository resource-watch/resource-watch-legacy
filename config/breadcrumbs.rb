crumb :root do
  link "Home", root_path
end

# Insights list
crumb :insights do
  link "Insights", page_path('insights')
  parent :root
end

# Partners list
crumb :partners do
  link "Partners", page_path('partners')
  parent :root
end

# Explore list
crumb :explore do
  link "Explore", explore_index_path
  parent :root
end

crumb :explore_detail do |id|
  link "#{id}"
  parent :explore
end

# Dashboard list
crumb :countries do
  link "Dashboard", countries_path
  parent :root
end

crumb :country do |id|
  link "#{id}"
  parent :countries
end

# crumb :projects do
#   link "Projects", projects_path
# end

# crumb :project do |project|
#   link project.name, project_path(project)
#   parent :projects
# end

# crumb :project_issues do |project|
#   link "Issues", project_issues_path(project)
#   parent :project, project
# end

# crumb :issue do |issue|
#   link issue.title, issue_path(issue)
#   parent :project_issues, issue.project
# end

# If you want to split your breadcrumbs configuration over multiple files, you
# can create a folder named `config/breadcrumbs` and put your configuration
# files there. All *.rb files (e.g. `frontend.rb` or `products.rb`) in that
# folder are loaded and reloaded automatically when you change them, just like
# this file (`config/breadcrumbs.rb`).
