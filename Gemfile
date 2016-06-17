source 'https://rubygems.org'

ruby '2.3.0'

gem 'rails', '>= 5.0.0.rc1', '< 5.1'

# Rails plugins
gem 'puma', '~> 3.0'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'gretel', '~> 3.0.8'
gem 'dotenv-rails', '~> 2.1.1'

# Serving static files
gem 'high_voltage', '~> 3.0.0'

# Assets pipeline
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'sass-rails', '~> 5.0'
gem 'autoprefixer-rails'
gem 'jquery-rails'
gem 'bourbon', '~> 4.2.6'
gem 'handlebars_assets', '~> 0.23.0'

source 'https://rails-assets.org' do
  gem 'rails-assets-normalize-css', '~> 4.0.0'
  gem 'rails-assets-underscore', '~> 1.8.3'
  gem 'rails-assets-backbone', '~> 1.3.2'
  gem 'rails-assets-d3', '~> 3.5.16'
  gem 'rails-assets-vega', '~> 2.5.2'
  gem 'rails-assets-three.js', '~> 0.75.0'
  gem 'rails-assets-moment', '~> 2.12.0'
  gem 'rails-assets-slick-carousel', '~> 1.5.9'
  gem 'rails-assets-chosen', '~> 1.5.1'
end

group :development, :test do
  gem 'teaspoon-mocha', '~> 2.3.3'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # gem 'i18n-tasks', '~> 0.9.5'
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'quiet_assets'
end

group :production do
  gem 'rails_12factor'
end
