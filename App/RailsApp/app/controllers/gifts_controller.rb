class GiftsController < ApplicationController
  before_action :authenticate_user!

  def index
    @gifts = Gift.all.related_to(@current_user_id)

    @gifts_count = @gifts.count

    @gifts = @gifts.order(updated_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 10)
  end

  private

  def gift_params
    params.require(:gift).permit(:text, :image, :expire_at, :receiver, tag_list: [])
  end
end
