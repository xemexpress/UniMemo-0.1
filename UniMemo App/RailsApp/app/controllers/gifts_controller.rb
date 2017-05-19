class GiftsController < ApplicationController
  before_action :authenticate_user!
  before_action :fix_expired, except: [:create]
  before_action :find_gift!, except: [:index, :create]

  def index
    @gifts = @gifts.tagged_with(params[:tag]) if params[:tag].present?

    @gifts_count = @gifts.count

    @gifts = @gifts.order(updated_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 10)
  end

  def create
    @gift = Gift.new(gift_params)
    @gift.provider = current_user
    if params[:gift].key?("receiver")
      if @gift.last_for_at_least_three_days?
        @gift.receiver = User.find_by_username!(params[:gift][:receiver][:username])
        @gift.save!
      else
        render json: { errors: { expire_at: ['should be at least 3 days after today'] } }, status: :forbidden
        return
      end
    else
      @gift.receiver = User.find(@current_user_id)
      @gift.save!
    end
    if @gift.save
      @gift.gift_id = rand(36**3).to_s(36) + Hashids.new("UniMemo").encode(@gift.id) + rand(36**3).to_s(36)
      @gift.save!

      render :show
    else
      render json: { errors: @gift.errors }, status: :unprocessable_entity
    end
  end

  def show
  end

  def update
    if @gift.provider_id == @current_user_id
      @gift.update_attributes(gift_params)
      if params[:gift].has_key?("receiver")
        if @gift.last_for_at_least_three_days?
          @gift.receiver = User.find_by_username!(params[:gift][:receiver][:username])
          @gift.save!
        else
          render json: { errors: { expire_at: ['should be at least 3 days after today'] } }, status: :forbidden
          return
        end
      end

      render :show
    elsif @gift.receiver_id == @current_user_id
      @gift.receiver = User.find_by_username!(@gift.provider.username)
      @gift.tag_list.remove('openPublic').add('public') if @gift.tag_list.include?('openPublic')
      @gift.save!

      render :show
    else
      @gift.receiver = User.find(@current_user_id)
      @gift.tag_list.remove('openPublic').add('public')
      @gift.save!

      render :show
    end
  end

  def switch
    if @gift.provider_id == @current_user_id
      if @gift.tag_list.include?('personal')
        @gift.tag_list.remove('personal').add('public')
      else
        @gift.tag_list.remove('public', 'openPublic').add('personal')
      end
      @gift.save!

      render :show
    elsif @gift.receiver_id == @current_user_id
      if !@gift.tag_list.include?('personal')
        if @gift.tag_list.include?('public')
          @gift.tag_list.remove('public').add('openPublic')
        else
          @gift.tag_list.remove('openPublic').add('public')
        end
        @gift.save

        render :show
      else
        render json: { errors: { gift: ['not public'] } }, status: :forbidden
      end
    else
      render json: { errors: { gift: ['already openPublic'] } }, status: :forbidden
    end
  end

  def destroy
    if @gift.provider_id == @current_user_id
      @gift.destroy

      render json: {}
    else
      render json: { errors: { gift: ['not provided by user'] } }, status: :forbidden
    end
  end

  private

  def gift_params
    params.require(:gift).permit(:text, :image, :expire_at, :receiver, tag_list: [])
  end

  def find_gift!
    @gift = @gifts.find_by_gift_id!(params[:gift_id])
  end

  def fix_expired
    @open_public_gifts = Gift.tagged_with("openPublic").map(&:gift_id)
    @gifts = Gift.all.related_to(@current_user_id).or(Gift.tagged(@open_public_gifts))
    @gifts.expired.find_each do |gift|
      gift.receiver = gift.provider
      gift.save!
    end
  end
end