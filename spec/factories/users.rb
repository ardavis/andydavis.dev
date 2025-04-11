FactoryBot.define do
  factory :user do
    name { "Clark Kent" }
    email { "clark@kent.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end
