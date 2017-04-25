class EndsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_request!

  def show
    if @request.poster_id == @current_user_id
      if @request.helper_id != @current_user_id
        @helper = User.find(@request.helper_id)
        @helper.update_attributes(:mem => (@helper.mem || 0) + params[:mem].to_i, :yellowStars => (@helper.yellowStars || 0) + 1)
      end
      @request.tag_list.remove("ongoing-taken").add("done")
      @request.save

      render 'requests/show'
    else
      render json: { errors: { request: ['only for poster'] } }
    end
  end

  private

  def find_request!
    @request = Request.find_by_request_id!(params[:request_request_id])
  end
end
