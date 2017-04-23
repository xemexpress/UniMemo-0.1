json.(user, :username, :email, :bio, :proPic, :mobileNum, :mem, :greyStars, :yellowStars)
json.token user.generate_jwt
