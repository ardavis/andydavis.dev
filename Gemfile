source "https://rubygems.org"

gem "rails", "~> 8.0.2"
gem "propshaft"                                         # Asset pipeline for Rails
gem "pg", "~> 1.1"                                      # Database
gem "puma", ">= 5.0"                                    # Web server
gem "importmap-rails"                                   # JavaScript with ESM import maps
gem "turbo-rails"                                       # Hotwire's page accelerator
gem "stimulus-rails"                                    # Hotwire's JS framework
gem "cssbundling-rails"                                 # Bundle and process CSS
gem "bootsnap", require: false                          # Reduce boot times through caching
gem "kamal", require: false                             # Deploy as a Docker container
gem "thruster", require: false                          # HTTP asset caching/compression and X-Sendfile acceleration to Puma
gem "devise", "~> 4.9"                                  # Authentication
gem "haml-rails"                                        # View templates (preferred over ERB for conciseness)
gem "html2haml"

group :development, :test do
  gem "debug", require: "debug/prelude"                 # Debugger
  gem "brakeman", require: false                        # Static analysis for security vulnerabilities
  gem "rubocop-rails-omakase", require: false           # Omakase Ruby style
  gem "rspec-rails"                                     # Tests
  gem "factory_bot_rails"                               # Factories for Testing
end

group :development do
  gem "web-console"                                     # Console on exceptions pages
  gem "guard"                                           # Autorun tests
  gem "guard-rspec"                                     # Autorun tests on save
  gem "hotwire-spark"                                   # Live view reloading
  gem "haml-lint", require: false                       # Haml Style
end
