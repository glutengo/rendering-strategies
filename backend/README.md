# Rendering Strategies Backend

The Rendering Strategies Backend application is a simple Node.JS server application which has the main purpose of serving static files and prepare the blog contents which are Markdown files so they can easily be rendered in the browser.

All files in the `res` directory are served.  

The Backend is served on port `8082` per default. This can be changed in the `.env` file. 

## Dependencies

`npm install`

## Startup

`npm start`

## Development

`npm run dev` 

## Deployment

`npm run docker:update`

## Additional Routes

### `/options`

Returns all available frontend implementations. URLs for implementations are configured in the `.env` file.

Example for an implementation:
```json
{
  "platform": "angular",
  "technique": "csr",
  "url": "http://d1pw9cfb12erjk.cloudfront.net"
}
```

### `/post/:id`

Return the markdown file for the requested post. The endpoint looks for a file with the `[id].md` with the directory named `[id]`.
The markdown file is parsed, some links are adjusted and the markdown is rendered to HTML.


