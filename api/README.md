# UniMemo API Spec

### Authentication Header:

`Authorization: Token jwt.token.here`


## JSON Objects returned by API:

### Users (for authentication)

```JSON
{
  "user": {
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
    "yellowStars": 0,
    "favoring": false
  }
}
```

### Single Gift

```JSON
{
  "gift": {
    "tagList": ["openPublic", "giveOrLend"],
    "text": "10 Pen refills (0.5mm)",
    "image": "https://photouploads.com/image/1N0",
    "createdAt": "2017-04-25T20:02",
    "updatedAt": "2017-04-25T20:02",
    "giftId": "cg056e5m",
    "expireAt": "2017-06-20T00:00",
    "provider": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    },
    "receiver": {
      "username": "KateYuen",
      "bio": "An Artist - Graphic Designer & Photographer",
      "proPic": "https://avatars3.githubusercontent.com/u/22487340?v=3&s=460",
      "yellowStars": 3,
      "favoring": false
    }
  }
}
```

### Multiple Gifts

```JSON
{
  "gifts": [
    {
      "tagList": ["public", "giveOrLend"],
      "text": "10 Pen refills (0.5mm)",
      "image": "https://photouploads.com/image/1N0",
      "createdAt": "2017-04-25T20:02",
      "updatedAt": "2017-04-25T20:02",
      "giftId": "cg056e5m",
      "expireAt": "2017-06-20T00:00",
      "provider": {
        "username": "xemexpress",
        "bio": "Working in the Sea of Palaces",
        "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
        "yellowStars": 0,
        "favoring": false
      },
      "receiver": {
        "username": "xemexpress",
        "bio": "Working in the Sea of Palaces",
        "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
        "yellowStars": 0,
        "favoring": false
      }
    },
    {
      "tagList": ["public", "deliver"],
      "text": "University Station",
      "image": null,
      "createdAt": "2017-04-25T20:02",
      "updatedAt": "2017-04-25T20:02",
      "giftId": "cg056e5m",
      "expireAt": "2017-06-20T00:00",
      "provider": {
        "username": "xemexpress",
        "bio": "Working in the Sea of Palaces",
        "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
        "yellowStars": 0,
        "favoring": false
      },
      "receiver": {
        "username": "KateYuen",
        "bio": "An Artist - Graphic Designer & Photographer",
        "proPic": "https://avatars3.githubusercontent.com/u/22487340?v=3&s=460",
        "yellowStars": 3,
        "favoring": false
      }
    },
    {
      "tagList": ["personal", "know"],
      "text": "整西多士",
      "image": "https://photouploads.com/image/1Nx",
      "createdAt": "2017-04-25T20:02",
      "updatedAt": "2017-04-25T20:02",
      "giftId": "cg056e5m",
      "expireAt": "2017-06-20T00:00",
      "provider": {
        "username": "xemexpress",
        "bio": "Working in the Sea of Palaces",
        "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
        "yellowStars": 0,
        "favoring": false
      },
      "receiver": {
        "username": "xemexpress",
        "bio": "Working in the Sea of Palaces",
        "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
        "yellowStars": 0,
        "favoring": false
      }
    }
  ],
  "giftsCount": 3
}
```

### Single Request

```JSON
{
  "request": {
    "tagList": ["ongoing", "shopping"],
    "startTime": null,
    "startPlace": null,
    "endTime": "2017-04-15T17:30",
    "endPlace": "Exit B at University Station",
    "text": "Please help me buy a Book called 'Winning' by Jack Welch.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/5168G4UoVFL._SY346_.jpg",
    "createdAt": "2017-04-13T03:22",
    "updatedAt": "2017-04-13T03:48",
    "requestId": "ju92ak6",
    "wished": true,
    "wishesCount": 1,
    "poster": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    },
    "taking": false,
    "helper": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    }
  }
}
```

### Multiple Requests

```JSON
{
  "requests":[{
    "tagList": ["ongoing", "shopping"],
    "startTime": null,
    "startPlace": null,
    "endTime": "2017-04-15T17:30",
    "endPlace": "Exit B at University Station",
    "text": "Please help me buy a Book called 'Winning' by Jack Welch.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/5168G4UoVFL._SY346_.jpg",
    "createdAt": "2017-04-13T03:22",
    "updatedAt": "2017-04-13T03:48",
    "requestId": "ju92ak6",
    "wished": true,
    "wishesCount": 1,
    "poster": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    },
    "taking": true,
    "helper": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    }
  }, {
    "tagList": ["done", "production"],
    "startTime": "2017-04-11T19:00",
    "startPlace": "Yin Chong St, Mong Kok",
    "endTime": "2017-04-18",
    "endPlace": "We Decide",
    "text": "有冇人可以幫我寄養「鴨腳木」一個星期？",
    "image": "https://photouploads.com/image/ybr",
    "createdAt": "2017-04-13T03:22",
    "updatedAt": "2017-04-13T03:48",
    "requestId": "9501mlu",
    "wished": true,
    "wishesCount": 1,
    "poster": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    },
    "taking": false,
    "helper": {
      "username": "KateYuen",
      "bio": "An Artist - Graphic Designer & Photographer",
      "proPic": "https://avatars3.githubusercontent.com/u/22487340?v=3&s=460",
      "yellowStars": 3,
      "favoring": false
    }
  }],
  "requestsCount": 2
}
```

