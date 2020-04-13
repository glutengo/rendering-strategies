# Static Rendering vs. Server Rendering

When it comes to delivering contentful initial responses for JavaScript based single applications on the server, two approaches have emerged.

## Static Rendering

Static Rendering (also Pre-Rendering) describes an approach where the page is visited by an actual web browser. 
The Browser renders the application and the resulting HTML DOM tree is stored as a static file.

This task can be performed manually. If we have our single page application which is rendered in the browser, we can wait for the application to finish loading.
We can then access the DOM tree via the developer tools of our browser, copy the current content and save them in a HTML file.

This means a lot of manual work, especially if our application consists of many different pages.
Instead of manually creating these files, this can also be achieved by running a script which automates this process.
In this case, headless browsers like PhantomJS or HeadlessChrome are used.

Prerendering can be performed with any web application and is not dependent on the framework.

It is important to carefully decide when to perform the prerendering.  
If it is performed at build time, no server side logic is required at runtime. 
But his also means that all routes to subpages need to be known at the time the static files are created.
This may be suitable for static website which have rare changes, but not for applications with more dynamic content and generic routes like content management systems or blogs.

Another option is to prerender the page on demand. In this case, the script which creates the markup on the server using a headless browser is run on demand.
If a user requests a page, let's say `https://my-blog.com/posts/my-post`, the server prerenders the page and returns the resulting HTML to the browser.

This approach requires the server to be able to run a such script and may require a needlessly high amount of computing power because the page is regenerated on every request.
  
To address this problem, a strategy regarding when to prerender, when to use a cache or when to not prerender at all needs to be picked.

It is also worth mentioning that there are services like [prerender.io](https://prerender.io/) which offer on-demand prerendering to avoid hosting an own server with the ability to pre-render.  

Considering that a (headless) browser instance needs to be started to render a page, there are a few pain points. 
If not specified otherwise, the browser will load all resources regardless whether they are needed for our purpose (building the DOM tree) or not.
This includes stylesheets, images or even videos. These resources are not required for the task of prerendering and result in an unneeded waste of computing resources.  

## Universal JavaScript

     

https://www.netlify.com/blog/2016/11/22/prerendering-explained/
https://www.deepcrawl.com/knowledge/white-papers/javascript-seo-guide/different-rendering-methods/

<a name="ref-1">[1]</a> [NodeJitsu: Charlie Robbins on Isomorphic](https://web.archive.org/web/20170703210112/https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)

