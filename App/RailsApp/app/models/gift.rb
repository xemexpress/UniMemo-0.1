class Gift < ApplicationRecord
  belongs_to :provider, :class_name => "User"
  belongs_to :receiver, :class_name => "User"

  acts_as_taggable

  validates :tag_list, presence: true, allow_blank: false
  validates :text, presence: true, allow_blank: false
  validates :expire_at, presence: true, allow_blank: false
end
