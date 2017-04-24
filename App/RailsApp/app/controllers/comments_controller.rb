class CommentsController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :find_request!

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_request!
    @request = Request.find_by_request_id!(params[:request_request_id])
  end
end
