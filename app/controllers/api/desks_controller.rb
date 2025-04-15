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

    models = [
      { name: "standingDesk", path: "models/standing_desk.glb" },
      { name: "ultrawideMonitor", path: "models/ultrawide_monitor.glb" },
      { name: "mouseAndKeyboard", path: "models/mouse_and_keyboard.glb" },
      { name: "pictureFrame", path: "models/picture_frame.glb" },
      { name: "curtain", path: "models/curtain.glb" },
      { name: "window", path: "models/window.glb" }
    ]

    environments = [
      { name: "SmallEmptyRoom1", path: "environments/small_empty_room_1_1k.hdr" }
    ]

    # TODO: Add https://polyhaven.com/a/rubber_duck_toy

    render json: {
      object_count: texturePacks.sum { |pack| pack[:paths].size } + models.size + environments.size,
      texturePacks: texturePacks,
      models: models,
      environments: environments
    }
  end
end
