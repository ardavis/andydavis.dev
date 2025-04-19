class DesksController < ApplicationController
  def show
    @user = User.find_by(email: "andy@andydavis.dev")
    @projects = @user.projects
  end
end
