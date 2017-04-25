class Request < ApplicationRecord
  belongs_to :poster, :class_name => "User"
  belongs_to :helper, :class_name => "User"
  has_many :wishes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :follows, as: :followable, dependent: :destroy

  acts_as_followable

  scope :posted_by, ->(username) { where(poster: User.where(username: username)) }
  scope :helped_by, ->(username) { where(helper: User.where(username: username)) }
  scope :wished_by, ->(username) { joins(:wishes).where(wishes: { user: User.where(username: username) }) }

  acts_as_taggable

  validates :tag_list, presence: true, allow_blank: false
  validates :text, presence: true, allow_blank: false
end
