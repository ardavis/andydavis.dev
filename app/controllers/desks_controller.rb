class DesksController < ApplicationController
  def show
    @projects = [
      { name: "andyuna", url: "https://andyuna.andydavis.dev", description: "TODO", thumbnail: "andyuna_thumbnail.png" },
      { name: "gamestockpile", url: "https://gamestockpile.andydavis.dev", description: "TODO", thumbnail: "gamestockpile_thumbnail.png" },
      { name: "ayrship", url: "https://ayrship.andydavis.dev", description: "TODO", thumbnail: "ayrship_thumbnail.png" }
    ]
  end
end
