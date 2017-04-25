class TakesController < ApplicationController
  before_action :authenticate_user!

  def create
    @request = Request.find_by_request_id!(params[:request_request_id])

    current_user.follow(@request) if @current_user_id != @request.poster_id

    render 'requests/show'
  end
end
