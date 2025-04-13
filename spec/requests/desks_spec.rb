require 'rails_helper'

RSpec.describe "Desks", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/desks/show"
      expect(response).to have_http_status(:success)
    end
  end

end
