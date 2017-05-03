class RequestsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @requests = Request.includes(:poster)

    @requests = @requests.tagged_with(params[:tag]) if params[:tag].present?

    # This corrupts Privacy, and may hurt Users due to others' limited understanding of the whole picture.
    #@requests = @requests.posted_by(params[:poster]) if params[:poster].present?

    # This is considered less aggressive. But still, it can indirectly harm Users.
    #@requests = @requests.helped_by(params[:helper]) if params[:helper].present?

    @requests = @requests.wished_by(params[:wisher]) if params[:wisher].present?

    @requests_count = @requests.count

    @requests = @requests.order(created_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 10)
  end

  def collect
    @requests = Request.includes(:poster).where(poster: current_user.following_users)

    @requests = @requests.tagged_with(params[:tag]) if params[:tag].present?

    @requests_count = @requests.count

    @requests = @requests.order(created_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 10)

    render :index
  end

  def create
    @request = Request.new(request_params)
    @request.poster = @request.helper = current_user

    if @request.save
      @request.request_id = rand(36**3).to_s(36) + Hashids.new("UniMemo").encode(@request.id) + rand(36**3).to_s(36)
      @request.save
      
      render :show
    else
      render json: { errors: @request.errors }, status: :unprocessable_entity
    end
  end

  def show
      @request = Request.find_by_request_id!(params[:request_id])
  end

  def update
    @request = Request.find_by_request_id!(params[:request_id])

    if @request.poster_id == @current_user_id
      @request.update_attributes(request_params)

      render :show
    else
      render json: { errors: { request: ['not posted by user'] } }, status: :forbidden
    end
  end

  def destroy
    @request = Request.find_by_request_id!(params[:request_id])

    if @request.poster_id == @current_user_id
      @request.destroy

      render json: {}
    else
      render json: { errors: { request: ['not posted by user'] } }, status: :forbidden
    end
  end

  private

  def request_params
    params.require(:request).permit(:start_time, :start_place, :end_time, :end_place, :text, :image, tag_list: [])
  end
end
