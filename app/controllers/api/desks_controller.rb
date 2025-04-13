class Api::DesksController < ApplicationController
  def show
    texturePacks = [
      {
        name: "wallTexturePack",
        paths: {
          color: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_diff_1k.jpg"),
          normal: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_nor_gl_1k.jpg"),
          arm: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_arm_1k.jpg")
        }
      },
      {
        name: "mouseAndKeyboard",
        paths: {
          ao: helpers.image_path("textures/mouse_and_keyboard/internal_ground_ao_texture.jpeg")
        }
      }
    ]

    models = [
      { name: "standingDesk", path: "models/standing_desk.glb" },
      { name: "ultrawideMonitor", path: "models/ultrawide_monitor.glb" },
      { name: "mouseAndKeyboard", path: "models/mouse_and_keyboard.glb" }
    ]

    environments = [
      { name: "SmallEmptyRoom1", path: "environments/small_empty_room_1_1k.hdr" }
    ]

    render json: {
      object_count: texturePacks.sum { |pack| pack[:paths].size } + models.size + environments.size,
      texturePacks: texturePacks,
      models: models,
      environments: environments
    }
  end
end
