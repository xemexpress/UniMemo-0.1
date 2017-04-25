class ConfirmsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_request!

  def index
    @helpers = @request.followers

    @helpers_count = @helpers.count

    @helpers = @helpers.offset(params[:offset] || 0).limit(params[:limit] || 10)
  end

  private

  def find_request!
    @request = Request.find_by_request_id!(params[:request_request_id])
  end
end
