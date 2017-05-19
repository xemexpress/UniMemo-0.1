class TagsController < ApplicationController
  def index
    render json: {
      request_tags: Request.tag_counts.most_used.map(&:name),
      gift_tags: Gift.tag_counts.most_used.map(&:name)
     }
  end
end