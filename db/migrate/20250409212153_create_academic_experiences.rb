class CreateAcademicExperiences < ActiveRecord::Migration[8.0]
  def change
    create_enum :academic_experience_date_precision, %w[day month year]
    create_table :academic_experiences do |t|
      t.string :institution
      t.string :degree
      t.string :start_date
      t.string :end_date
      t.enum :date_precision, enum_type: "academic_experience_date_precision", default: "day", null: false
      t.string :description

      t.timestamps
    end
  end
end
