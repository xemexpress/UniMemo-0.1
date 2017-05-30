class TagsController < ApplicationController
  def index
    render json: {
      request_tags: Request.all.tagged_with('ongoing').tag_counts.most_used.map(&:name) - ['done', 'ongoing', 'ongoing-taken'],
      gift_tags: Gift.tag_counts.most_used.map(&:name)
     }
  end
end
