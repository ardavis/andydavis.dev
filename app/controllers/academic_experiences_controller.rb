class AcademicExperiencesController < ApplicationController
  before_action :set_user
  def index
    @academic_experiences = @user.academic_experiences
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end
end
