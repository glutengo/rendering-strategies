# SSR approaches

When it comes to rendering JavaScript based applications on the server, two approaches have emerged.

## Pre-Rendering

Pre-Rendering describes an approach where the page is visited by an actual web browser. 
The Browser renders the application and the resulting HTML DOM tree is stored as a static file.

This task can be performed manually. If we have our single page application which is rendered in the browser, we can wait for the application to finish loading.
We can then access the DOM tree via the developer tools of our browser, copy the current contents and save them in a HTML file.

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

[Universal JavaScript](https://cdb.reacttraining.com/universal-javascript-4761051b7ae9) (also: Isomorphic JavaScript) means that the same application "can execute both on the client and the server"<sup>[[1]](#ref-1)</sup>. 
To make use of this technique for server side rendering, the target is to be able to run the code of our single page application on a server.
To achieve that, instead of mounting the application to a DOM element, the renderer needs to produce a string representation rather than the actual HTML elements.

When using JavaScript frameworks, we barely use calls like `Document.createElement` to create our DOM Elements. 
Instead, we use higher level APIs provided by these frameworks which then execute the required lower level calls for us.
The idea behind Universal JavaScript is to keep the high level API the same and swap the implementation provided by the framework. 
The browser implementation of the framework may still use the mentioned `Document.createElement`, while the server implementation may simply put together a string.

When developing applications in this manner, it is important to keep up to framework standards and be careful when it comes to using browser specific JavaScript features like the global variables `document` and `window`.
These are usually not available when running the code in a Node.js server environment. 
If we still want to use these, we need to either check for their availability first or make use of techniques provided by the used framework.
This topic is covered in the case study (LINK).

Universal JavaScript is more efficient regarding computing resources. When simply putting together the HTML Dom tree on the server, no additional resources like stylesheets, images or videos will be loaded.
 
On the other hand it is more complex to implement and depending on the framework.

Rendering the application on the server with universal JavaScript still requires more computing resources than a simple file server, so a sensitive strategy regarding caching and selection of server side rendered pages is recommended.    
     

https://www.netlify.com/blog/2016/11/22/prerendering-explained/
https://www.deepcrawl.com/knowledge/white-papers/javascript-seo-guide/different-rendering-methods/

<a name="ref-1">[1]</a> [NodeJitsu: Charlie Robbins on Isomorphic](https://web.archive.org/web/20170703210112/https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)

