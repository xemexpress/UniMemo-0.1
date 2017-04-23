class RequestsController < ApplicationController
  before_action :authenticate_user!

  def index
    @requests = Request.all.includes(:poster)

    # This corrupts Privacy, and may hurt Users due to others' limited understanding of the whole picture.
    #@requests = @requests.posted_by(params[:poster]) if params[:poster].present?

    # This is considered less aggressive. But still, it can indirectly harm Users.
    #@requests = @requests.helped_by(params[:helper]) if params[:helper].present?

    @requests_count = @requests.count

    @requests = @requests.order(created_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 10)
  end

  def create
    @request = Request.new(request_params)
    @request.poster = current_user

    if @request.save
      render :show
    else
      render json: { errors: @request.errors }, status: :unprocessable_entity
    end
  end

  private

  def request_params
    params.require(:request).permit(:start_time, :start_place, :end_time, :end_place, :text, :image)
  end
end
