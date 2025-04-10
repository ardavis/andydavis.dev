FactoryBot.define do
  factory :academic_experience do
    institution { "The Derek Zoolander Center for Kids Who Can't Read Good" }
    degree { 'reading' }
    start_date { 2.years.ago }
    end_date { 1.year.ago }
    description { "I went to school, read some stuff, and got a degree." }
  end
end
