class Request < ApplicationRecord
  belongs_to :poster
  belongs_to :helper

  validates :text, presence: true, allow_blank: false
  validates :request_id, uniqueness: true

  before_validation do
    self.request_id ||= "#{rand(36**3).to_s(36)}#{id.to_s(36)}#{rand(36**3).to_s(36)}"
  end
end
