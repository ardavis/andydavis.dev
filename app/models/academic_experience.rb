class AcademicExperience < ApplicationRecord
  enum :date_precision, { day: "day", month: "month", year: "year" }
end
