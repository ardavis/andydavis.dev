class Api::DesksController < ApplicationController
  def show
    # TODO: These resources are quite hefty. Can we lighten the load some? Compression?
    texturePacks = [
      {
        name: "wall",
        paths: {
          color: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_diff_1k.jpg"),
          normal: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_nor_gl_1k.jpg"),
          arm: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_arm_1k.jpg")
        }
      },
      {
        name: "wallpaper",
        paths: {
          color: helpers.image_path("textures/wallpaper/moon_from_iss_nasa.jpg")
        }
      }
    ]

    # TODO: Move licenses to be with their respective models
    models = [
      { name: "standingDesk", path: "models/desk.glb" },
      { name: "ultrawideMonitor", path: "models/monitor.glb" },
      { name: "mouseAndKeyboard", path: "models/mouse_and_keyboard.glb" },
      { name: "pictureFrame", path: "models/wedding_photo.glb" },
      { name: "curtain", path: "models/curtains.glb" },
      { name: "window", path: "models/window/scene.gltf" },
      { name: "rubberDuck", path: "models/rubber_duck_toy/rubber_duck_toy_1k.gltf" },
      { name: "headphones", path: "models/headphones_with_stand.glb" }
    ]

    environments = [
      { name: "SmallEmptyRoom1", path: "environments/small_empty_room_1_1k.hdr" }
    ]

    # TODO: user.projects
    projects = [
      { name: "andyuna", url: "https://andyuna.andydavis.dev", description: "TODO", thumbnail: "andyuna_thumbnail.jpg" },
      { name: "gamestockpile", url: "https://gamestockpile.andydavis.dev", description: "TODO", thumbnail: "gamestockpile_thumbnail.jpg" },
      { name: "ayrship", url: "https://ayrship.andydavis.dev", description: "TODO", thumbnail: "ayrship_thumbnail.jpg" }
    ]

    render json: {
      object_count: texturePacks.sum { |pack| pack[:paths].size } + models.size + environments.size,
      texturePacks: texturePacks,
      models: models,
      environments: environments,
      projects: projects
    }
  end
end
