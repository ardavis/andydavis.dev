class AcademicExperience < ApplicationRecord
  enum :date_precision, { day: "day", month: "month", year: "year" }

  belongs_to :user

  validates :institution, presence: true
  validates :degree, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true, comparison: { greater_than: :start_date }
  validates :description, presence: true
end
