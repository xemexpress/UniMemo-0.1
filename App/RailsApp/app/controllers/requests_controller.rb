class RequestsController < ApplicationController
  before_action :authenticate_user!

  private

  def request_params
    params.require(:request).permit(:start_time, :start_place, :end_time, :end_place, :text, :image)
  end
end
