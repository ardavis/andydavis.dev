class AcademicExperiencesController < ApplicationController
  before_action :set_user
  before_action :set_academic_experience, only: %i[edit update destroy]
  def index
    @academic_experiences = @user.academic_experiences
  end

  def new
    @academic_experience = @user.academic_experiences.build
  end

  def create
    @academic_experience = @user.academic_experiences.build(academic_experience_params)
    if @academic_experience.save
      redirect_to user_academic_experiences_path(@user)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @academic_experience.update(academic_experience_params)
      redirect_to user_academic_experiences_path(@user)
    else
      render :edit
    end
  end

  def destroy
    @academic_experience.destroy
    redirect_to user_academic_experiences_path(@user), notice: "Academic Experience has been destroyed"
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_academic_experience
    @academic_experience = @user.academic_experiences.find(params[:id])
  end

  def academic_experience_params
    params.expect(academic_experience: %i[institution degree start_date end_date date_precision description])
  end
end
