source 'https://rubygems.org'

ruby '2.3.0'

gem 'rails', '>= 5.0.0.beta3', '< 5.1'

# Rails plugins
gem 'puma', '~> 3.2.0'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'gretel', '~> 3.0.8'

# Serving static files
gem 'high_voltage', '~> 3.0.0'

# Assets pipeline
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails', '~> 4.1.1'
gem 'sass-rails', '~> 5.0'
gem 'autoprefixer-rails', '~> 6.3.5'
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
  gem 'rails-assets-slick.js', '~> 1.5.9'
end

group :development, :test do
  gem 'teaspoon-mocha', '~> 2.3.3'
end

group :development do
  gem 'spring', '~> 1.6.4'
  gem 'quiet_assets', '~> 1.1.0'
end

group :production do
  gem 'rails_12factor'
end
