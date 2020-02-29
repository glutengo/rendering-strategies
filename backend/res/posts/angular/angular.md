# Angular

## Standard CSR Setup

To set up the blog as a single-page application which is fully rendered in the browser, the Angular CLI (in our case version `9.0.1` is used):

```shell
ng new angular-blog
```

This sets up a new angular workspace and we can start developing the required [components](./case-study#frontend) of the blog application.
 
We can start the application by running `ng serve` and visit our browser on `http://localhost:4200``
However if we visit the app with a browser with no JavaScript, we end up with a blank screen.

The payload of the HTML file provided by the server contains no real content:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularBlog</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="http://localhost:8082/style.css">
</head>
<body>
  <app-root></app-root>
<script src="runtime.js" type="module"></script><script src="polyfills.js" type="module"></script><script src="styles.js" type="module"></script><script src="vendor.js" type="module"></script><script src="main.js" type="module"></script></body>
</html>
```

When the first version of the angular application was ready, its source code was in [this state](https://github.com/glutengo/rendering-strategies/tree/angular-csr/angular-blog).

## Adding SSR Features

The Angular Website provides a very helpful [guide](https://angular.io/guide/universal) to set up server-side rendering for Angular applications which proved good reference for this case study.

To add SSR behavior to an Angular app, we need to add [Angular Universal](https://github.com/angular/universal) to our project. 
The required steps can be performed by adding the corresponding schematic:

```ng add @nguniversal/express-engine```

This adds an additional module for our new server renderer application (`app.server.module.ts`). 
This module is used the also scaffolded server entry point script (`server.ts`). 
This file sets up an [express.js](https://expressjs.com/) based server which uses our Angular app as its [view engine](https://expressjs.com/en/guide/using-template-engines.html).

We are also provided with a number of helpful scripts in the package.json file which allow us to start a development server with hot-reloading and compilation on save (`dev:ssr`), create a production build (`build:ssr`), serve the previously built server application (`serve:ssr`) or create a prerendered version of the pages with fixed routes.   

```json
"scripts": {
    ...
    "dev:ssr": "ng run angular-blog:serve-ssr",
    "serve:ssr": "node dist/angular-blog/server/main.js",
    "build:ssr": "ng build --prod && ng run angular-blog:server:production",
    "prerender": "ng run angular-blog:prerender",
    ...
  }
```

We can now run the server-side rendered application in development mode using `npm run dev:ssr`. 
The application can now be visited on the same URL as mentioned above (or port 4201 in case the other process is still running).
Visiting it with a browser with no JavaScript still lets us access the content.

The payload of the first HTML file provided by the server already contains all real content and meaningful, content related meta tags:

```html
<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>motivation</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="http://localhost:8082/style.css">
<link rel="stylesheet" href="styles.css"><style ng-transition="serverApp">
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */</style><meta name="title" content="motivation"></head>
<body><script id="__bs_script__">//<![CDATA[
    document.write("<script async src='browser-sync/browser-sync-client.js?v=2.26.7'><\/script>".replace("HOST", location.hostname));
//]]></script>

  <app-root _nghost-sc22="" ng-version="9.0.2"><section _ngcontent-sc22="" app-header="" class="page-header"><div class="header-content"><h3>Rendering Strategies for Web Apps</h3><ul><li class=""><a href="http://localhost:4200/posts/motivation">angular:csr</a></li><!--ng-container--><!--bindings={
  "ng-reflect-ng-for-of": "[object Object]"
}--></ul></div></section><section _ngcontent-sc22="" class="page-menu"><app-post-list _ngcontent-sc22=""><ul class="post-list"><li><a ng-reflect-router-link="/" href="/">Home</a></li><li class="active"><a ng-reflect-router-link="posts/motivation" href="/posts/motivation">Motivation</a><!--bindings={}--></li><li class=""><a ng-reflect-router-link="posts/horizontal" href="/posts/horizontal">Horizontal Topics</a><ul><li class=""><a ng-reflect-router-link="posts/metrics" href="/posts/metrics">Metrics</a></li><li class=""><a ng-reflect-router-link="posts/universal-prerendering" href="/posts/universal-prerendering">Universal JS vs. Pre-Rendering</a></li><li class=""><a ng-reflect-router-link="posts/bundle-sizes" href="/posts/bundle-sizes">JS bundle sizes</a></li><li class=""><a ng-reflect-router-link="posts/what-to-ssr" href="/posts/what-to-ssr">What to SSR?</a></li><!--bindings={
  "ng-reflect-ng-for-of": "[object Object],[object Object"
}--></ul><!--bindings={
  "ng-reflect-ng-if": "[object Object],[object Object"
}--></li><li class=""><a ng-reflect-router-link="posts/rendering-strategies" href="/posts/rendering-strategies">Rendering Strategies</a><ul><li class=""><a ng-reflect-router-link="posts/server-rendering" href="/posts/server-rendering">Server Rendering</a></li><li class=""><a ng-reflect-router-link="posts/static-rendering" href="/posts/static-rendering">Static Rendering</a></li><li class=""><a ng-reflect-router-link="posts/ssr-rehydration" href="/posts/ssr-rehydration">SSR with (Re)hydration</a></li><li class=""><a ng-reflect-router-link="posts/csr-prerendering" href="/posts/csr-prerendering">CSR with Prerendering</a></li><li class=""><a ng-reflect-router-link="posts/full-csr" href="/posts/full-csr">Full CSR</a></li><!--bindings={
  "ng-reflect-ng-for-of": "[object Object],[object Object"
}--></ul><!--bindings={
  "ng-reflect-ng-if": "[object Object],[object Object"
}--></li><li class=""><a ng-reflect-router-link="posts/case-study" href="/posts/case-study">Case Study</a><ul><li class=""><a ng-reflect-router-link="posts/angular" href="/posts/angular">Angular</a></li><li class=""><a ng-reflect-router-link="posts/react" href="/posts/react">React</a></li><li class=""><a ng-reflect-router-link="posts/vue" href="/posts/vue">Vue.js</a></li><!--bindings={
  "ng-reflect-ng-for-of": "[object Object],[object Object"
}--></ul><!--bindings={
  "ng-reflect-ng-if": "[object Object],[object Object"
}--></li><li class=""><a ng-reflect-router-link="posts/glossary" href="/posts/glossary">Glossary</a><!--bindings={}--></li><!--bindings={
  "ng-reflect-ng-for-of": "[object Object],[object Object"
}--></ul></app-post-list></section><section _ngcontent-sc22="" class="page-content"><router-outlet _ngcontent-sc22=""></router-outlet><app-post><div class="post"><h1 id="single-page-applications---the-good%2C-the-bad-and-the-why">Single Page Applications - the good, the bad and the why <a class="header-anchor" href="./motivation#single-page-applications---the-good%2C-the-bad-and-the-why" target="_blank">#</a></h1>
<h2 id="web-frameworks">Web Frameworks <a class="header-anchor" href="./motivation#web-frameworks" target="_blank">#</a></h2>
<p>Job descriptions for frontend web developer jobs barely hold great surprises these days and this has been the case for the last few years. They very often match in their requirements regarding their applicants' skills in frameworks or pupular libraries for building web applications.
When searching for the term <em>frontend developer</em> on job platforms <a href="https://linkedin.com" target="_blank">linkedin.com</a><sup>[<a href="./motivation#ref-1" target="_blank">1</a>]</sup> and <a href="https://monster.com" target="_blank">monster.com</a><sup>[<a href="./motivation#ref-2" target="_blank">2</a>]</sup>, 6 out of the 10 first listings contained references to <a href="https://angular.io/" target="_blank">Angular</a>, <a href="https://reactjs.org/" target="_blank">React</a> or both.</p>
<p>Angular and React are both developed by companies which are considered to be leaders in the digital sector. Their creators <a href="https://facebook.com" target="_blank">Facebook</a> and <a href="https://google.com" target="_blank">Google</a> (represented by parent company Alphabet) both make the top 10 of <a href="https://www.forbes.com/top-digital-companies" target="_blank">forbes.com's Top 100 Digital Companies List</a>. Considering that these companies created these tools and continue to use them<sup><a href="./motivation#ref-3" target="_blank">[3]</a>,<a href="./motivation#ref-4" target="_blank">[4]</a></sup>, their quality is considered to be industry proven and many other organisations and developers decided to utilise them as well.</p>
<p>This has lead to a high popularity of these libraries and frameworks among developers worldwide. React is #4 (143 250 Stars) on the list of the highest ranked code repositories on <a href="https://github.com" target="_blank">github</a>, Angular currently ranks on #41 (57 164 Stars) but might have also been among the top 10, had they not chosen to open a new repository in opposition to continuing their work on the repository of predecessor AngularJS (#35, 59 644 Stars). Another Web Frontend Framwork with a high position on the list is <a href="https://vuejs.org" target="_blank">Vue.js</a> (#3, 156 499 Stars). In contrast to React and Facebook, Vue.js was started as a private project by a (now former) Google employee<sup>[<a href="./motivation#ref-5" target="_blank">5</a>]</sup>. <a href="https://stackoverflow.com" target="_blank">stackoverflow.com</a>'s 2019 developer survey shows that React, Vue.js and Angular are the mosted wanted web frameworks.<sup>[<a href="./motivation#ref-6" target="_blank">6</a>]</sup></p>
<h2 id="single-page-applications">Single Page Applications <a class="header-anchor" href="./motivation#single-page-applications" target="_blank">#</a></h2>
<p>While all of the introduced frameworks offer support for a number of different use cases, the default setup seems to be tailored for building so-called single-page applications. The React docs list <a href="https://github.com/facebook/create-react-app" target="_blank">create-react-app</a>, a tool for building single-page-applications with react as the first of four recommended toolchains.<sup><a href="./motivation#ref-7" target="_blank">[7]</a></sup> The Vue installation Guide introduces its CLI as a tool for "quickly scaffolding ambitious Single Page Applications"<sup><a href="./motivation#ref-8" target="_blank">[8]</a></sup> and Angular docs state that "Angular is an app-design framework and development platform for creating efficient and sophisticated single-page apps"<sup><a href="./motivation#ref-9" target="_blank">[9]</a></sup>.</p>
<blockquote>
<p>A <em>single page application</em> is exactily what its name implies: a JavaScript-driven web application that requires only a single page load<sup><a href="./motivation#ref-10" target="_blank">[10]</a></sup></p>
</blockquote>
<p>The response of the single page requested from the server only contains references to further resources (CSS, Scripts) and a very small amount of markup. The actual rendering is performed in the browser by a script. Data may be fetched asynchronously by a script as well.</p>
<h3 id="benefits">Benefits <a class="header-anchor" href="./motivation#benefits" target="_blank">#</a></h3>
<p>The payload of the single page requested from the server is usually very low which leads to a quick response because the responsible server does not require to do any computational tasks. Its only purpose is to delivery static resources.<br>
Visiting a different sub-site of the application does not require a full page reload. This is considered a big advantage as it results in a smooth, app-like user experience once the application has loaded.<sup><a href="./motivation#ref-11" target="_blank">[11]</a></sup></p>
<p class="image">
<img src="http://localhost:8082/posts/motivation/angular-spa.gif">
Single-page application example: Angular Website
</p>
<p>The Angular Website is an example of a such single-page application. Whilst we are navigating through the application, we are never presented a blank screen, even if the network connection is bad.</p>
<h3 id="downsides">Downsides <a class="header-anchor" href="./motivation#downsides" target="_blank">#</a></h3>
<p>The described way of building an application comes with a few downsides. The fact that a script is responsible for rendering the markup and fetching the real data makes it a very critical resource. If we visit the same page with JavaScript disabled, we are presented with a page offering basically no content and no interactivity.</p>
<p class="image">
<img src="http://localhost:8082/posts/motivation/angular-js-disabled.png">
Angular Website with JavaScript disabled
</p>
<p>"Who disables JavaScript in their browser?" or "Who has a browser with no JavaScript in 2020?" one might ask. People usually do not, but robots may.
A very important robot which may visit your site is the Googlebot, Google's web crawler.</p>
<p class="image">
<img src="http://localhost:8082/posts/motivation/googlebot-crawl-render-index.png">
Googlebot JavaScript Processing
</p>
<p>The good news is: Googlebot does process JavaScript. It does work with an evergreen version of Chromium which needs to be considered when selecting the JavaScript language features used in the application. But: The JavaScript is not processed on the first visit of the site. Googlebot first just crawls the initial HTML and puts the JavaScript-based rendering (or more general: execution of any JavaScript) into a qeueue which it processes "once Googlebot resources allow"<sup><a href="./motivation#ref-12" target="_blank">[12]</a></sup> it. Google does not make definite statements on how long it may take for a queue entry to be processed.<sup><a href="./motivation#ref-12" target="_blank">[12]</a></sup></p>
<p>When the server answers each initial request with the same static HTML file, there is also no room for optimizing the sharing behavior for inidividual sub pages of the application. Facebook, for instance, uses the <a href="https://ogp.me" target="_blank">Open Graph Protocol</a> to generate its sharing previews on their platform.
There are a number of predefined Meta Tags (e.g. <code>og:title</code> and <code>og:image</code>) which need to be set for a good sharing performance.<sup><a href="./motivation#ref-13" target="_blank">[13]</a></sup> If these are only defined once, the sharing preview for each sub page (e.g. <code>/home</code> and <code>/about</code>) will always look the same.
This leaves the developer with only two options: he could either use very general values which are feasible for all pages or he could use specific values for the page he judges the most important. Both options are not really satisfactory.</p>
<ul>
<li>JS size</li>
</ul>
<p><a name="ref-1">[1]</a> <a href="https://www.monster.com/jobs/search/?q=frontend-developer&amp;intcid=skr_navigation_nhpso_searchMain" target="_blank">Job Search on monster.com, February 8th 2020</a><br>
<a name="ref-2">[2]</a> <a href="https://www.linkedin.com/jobs/search?keywords=Frontend%20Developer" target="_blank">Job Search on linkedin.com, February 8th 2020</a><br>
<a name="ref-3">[3]</a> <a href="https://opensource.google/projects/angular" target="_blank">Angular on opensource.google, February 8th 2020</a><br>
<a name="ref-4">[4]</a> <a href="https://twitter.com/dan_abramov/status/1002590695859933191" target="_blank">Dan Abramov on Twitter, February 8th 2020</a><br>
<a name="ref-5">[5]</a> <a href="https://www.freecodecamp.org/news/between-the-wires-an-interview-with-vue-js-creator-evan-you-e383cbf57cc4/" target="_blank">Interview with Vue.js creator Evan You, February 8th 2020</a><br>
<a name="ref-6">[6]</a> <a href="https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-web-frameworks" target="_blank">Stackoverflow Survey 2019: Most wanted web frameworks, February 8th 2020</a><br>
<a name="ref-7">[7]</a> <a href="https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains" target="_blank">React Toolchains, February 8th 2020</a><br>
<a name="ref-8">[8]</a> <a href="https://vuejs.org/v2/guide/installation.html#CLI" target="_blank">Vue.JS Guide, February 8th 2020</a><br>
<a name="ref-9">[9]</a> <a href="https://angular.io/docs#introduction-to-the-angular-docs" target="_blank">Angular Docs Introduction, February 8th 2020</a><br>
<a name="ref-10">[10]</a> <a href="https://books.google.de/books?id=2weL0iAfrEMC" target="_blank">JavaScript The Definitge Guide, Page 497</a><br>
<a name="ref-11">[11]</a> <a href="https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58" target="_blank">Single-page application vs. multiple-page application, February 8th 2020</a><br>
<a name="ref-12">[12]</a> <a href="https://developers.google.com/search/docs/guides/javascript-seo-basics?hl=en" target="_blank">Understand the JavaScript SEO basics
</a><br>
<a name="ref-13">[13]</a> <a href="https://ogp.me/" target="_blank">The Open Graph protocol</a></p>
</div></app-post><!--container--></section></app-root>
<script src="runtime.js" type="module"></script><script src="polyfills.js" type="module"></script><script src="vendor.js" type="module"></script><script src="main.js" type="module"></script>

</body></html>
```   

The [changes required to achieve this](https://github.com/glutengo/rendering-strategies/commit/e2075e741b3ba381c148287d07ae57a72fb7d07f) are minimal and were primary handled by the Angular CLI.

### Universal JavaScript

In the current setup, we are using universal JavaScript to run the same application on the server that we are running in the browser.
This is comfortable because we do not need to rewrite anything. However we do need to be careful at some points. 
Some global browser variables that we may be used to rely on are not available when running the same code on a NodeJS server instead of a browser.
The `document` and the `window` object are examples of these. 
We may still want to use these objects in our browser app und not wrap every access in a if statement to keep our code clean.
Angular's solution for this problem is its [dependency injection](https://angular.io/guide/dependency-injection) system.

```
import { DOCUMENT } from '@angular/common';
...
constructor(@Inject(DOCUMENT) private document: Document) {...}
``` 

Instead of relying on the global objects, we let Angular decide which version of the object to use. 
When we are in the browser, Angular provides the e.g. the well-known Standard DOM `document` Object.
When the application is run on the server, Angular provides another implementation which supports the same API, but different implementations for some methods.
By this means we can still use the API without breaking the app when running on the server.

### Prerender

As an alternative to Universal JavaScript, we are also provided with the option to use Prerendering instead. 
In this case, we do not actually run the application on the server. 
Instead we build the application once and store the result. 
We end up with one or more rich HTML files which can be served by a static file server.

It is notable that Angular does not use a headless browser to render the pages but still relies on its universal engine.
While prerendering usually allows using browser-only JavaScript features like the global `document` object, this does not apply to the Angular prerender task.
We still need to bypass this by using the techniques explained above.

This approach has the advantage that no server side logic is required at runtime. 
Instead, the rendering is performed at build time. 
However this has its own big downside: We need to know which routes exist when performing the prerendering.
The required routes need to be added in the `angular.json` configuration file:

```json
"prerender": {
  "builder": "@nguniversal/builders:prerender",
  "options": {
    "browserTarget": "angular-blog:build:production",
    "serverTarget": "angular-blog:server:production",
    "routes": [
      "/",
      "posts/motivation"
    ]
  },
  "configurations": {
    "production": {}
  }
}
```

This may be sufficient for static websites where the routes are fixed and always known.
If we are in the context of a Content Management System or a simple blog like this one, not all routes are known at build time.      

### Sharing

The sharing previews of social media platforms and search engines depend on meta tags.<sup>[[1]](#ref-1)</sup>. 
Angular offers its [own API](https://angular.io/api/platform-browser/Meta) to handle these meta tags.
 
```typescript
import { Meta } from '@angular/platform-browser';

class AppComponent { 

  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.updateTag({ name: 'title', content: this.name });
  }
}

```

This API is not limited for use in server-side rendered apps but regarding the tags' importance for web crawlers (see [Motivation](./motivation)) it is very helpful to improve sharing previews.
A very similar approach can be followed for setting the document title (see [Angular docs](https://angular.io/guide/set-document-title)).

### Avoid duplicated requests

When we observe the network tab of our SSR application in the browser we will see that some data is needlessly fetched in the browser although it is already available and visible.
The content of the current post is an excellent example for this. As we have seen earlier, the full content of our post is available in the HTML file provided by the server because the Angular application was executed on the server and this was the result of server side rendering.
Our application is then executed in the browser again and ouro `PostComponent` again fetches the post contents from the backend. 
This fetches data that we already know and in fact the user is already able to see. It is desirable to avoid these sorts of duplicated requests.

Angular provides a solution for this. 
As described in their docs<sup>[[2]](#ref-2)</sup>, by use of the `TransferHttpCacheModule` (part of the @nguniversal/common package) in the App Module and the `ServerTransferStateModule` in the Server Module, all Requests performed with Angular's HttpClient on the server are stored in a key-value store.
This store is transferred to the client. HttpClient Requests in the browser are then answered by the store if possible.
This way requests that were already performed on the server are not sent from the browser again. Any other requests are performed as usual.

The changes to enable this feature in our applications can be retraced [here](https://github.com/glutengo/rendering-strategies/commit/a45d54472cfb72f5a3ea9b1abfc4bf9773372ea2).

### Observations

* Adding server side rendering to an Angular application is fully supported by the Angular CLI. 
A single CLI command sets up the server and all required build steps for on-demand rendering and pre-rendering.
* There are well documented APIs for dealing with common usecases like `<head>` handling or browser-specific globals
* The setup for preventing duplicated HTTP requests is straightforward and does not require any own implementations.       

<a name="ref-1">[1]</a> [Google on Meta Tags](https://support.google.com/webmasters/answer/79812?hl=en)  
<a name="ref-2">[2]</a> [Angular Universal Docs: TransferHttpCacheModule](https://github.com/angular/universal/blob/master/docs/transfer-http.md)
