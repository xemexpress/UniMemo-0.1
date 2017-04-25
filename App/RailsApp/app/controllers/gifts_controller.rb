class GiftsController < ApplicationController
  before_action :authenticate_user!

  def index
    @gifts = Gift.all.related_to(@current_user_id)

    @gifts_count = @gifts.count

    @gifts = @gifts.order(updated_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 10)
  end

  def create
    @gift = Gift.new(gift_params_provider)
    @gift.provider = @gift.receiver = current_user
    @gift.gift_id = rand(36**3).to_s(36) + Hashids.new("UniMemo").encode(@gift.id) + rand(36**3).to_s(36)

    if @article.save
      render :show
    else
      render json: { errors: @gift.errors}, status: :unprocessable_entity
    end
  end

  def show
    @gift = Gift.find_by_gift_id!(params[:gift_id])
  end

  def update
    @gift = Gift.find_by_gift_id!(params[:gift_id])

    if @gift.provider_id == @current_user_id
      @gift.update_attributes(gift_params_provider)
    elsif @gift.receiver_id == @current_user_id
      @gift.update_attributes(gift_params_as_receiver)
    else
      render json: { errors: { gift: ['not related to user'] } }, status: :forbidden
    end

    render :show
  end

  private

  def gift_params_as_provider
    params.require(:gift).permit(:text, :image, :expire_at, :receiver, tag_list: [])
  end

  def gift_params_as_receiver
    params.require(:gift).permit(:receiver, tag_list: [])
  end
end
