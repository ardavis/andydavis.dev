# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Users
user = if Rails.env.development?
         User.find_or_create_by!(name: "Andy Davis", email: "andy@andydavis.dev") do |user|
           user.password = "password"
           user.password_confirmation = "password"
           user.confirmed_at = Time.now
         end
       end

# Projects
project_data = [
  { name: "andyuna", url: "https://andyuna.andydavis.dev", description: "TODO", thumbnail: "andyuna.png" },
  { name: "gamestockpile", url: "https://gamestockpile.andydavis.dev", description: "TODO", thumbnail: "gamestockpile.png" },
  { name: "ayrship", url: "https://ayrship.andydavis.dev", description: "TODO", thumbnail: "ayrship.png" }
]
project_data.each do |project|
  user.projects.find_or_create_by!(name: project[:name], url: project[:url], description: project[:description],
                                   thumbnail: project[:thumbnail])
end

# Academic Experiences
