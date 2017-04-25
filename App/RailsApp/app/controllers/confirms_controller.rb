class ConfirmsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_request!

  def index
    @confirms = @request.followers
  end

  private

  def find_request!
    @request = Request.find_by_request_id!(params[:request_request_id])
  end
end
