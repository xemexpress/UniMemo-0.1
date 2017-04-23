class Request < ApplicationRecord
  belongs_to :poster
  belongs_to :helper

  validates :text, presence: true, allow_blank: false
end
