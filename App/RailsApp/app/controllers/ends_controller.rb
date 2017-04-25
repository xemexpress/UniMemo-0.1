class EndsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_request!

  private

  def find_request!
    @request = Request.find_by_request_id!(params[:request_request_id])
  end
end
