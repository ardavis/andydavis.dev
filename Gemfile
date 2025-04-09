source "https://rubygems.org"

gem "rails", "~> 8.0.2"
gem "propshaft"                                         # Asset pipeline for Rails
gem "pg", "~> 1.1"                                      # Database
gem "puma", ">= 5.0"                                    # Web server
gem "importmap-rails"                                   # JavaScript with ESM import maps
gem "turbo-rails"                                       # Hotwire's page accelerator
gem "stimulus-rails"                                    # Hotwire's JS framework
gem "cssbundling-rails"                                 # Bundle and process CSS

# TODO: Likely remove.
# Use the database-backed adapters for Rails.cache and Active Job
# gem "solid_cache"
# gem "solid_queue"

gem "bootsnap", require: false                          # Reduce boot times through caching
gem "kamal", require: false                             # Deploy as a Docker container
gem "thruster", require: false                          # HTTP asset caching/compression and X-Sendfile acceleration to Puma

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem "brakeman", require: false

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem "rubocop-rails-omakase", require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end
