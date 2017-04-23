class UsersController < Applicationcontroller
  before_action :authenticate_user!

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :bio, :proPic)
  end
end
