# Url Shortner Microservice

_A REST API to get a short url for websites_

This is one of the projecst under APIs and Microservices Projects: URL shortner microservice

## Table of contents:

- [Get short url](#get-short-url)
- [Create short url](#create-short-url)
- [Contributing](#contributing)
- [User stories](#user-stories)

## API Documentation

### Get short url

Redirects to a original url when a short url is given

#### Parameter variables

<SHORT_URL> - A short url that was generated after sending a POST request

#### Request

```http
http://localhost:5000/api/shorturl/<SHORT_URL>
```

#### Response

Redirects to a matching original page

### Create short url

Pass a original url to shorten to a short and unique string

#### JSON body

{ original_url: <URL_TO_CONVERT> }

#### Request

```http
http://localhost:5000/api/shorturl/new
```

#### Response

```js
{
  original_url: <URL_TO_CONVERT>,
  short_url: <SHORTID>
}
```

## Contributing

Feel free to contribute with issues and PR's.

## User Stories

Found in the official FCC project glitch page https://thread-paper.glitch.me/
