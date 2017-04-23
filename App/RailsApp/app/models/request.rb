class Request < ApplicationRecord
  belongs_to :poster, :class_name => "User"
  belongs_to :helper, :class_name => "User"

  scope :posted_by, ->(username) { where(poster: User.where(username: username)) }
  scope :helped_by, ->(username) { where(helper: User.where(username: username)) }

  validates :text, presence: true, allow_blank: false
end
