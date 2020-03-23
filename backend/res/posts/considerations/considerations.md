# Further Considerations

When we choose to add Server Side Rendering to our Single Page Application, this is not the last decision that we have to make.
This post will give you an idea of what other topics are important and need to be considered.

In our [case study](./case-study) we will generate the HTML at [runtime](#runtime) using [Universal JavaScript](#universal-javascript) for [all routes](#when-to-use-ssr-and-when-to-not-use-it). 
We we will also add a [http cache](#caching) in front of our application.  

## When to use SSR (and when to *not* use it)

We have seen that Server Side Rendering is likely to slow down the [TTFB](./metrics).
Also our server needs to be capable of performing the rendering or we need to add an external service which performs the rendering for us.
Either way, this is likely to produce higher costs than just serving static files.
Therefore, it is worth checking whether it is useful to render the targeted page on the server.

Web crawlers (e.g. those of search engines or social networks) can (hopefully) not access user specific or other access-controlled contents.
If our primary aim is to improve the search engine performance of our application it is enough to only render those sub pages on the server which are available to anyone.
We could also go as far as using [dynamic rendering](https://developers.google.com/search/docs/guides/dynamic-rendering) if we want to make sure the experience for our users remains the same.
In this case requests by visitors using web browsers are answered with the CSR variant while bots are served a server side rendered static HTML document.<sup>[[1]](#ref-1)</sup>   

If improving perceived user performance is the main objective, this distinction should not be made and server side rendering (given that is is used at all) should be added for all sub pages. 
 
## When to generate the HTML

### Build Time

One approach of generating the HTML is to include a build step which is able to produce the HTML.
This build step may have different sub steps depending on the way of [generating the HTML](#how-to-generate-the-html) we choose. 
When creating the HTML during the build time, it is still possible to use a static file server, because the server will only need to deliver static files.
So if our infrastructure or budget does not allow us to use anything else than that, this is the option to choose.

This approach is not very flexible. 
It requires that all routes to subpages need to be known at the moment when the build is created.
This may be suitable for static website which have rare changes, but not for applications with more dynamic content and generic routes like content management systems or blogs.

### Runtime

Another option would be to generate the HTML on demand.
This means that anytime the user makes a request, the server puts together the HTML for the requested page. 
If we create the HTML at runtime, we need a server which is capable of performing the rendering task or we need to use an external service.
This tasks requires more computing power and time and is therefore likely to increase costs and the TTFB.
Amazon for example charges $&nbsp;0.023 for a gigabyte of staticly served files<sup>[[2]](#ref-2)</sup> while a EC2 instance which would be able to render the HTML at runtime would cost about $&nbsp;8.70.<sup>[[3]](#ref-3)</sup>
It should be added that the costs for rendering on the server could be reduced drastically by using serverless computing.<sup>[[4]](#ref-4)</sup><sup>[[5]](#ref-5)</sup>

## How to generate the HTML

### Browser

As CSR applications are made to be rendered in a browser, one obvious approach is to render to application in the browser and store the resulting HTML DOM in a static file.

This task can be performed manually. If we have our single page application which is rendered in the browser, we can wait for the application to finish loading.
We can then access the DOM tree via the developer tools of our browser, copy the current contents and save them in a HTML file.

This means a lot of manual work, especially if our application consists of many different pages.
Instead of manually creating these files, this can also be achieved by running a script which automates this process.
In this case, headless browsers like [PhantomJS](https://phantomjs.org/), [Headless Chromium](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md) are used.


This approach of rendering can be performed with any web application and is not dependent on the framework.
If a user requests a page, let's say `https://my-blog.com/posts/my-post`, the server prerenders the page and returns the resulting HTML to the browser.

It is also worth mentioning that there are services like [prerender.io](https://prerender.io/) which offer on-demand prerendering to avoid hosting an own server with the ability to pre-render.  

### Universal JavaScript

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
This topic is covered in the [case study](./case-study).

Universal JavaScript is more efficient regarding computing resources.(TODO: Quelle!)
When simply putting together the HTML Dom tree on the server, no additional resources like stylesheets, images or videos will be loaded.
 
On the other hand it is more complex to implement and depending on the framework.

Rendering the application on the server with universal JavaScript still requires more computing resources than a simple file server, so a sensitive strategy regarding caching and selection of server side rendered pages is recommended.    

## Caching

Generating the HTML on demand has significant advantages compared to build time creation.
However if we decide to generate the HTML on demand, we expect a higher TTFB and more costs.
A desired scenario would combine the runtime benefits with reduced costs.
This can be achieved by adding a [http cache](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html).
If the first request to a page is made, the required HTML is generated by the server and the request is answered with this HTML.
At the same time a cache entry is created.
Any future requests to the same resource can be answered by the cache.
This way, it is possible to reduce the computing time required to answer a request because the task of creating the HTML is not performed for every request.
Instead it is only performed once for each sub page.
If we are in an environment where the costs are calculated based on the computing time, this would reduce both the TTFB and the costs.

To assure that the contents are always up to date, the cache needs to be [invalidated](https://foshttpcache.readthedocs.io/en/latest/invalidation-introduction.html) when the contents change.
This may seem obvious and straightforward but still deserves to be mentioned as it is considered one of the hardest things in Computer Science.<sup>[[6]](#ref-6)</sup>
  
<hr/>

<a name="ref-1">[1]</a> [developers.google.com: Dynamic Rendering](https://developers.google.com/search/docs/guides/dynamic-rendering)  
<a name="ref-2">[1]</a> [Amazon S3 pricing](https://aws.amazon.com/s3/pricing/)  
<a name="ref-3">[3]</a> [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/on-demand/) Based on a t2.micro instance running 750 hours / month  
<a name="ref-4">[4]</a> [Martin Fowler: Serverless](https://martinfowler.com/articles/serverless.html)  
<a name="ref-5">[5]</a> [AWS Lambda pricing](https://aws.amazon.com/lambda/pricing/)
<a name="ref-6">[6]</a> [Tim Brady's Blog citing Phil Karlton](http://www.tbray.org/ongoing/When/200x/2005/12/23/UPI)  
   
 
