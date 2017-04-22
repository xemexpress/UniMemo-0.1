class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session, prepend: true

  respond_to :json

  before_action :underscore_params!

  private

  def underscore_params!
    params.transform_keys!(&:underscore)
  end
end
