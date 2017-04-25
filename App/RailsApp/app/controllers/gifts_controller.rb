class GiftsController < ApplicationController
  before_action :authenticate_user!

  def index
    @gifts = Gift.all.related_to(@current_user_id)

    @gifts_count = @gifts.count

    @gifts = @gifts.order(updated_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 10)
  end

  def create
    @gift = Gift.new(gift_params)
    @gift.provider = @gift.receiver = current_user
    @gift.gift_id = rand(36**3).to_s(36) + Hashids.new("UniMemo").encode(@gift.id) + rand(36**3).to_s(36)

    if @article.save
      render :show
    else
      render json: { errors: @gift.errors}, status: :unprocessable_entity
    end
  end

  private

  def gift_params
    params.require(:gift).permit(:text, :image, :expire_at, :receiver, tag_list: [])
  end
end
