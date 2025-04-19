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
andyuna_desc = <<~DESC
  AndYunA is a Rails app that I made for our wedding. We let our guests learn more about the event as well as RSVP instead of sending paper invites.
DESC

gamestockpile_desc = <<~DESC
  GameStockpile is a Rails app that I made to help me keep track of my board game collection.
DESC

ayrship_desc = <<~DESC
  Ayrship is a Rails app that I made for a small company that I started with my wife and a friend. We ultimately decided to shut it down before gaining any clients due to other work.
DESC

project_data = [
  { name: "andyuna", url: "https://andyuna.andydavis.dev", description: andyuna_desc, thumbnail: "andyuna.png" },
  { name: "gamestockpile", url: "https://gamestockpile.andydavis.dev", description: gamestockpile_desc, thumbnail: "gamestockpile.png" },
  { name: "ayrship", url: "https://ayrship.andydavis.dev", description: ayrship_desc, thumbnail: "ayrship.png" }
]
project_data.each do |project|
  user.projects.find_or_create_by!(name: project[:name], url: project[:url], description: project[:description],
                                   thumbnail: project[:thumbnail])
end

# Academic Experiences
