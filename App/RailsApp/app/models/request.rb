class Request < ApplicationRecord
  belongs_to :poster, :class_name => "User"
  belongs_to :helper, :class_name => "User"
  has_many :wishes, dependent: :destroy

  scope :posted_by, ->(username) { where(poster: User.where(username: username)) }
  scope :helped_by, ->(username) { where(helper: User.where(username: username)) }
  scope :wished_by, ->(username) { joins(:wishes).where(wishes: { user: User.where(username: username) }) }

  acts_as_taggable

  validates :text, presence: true, allow_blank: false
end
