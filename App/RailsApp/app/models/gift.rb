class Gift < ApplicationRecord
  belongs_to :provider
  belongs_to :receiver
end
