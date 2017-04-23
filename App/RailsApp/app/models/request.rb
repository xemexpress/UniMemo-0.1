class Request < ApplicationRecord
  belongs_to :poster, :class_name => "User"
  belongs_to :helper, :class_name => "User"

  scope :posted_by, ->(username) { where(poster: User.where(username: username)) }
  scope :helped_by, ->(username) { where(helper: User.where(username: username)) }

  validates :text, presence: true, allow_blank: false
  validates :request_id, uniqueness: true

  before_validation do
    self.request_id ||= "#{rand(36**3).to_s(36)}#{id.to_s(36)}#{rand(36**3).to_s(36)}"
  end
end
