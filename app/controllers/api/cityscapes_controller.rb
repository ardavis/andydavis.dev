class Api::CityscapesController < ApplicationController
  before_action :set_user

  def show
    ae = @user.academic_experiences.as_json(only: %i[institution degree start_date end_date description])
    render json: {
      academic_experiences: ae
    }
  end

  private

  def set_user
    @user = current_user
  end
end
