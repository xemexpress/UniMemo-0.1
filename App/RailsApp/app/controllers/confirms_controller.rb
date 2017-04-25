class ConfirmsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_request!

  def index
    if @request.poster_id == @current_user_id
      @helpers = User.where(id: @request.user_followers.pluck(:id))

      @helpers_count = @helpers.count

      @helpers = @helpers.order(yellowStars: :desc).offset(params[:offset] || 0).limit(params[:limit] || 10)
    else
      render json: { errors: { requests: ['not owned by user'] } }, status: :forbidden
    end
  end

  def show
    if @request.poster_id == @current_user_id
      @helper = User.find_by_username!(params[:username])
      @request.helper = @helper

      render 'requests/show'
    else
      render json: { errors: { requests: ['not owned by user'] } }, status: :forbidden
    end
  end

  private

  def find_request!
    @request = Request.find_by_request_id!(params[:request_request_id])
  end
end
