class TagsController < ApplicationController
  def index
    @requests = Request.all.tagged_with('ongoing')

    @open_public_gifts = Gift.tagged_with("openPublic").map(&:gift_id)
    @gifts = Gift.where(receiver: current_user).or(Gift.tagged(@open_public_gifts))

    if params[:tag] == 'requests'
      render json: {
        request_tags: @requests.tag_counts.most_used.map(&:name) - ['done', 'ongoing', 'ongoing-taken']
      }
    elsif params[:tag] == 'gifts'
      render json: {
        gift_tags: @gifts.tag_counts.most_used.map(&:name) - ['personal', 'public', 'openPublic']
      }
    else
      render json: {
        request_tags: @requests.tag_counts.most_used.map(&:name) - ['done', 'ongoing', 'ongoing-taken'],
        gift_tags: @gifts.tag_counts.most_used.map(&:name) - ['personal', 'public', 'openPublic']
      }
    end
  end
end
