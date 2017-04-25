class GiftsController < ApplicationController
  before_action :authenticate_user!

  private

  def gift_params
    params.require(:gift).permit(:text, :image, :expire_at, :receiver, tag_list: [])
  end
end
