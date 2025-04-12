# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Users
user = if Rails.env.development?
         User.find_or_create_by(name: "Andy Davis", email: "andy@andydavis.dev", password: "password", password_confirmation: "password")
       else
         User.find_or_create_by(name: "Andy Davis", email: "andy@andydavis.dev")
       end

# Academic Experiences
