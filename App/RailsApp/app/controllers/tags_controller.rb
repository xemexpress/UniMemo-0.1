class TagsController < ApplicationController
  def index
    render json: { tags: Request.tag_counts.most_used.map(&:name) }
  end
end
