class AddUserIdToAcademicExperiences < ActiveRecord::Migration[8.0]
  def change
    add_reference :academic_experiences, :user, null: false, foreign_key: true
  end
end