### Single Comment

```JSON
{
  "comment": {
    "id": 1,
    "body": "You can borrow it from CU:)",
    "createdAt": "2017-04-13T06:48",
    "updatedAt": "2017-04-13T06:48",
    "author": {
      "username": "Jason Luo",
      "bio": "The Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    }
  }
}
```

### Multiple Comments

```JSON
{
  "comments": [{
    "id": 1,
    "body": "You can borrow it from CU:) Do you need help?",
    "createdAt": "2017-04-13T06:48",
    "updatedAt": "2017-04-13T06:48",
    "author": {
      "username": "Jason Luo",
      "bio": "The Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    }
  }, {
    "id": 2,
    "body": "Oh thank you! I go borrow it later.",
    "createdAt": "2017-04-13T07:50",
    "updatedAt": "2017-04-13T07:50",
    "author": {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 3,
      "favoring": false
    }
  }]
}
```

### List of Helpers

```JSON
{
  "helpers": [
    {
      "username": "xemexpress",
      "bio": "Working in the Sea of Palaces",
      "proPic": "https://visualhunt.com/photos/l/7/supernova-cosmo-hubble.jpg",
      "yellowStars": 0,
      "favoring": false
    }
  ],
  "helpersCount": 1
}
```

### List of Tags

```JSON
{
  "requestTags": [
    "ongoing",
    "ongoing-taken",
    "done",
    "shopping",
    "delivering",
    "production"
  ],
  "giftTags": [
    "personal",
    "public",
    "openPublic",
    "giveOrLend",
    "delivering",
    "know"
  ]
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


Optional fields: `email`, `username`, `password`, `proPic`, `bio`

### List Gifts (Related to Current User)

`GET /api/user/gifts`

Query Parameters:

Filter by tag:

`?tag=giveOrLend`

Filter by provider:

`?provider=xemexpress`

Filter by receiver:

`?receiver=xemexpress`

Limit number of gifts (default is 10):

`?limit=10`

Offset number of gifts (default is 0):

`?offset=0`

Authentication required, returns [multiple current_user-related gifts](#multiple-gifts), ordered by most recent first

### Retrieve Gift

`GET /api/user/gifts/:gift_id`

Authentication required, returns [single Gift](#single-gift)

### Create Gift

`POST /api/user/gifts`

Example request body:
```JSON
{
  "gift": {
    "tag_list": ["public", "giveOrLend"],
    "text": "10 Pen refills (0.5mm)",
    "image": "https://photouploads.com/image/1N0",
    "expire_at": "2017-06-20T00:00",
    "receiver": { "username": "KateYuen" }
  }
}
```

Authentication required, returns the [Gift](#single-gift)

Required fields: `tag_list`, `text`, `expire_at`, `receiver`

Optional fields: `image`

`provider` is automatically set to Current User's [Profile](#profile)

### Update Gift

`PUT /api/user/gifts/:gift_id`

Example request body:

```JSON
{
  "gift": {
    "text": "10 Pen refills (0.5mm) and 1 well-fitting pen shell"
  }
}
```

Authentication required, returns the updated [Gift](#single-gift)

Optional fields: `text`, `image`, `expire_at`, `receiver` (accepting an object with `username`), `tag_list`

Notes:
- When Receivers update their received Gift (as the only action), it will be returned to its provider.
- When Users update an OpenPublic Gift, it will be received instantly by them with the `openPublic` tag switched back to `public`.

### Toggle Gift's Access Tag: 'personal' <-> 'public' (for providers); 'public' <-> 'openPublic' (for receivers)

`GET /api/user/gifts/:gift_id/switch`

Authentication required, returns the updated [Gift](#single-gift)

### Delete Gift

`DELETE /api/user/gifts/:gift_id`

Authentication required, returns {}

### Get Profile

`GET /api/profiles/:username`

No authentication required, returns the [Profile](#profile)

### Favor User

`POST /api/profiles/:username/favor`

Authentication required, returns the favored User's [Profile](#profile)

### Unfavor User

`DELETE /api/profiles/:username/favor`

Authentication required, returns the unfavored User's [Profile](#profile)

### List Requests

`GET /api/requests`

Query Parameters:

Filter by tag:

`?tag=ongoing,shopping`

Filter by not_this_tag:

`?not_this_tag=done`

Filter by poster:

`?poster=xemexpress`

Filter by helper: *(Requests that are done 2 weeks ago would be destroyed)*

`?helper=xemexpress`

Wished by user:

`?wisher=xemexpress`

Limit number of requests (default is 10):

`?limit=10`

Offset number of requests (default is 0):

`?offset=0`

Authentication optional, returns [multiple requests](#multiple-requests), ordered by most recent first

### Collect Requests

`GET /api/requests/collect`

Query Parameters:

Filter by tag:

`?tag=ongoing,shopping`

Limit number of requests (default is 10):

`?limit=10`

Offset number of requests (default is 0):

`?offset=0`

Authentication required, returns [multiple Requests](#multiple-requests) posted by Users previously favored by Current User, ordered by most recent first.

### List Requests taken by Current User

`GET /api/requests/taking`

Query Parameters:

Filter by tag:

`?tag=ongoing`

Limit number of requests (default is 10):

`?limit=10`

Offset number of requests (default is 0):

`?offset=0`

Authentication required, returns [multiple Requests](#multiple-requests) taken by Users, ordered by eldest first.

### Wish Request

`POST /api/requests/:request_id/wish`

Authentication required, returns the [Request](#single-request)

### Unwish Request

`DELETE /api/requests/:request_id/wish`

Authentication required, returns the [Request](#single-request)

### Retrieve Request

`GET /api/requests/:request_id`

Authentication optional, returns [single Request](#single-request)

### Take Request

`POST /api/requests/:request_id/take`

Authentication required, returns the [Request](#single-request)

### Untake Request

`DELETE /api/requests/:request_id/take`

Authentication required, returns the [Request](#single-request)

### List Request's Helpers

`GET /api/requests/:request_id/confirms`

Query Parameters:

Limit number of requests (default is 10):

`?limit=10`

Offset number of requests (default is 0):

`?offset=0`

Authentication required, returns a [List of Helpers' Profile](#list-of-helprs) with yellowStars in descending order.

### Confirm Request

`PUT /api/requests/:request_id/confirms/:username`

Authentication required, returns the [Request](#single-request) with `helper` settled

### End Request

`PUT /api/requests/:request_id/ends/:mem`

Authentication required, returns the [Request](#single-request) with 'done' in `tag_list`, `yellowStars` incremented, `mem` updated.

### Create Request

`POST /api/requests`

Example request body:

```JSON
{
  "request": {
    "tag_list": ["ongoing", "production"],
    "start_time": "2017-04-11T19:00",
    "start_place": "Yin Chong St, Mong Kok",
    "end_time": "2017-04-18",
    "end_place": "We Decide",
    "text": "有冇人可以幫我寄養「鴨腳木」一個星期？",
    "image": "https://photouploads.com/image/ybr"
  }
}
```

Authentication required, returns the [Request](#single-request)

Required fields: `tag_list`, `start_time`, `start_place`, `end_time`, `end_place`, `text`

Optional fields: `image`

`helper` is automatically set to Current User's [Profile](#profile)

### Update Request

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

Optional fields: `start_time`, `start_place`, `end_time`, `end_place`, `text`, `image`

### Delete Request

`DELETE /api/requests/:request_id`

Authentication required, returns {}

### Get Comments from a Request

`GET /api/requests/:request_id/comments`

No authentication required, returns [multiple Comments](#multiple-comments)

### Add Comment to a Request

`POST /api/requests/:request_id/comments`

Example request body:

```JSON
{
  "comment": {
    "body": "You can borrow it from CU:) Do you need help?"
  }
}
```

Authentication required, returns the [Comment](#single-comment)

Required fields: `body`

### Update Comment

`PUT /api/requests/:request_id/comments/:id`

Example request body:

```JSON
{
  "comment": {
    "body": "You can borrow it from CU Ulib :) Do you need help?"
  }
}
```

Authentication required, returns the updated [Comment](#single-comment)

Optional fields: `body`

### Delete Comment

`DELETE /api/requests/:request_id/comments/:id`

Authentication required, returns {}

### Get Tags

`GET /api/tags`

Filter by tag:

`?tag=requests`

`?tag=gifts`

No authentication required, returns a [List of Tags](#list-of-tags)
