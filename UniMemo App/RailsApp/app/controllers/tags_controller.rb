class TagsController < ApplicationController
  def index
    if params[:tag] == 'requests'
      render json: {
        request_tags: Request.all.tagged_with('ongoing').tag_counts.most_used.map(&:name) - ['done', 'ongoing', 'ongoing-taken']
      }
    elsif params[:tag] == 'gifts'
      @open_public_gifts = Gift.tagged_with("openPublic").map(&:gift_id)
      render json: {
        gift_tags: Gift.all.related_to(@current_user_id).or(Gift.tagged(@open_public_gifts)).tag_counts.most_used.map(&:name) - ['personal', 'public', 'openPublic']
      }
    else
      @open_public_gifts = Gift.tagged_with("openPublic").map(&:gift_id)
      render json: {
        request_tags: Request.all.tagged_with('ongoing').tag_counts.most_used.map(&:name) - ['done', 'ongoing', 'ongoing-taken'],
        gift_tags: Gift.all.related_to(@current_user_id).or(Gift.tagged(@open_public_gifts)).tag_counts.most_used.map(&:name) - ['personal', 'public', 'openPublic']
      }
    end
  end
end
