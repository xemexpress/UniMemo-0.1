json.(user, :username, :email, :bio, :proPic, :mobileNum, :mem, :greystars, :yellowStars)
json.token user.generate_jwt
