class Api::DesksController < ApplicationController
  def show
    texturePacks = [
      {
        name: "wallTexturePack",
        type: "texturePack",
        paths: {
          color: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_diff_1k.jpg"),
          normal: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_nor_gl_1k.jpg"),
          arm: helpers.image_path("textures/painted_plaster_wall/painted_plaster_wall_arm_1k.jpg")
        }
      }
    ]

    models = [
      {
        name: "standingDeskModel",
        type: "gltfModel",
        path: "models/standing_desk.glb"
      }
    ]

    render json: {
      object_count: texturePacks.sum { |pack| pack[:paths].size } + models.size,
      texturePacks: texturePacks,
      models: models
    }
  end
end
