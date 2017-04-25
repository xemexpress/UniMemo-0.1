class Gift < ApplicationRecord
  belongs_to :provider, :class_name => "User"
  belongs_to :receiver, :class_name => "User"

  scope :related_to, (user_id) -> { where(provider_id: user_id).or(Gift.where(receiver_id: user_id)) }

  acts_as_taggable

  validates :tag_list, presence: true, allow_blank: false
  validates :text, presence: true, allow_blank: false
  validates :expire_at, presence: true, allow_blank: false
end
