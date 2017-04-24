class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, uniqueness: { case_sensitive: false },
                       presence: true,
                       allow_blank: false,
                       format: { with: /\A[a-zA-Z0-9]+\z/ }

  has_many :requests, dependent: :destroy
  has_many :wishes, dependent: :destroy
  has_many :comments, dependent: :destroy

  acts_as_follower
  acts_as_followable

  def generate_jwt
    JWT.encode({ id: id,
                exp: 60.days.from_now.to_i },
                Rails.application.secrets.secret_key_base)
  end

  def wish(request)
    wishes.find_or_create_by(request: request)
  end

  def unwish(request)
    wishes.where(request: request).destroy_all

    request.reload
  end

  def wished?(request)
    wishes.find_by(request_id: request.id).present?
  end

end
