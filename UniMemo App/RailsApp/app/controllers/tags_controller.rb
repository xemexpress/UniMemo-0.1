class TagsController < ApplicationController
  def index
    if params[:tag] == 'requests'
      render json: {
        request_tags: Request.all.tagged_with('ongoing').tag_counts.most_used.map(&:name) - ['done', 'ongoing', 'ongoing-taken']
      }
    elsif params[:tag] == 'gifts'
      render json: {
        gift_tags: Gift.tag_counts.most_used.map(&:name) - ['personal', 'public', 'openPublic']
      }
    else
      render json: {
        request_tags: Request.all.tagged_with('ongoing').tag_counts.most_used.map(&:name) - ['done', 'ongoing', 'ongoing-taken'],
        gift_tags: Gift.tag_counts.most_used.map(&:name) - ['personal', 'public', 'openPublic']
      }
    end
  end
end
