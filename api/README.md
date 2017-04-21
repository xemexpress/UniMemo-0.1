# UniMemo API Spec

### Authentication Header:

`Authorization: Token jwt.token.here`

## JSON Objects returned by API:

### Users (for authentication)

```JSON
{
  "user": {
    "id": 1,
    "username": "xemexpress",
    "email": "xemexpress@uni.com",
    "bio": "Working in the Sea of Palaces",
    "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
    "mobileNum": "85212345678",
    "mem": 0,
    "greyStars": 0,
    "yellowStars": 0,
    "token": "jwt.token.here"
  }
}
```

### Profile

```JSON
{
  "profile": {
    "username": "xemexpress",
    "bio": "Working in the Sea of Palaces",
    "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
    "yellowStars": 0
  }
}
```

### Single gift

```JSON
{
  "gift": {
    "type": "giveOrLend",
    "text": "10 Pen refills (0.5mm)",
    "image": "https://photouploads.com/image/1N0"
  }
}
```

### Multiple gifts

```JSON
{
  "gifts": [
    {
      "type": "giveOrLend",
      "text": "10 Pen refills (0.5mm)",
      "image": "https://photouploads.com/image/1N0"
    },
    {
      "type": "deliver",
      "text": "Olympic Station",
      "image": null
    },
    {
      "type": "deliver",
      "text": "University Station",
      "image": null
    },
    {
      "type": "deliver",
      "text": "Mong Kok East Station",
      "image": null
    },
    {
      "type": "know",
      "text": "整西多士",
      "image": "https://photouploads.com/image/1Nx"
    },
    {
      "type": "know",
      "text": "basic windsurfing",
      "image": null
    }
  ]
}
```

### Single Request

```JSON
{
  "request": {
    "status": "ongoing",
    "type": "shopping",
    "startTime": "",
    "startPlace": "",
    "endTime": "2017-04-15T17:30",
    "endPlace": "Exit B at University Station",
    "text": "Please help me buy a Book called 'Winning' by Jack Welch.",
    "images": ["https://images-na.ssl-images-amazon.com/images/I/5168G4UoVFL._SY346_.jpg"],
    "createdAt": "2017-04-13T03:22",
    "updatedAt": "2017-04-13T03:48",
    "request_id": 2,
    "wished": true,
    "wishesCount": 1,
    "poster": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0
    },
    "helper": ""
  }
}
```

### Multiple requests

```JSON
{
  "requests":[{
    "status": "ongoing",
    "type": "shopping",
    "startTime": "",
    "startPlace": "",
    "endTime": "2017-04-15T17:30",
    "endPlace": "Exit B at University Station",
    "text": "Please help me buy a Book called 'Winning' by Jack Welch.",
    "images": ["https://images-na.ssl-images-amazon.com/images/I/5168G4UoVFL._SY346_.jpg"],
    "createdAt": "2017-04-13T03:22",
    "updatedAt": "2017-04-13T03:48",
    "request_id": 2,
    "wished": true,
    "wishesCount": 1,
    "poster": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0
    },
    "helper": ""
  }, {
    "status": "done",
    "type": "production",
    "startTime": "2017-04-11T19:00",
    "startPlace": "Yin Chong St, Mong Kok",
    "endTime": "2017-04-18",
    "endPlace": "We Decide",
    "text": "有冇人可以幫我寄養「鴨腳木」一個星期？",
    "images": ["https://photouploads.com/image/ybr"],
    "createdAt": "2017-04-13T03:22",
    "updatedAt": "2017-04-13T03:48",
    "request_id": 1,
    "wished": true,
    "wishesCount": 1,
    "poster": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0
    },
    "helper": "Kate Yuen"
  }],
  "requestsCount": 2
}
```

### Single comment

```JSON
{
  "comment": {
    "id": 1,
    "body": "You can borrow it from CU:)",
    "createdAt": "2017-04-13T06:48",
    "author": {
      "username": "Jason Luo",
      "bio": "The Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0
    }
  }
}
```

### Multiple comments

```JSON
{
  "comments": [{
    "id": 1,
    "body": "You can borrow it from CU:) Do you need help?",
    "createdAt": "2017-04-13T06:48",
    "author": {
      "username": "Jason Luo",
      "bio": "The Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0
    }
  }, {
    "id": 2,
    "body": "Oh thank you! I go borrow it later.",
    "createdAt": "2017-04-13T07:50",
    "author": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 3
    }
  }]
}
```

### Errors and Status Codes

If a request fails any validations, expect a 422 and errors in the following format:

```JSON
{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
```

#### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request


## Endpoints:

### Authentication:

`POST /api/users/login`

Example request body:
```JSON
{
  "user":{
    "email": "xemexpress@uni.com",
    "password": "unimemo"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `email`, `password`


### Registration:

`POST /api/users`

Example request body:
```JSON
{
  "user":{
    "username": "xemexpress",
    "email": "xemexpress@uni.com",
    "password": "unimemo"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `email`, `username`, `password`



### Get Current User

`GET /api/user`

Authentication required, returns a [User](#users-for-authentication) that's the current user



### Update User

`PUT /api/user`

Example request body:
```JSON
{
  "user":{
    "email": "xemexpress@uni.com",
    "bio": "The Sea of Palaces",
    "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg"
  }
}
```

Authentication required, returns the [User](#users-for-authentication)


Accepted fields: `email`, `username`, `password`, `proPic`, `bio`



### Get Profile

`GET /api/profiles/:username`

Authentication optional, returns a [Profile](#profile)



### List Requests

`GET /api/requests`

Returns most recent requests globally be default

Limit number of requests (default is 10):

`?limit=10`

Authentication optional, will return [multiple requests](#multiple-requests), ordered by most recent first



### Retrieve Request

`GET /api/requests/:request_id`

No authentication required, will return [single request](#single-request)

### Create Request

`POST /api/requests`

Example request body:

```JSON
{
  "request": {
    "type": "production",
    "startTime": "2017-04-11T19:00",
    "startPlace": "Yin Chong St, Mong Kok",
    "endTime": "2017-04-18",
    "endPlace": "We Decide",
    "text": "有冇人可以幫我寄養「鴨腳木」一個星期？",
    "images": ["https://photouploads.com/image/ybr"]
  }
}
```

Authentication required, will return an [Request](#single-request)

Required fields: `type`, `startTime`, `startPlace`, `endTime`, `endPlace`, `text`

Optional fields: `images` as an array of imageURLs



### Update request

`PUT /api/requests/:request_id`

Example request body:

```JSON
{
  "request": {
    "text": "Please help me buy a Book called 'Winning' by Jack Welch from The Commercial Press."
  }
}
```

Authentication required, returns the updated [Request](#single-request)

Optional fields: `title`, `description`, `body`

The `slug` also gets updated when the `title` is changed



### Adding comments to a request

`POST /api/requests/:request_id/comments`

Example request body:

```JSON
{
  "comment": {
    "body": "You can borrow it from CU:) Do you need help?"
  }
}
```

Authentication required, returns the created [Comment](#single-comment)

Required fields: `body`



### Getting comments from a request

`GET /api/requests/:request_id/comments`

Authentication optional, returns [multiple comments](#multiple-comments)



### Deleting a comment

`DELETE /api/requests/:request_id/comments/:id`

Authentication required



### Wishing a request

`POST /api/requests/:request_id/wish`

Authentication required, returns the [Request](#single-request)

No additional parameters required



### Unwishing a request

`DELETE /api/requests/:request_id/wish`

Authentication required, returns the [Request](#single-request)

No additional parameters required
