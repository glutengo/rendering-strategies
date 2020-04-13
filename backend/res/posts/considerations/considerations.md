# Further Considerations

When server side rendering is added to a single page application, this is not the last decision that has to be made.
This post will give you an idea of what other topics are important and need to be considered.

In our [case study](./case-study) the HTML will be generated at [runtime](#runtime) using [Universal JavaScript](#universal-javascript) for [all routes](#where-to-use-ssr). 
Also, a [caching proxy](#caching) will be added in front of the application.  

## Where to use SSR

We have seen that server side rendering is likely to slow down the [TTFB](./metrics).
Also the server needs to be capable of performing the rendering or an external service needs to be added for this purpose.
Either way, this is likely to produce higher costs than just serving static files.
Therefore, it is worth questioning which pages to render on the server.

Web crawlers (e.g. those of search engines or social networks) cannot (or at lease should not be able to) access user specific or other access-controlled content.
If the primary aim is to improve the search engine performance of the application, it is sufficient to only render those sub pages on the server which are available to the public.<sup>[[1]](#ref-1)</sup>
We could also go as far as using [dynamic rendering](https://developers.google.com/search/docs/guides/dynamic-rendering). 
In this case requests by visitors using web browsers are answered with the CSR variant while bots are served a server side rendered static HTML document.<sup>[[2](#ref-2)]</sup>
This can be considered as an option for improving search engine performance while avoiding the risk of changing the user experience.   

If improving perceived user performance is the main objective, this distinction should not be made and server side rendering (given that it is used at all) should be added for all sub pages instead.
Rendering authenticated content on the server adds new challenges to the rendering process.
[Ben Gourleys blog post](https://www.bugsnag.com/blog/server-side-rendering-and-authenticated-content) provides a good introduction on this topic. 
  
## When to generate the HTML

### Build Time

One approach of generating the HTML is to include a build step which is able to produce the HTML.
This build step will look different depending on the chosen way of [generating the HTML](#how-to-generate-the-html). 

When creating the HTML during the build time, it is still possible to use a static file server, because the server will only need to deliver static files.
So if our infrastructure or budget does not allow us to use anything else than that, this is the option to go with.
This approach requires that all routes to sub pages are known at the moment when the build is created.<sup>[[3]](#ref-3)</sup>
This may be suitable for static website which have rare changes, but not for applications with more dynamic content and generic routes like content management systems or blogs.

### Runtime

Another option would be to generate the HTML on demand.
This means that anytime the user makes a request, the server puts together the HTML for the requested page. 
If the HTML is created at runtime, we need a server which is capable of performing the rendering task or we need to use an external service.
This tasks requires additional computing power and time and is therefore likely to increase costs and the TTFB.
Amazon for example charges $0.0245 for a gigabyte of statically served files<sup>[[4]](#ref-4)</sup> while an EC2 instance which would be able to render the HTML at runtime would cost about $10.05 per month.<sup>[[5]](#ref-5)</sup>
It should be added that the costs for rendering on the server could be reduced drastically by using serverless computing.<sup>[[6]](#ref6)</sup><sup>[[7]](#ref-7)</sup>

The TTFB can be limited by using streaming server rendering.
This is a feature which was introduced in React 16 and allows the server to send parts of the rendered HTML to the browser before the whole process is finished.
Modern browsers will then be able to render these parts of the document earlier which can also lead to an improved FCP.<sup>[[8]](#ref8)</sup>

## How to generate the HTML

### Pre-Rendering

As CSR applications are made to be rendered in a browser, one obvious approach is to render to application in the browser, store the resulting HTML DOM in a file and put this file on a static web server.
This approach of rendering is also often referred to as *pre-rendering* and can be performed with any web application, regardless of the used framework.

> "Prerendering is basically firing up a headless browser, loading your app's routes, and saving the results to a static HTML file. 
> You can then serve it with whatever static-file-serving solution you were using previously." <sup>[[9]](#ref-9)</sup>

In theory, this task can even be performed manually. 
If we have an existing single page application which is rendered in the browser, we can wait for the application to finish loading.
We can then access the DOM tree via the developer tools of the browser, copy the current content and save it in a HTML file.

This means a lot of manual work, especially if the application consists of many different pages.
Instead of manually creating these files, this can also be achieved by running a script which automates this process.
In this case, headless browsers like [PhantomJS](https://phantomjs.org/) or [Headless Chromium](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md) are used.

Google Engineer Eric Bidelman has provided [a detailed guide](https://developers.google.com/web/tools/puppeteer/articles/ssr) on how to implement this technique.

The [prerender-spa-plugin npm package](https://www.npmjs.com/package/prerender-spa-plugin) is available as a ready-made solution.
     
It is also worth mentioning that there are services like [prerender.io](https://prerender.io/) which offer on-demand pre-rendering to avoid hosting an own server with the ability to pre-render.  

### Universal JavaScript

[Universal JavaScript](https://cdb.reacttraining.com/universal-javascript-4761051b7ae9) (also: Isomorphic JavaScript) means that the same application "can execute both on the client and the server"<sup>[[10]](#ref-10)</sup>. 
To make use of this technique for server side rendering, the target is to be able to run the code of our single page application on a server.
To achieve that, instead of mounting the application to a DOM element, the renderer needs to produce a string representation rather than the actual HTML elements.

When using JavaScript frameworks, we barely use calls like `Document.createElement` to create our DOM Elements. 
Instead, we use higher level APIs provided by these frameworks which then execute the required lower level calls for us.
The idea behind Universal JavaScript is to keep the high level API the same and swap the implementation provided by the framework. 
The browser implementation of the framework may still use the mentioned `Document.createElement`, while the server implementation will simply put together a string.<sup>[[11]](#ref-11)</sup>

When developing applications in this manner, it is important to keep up to framework standards and be careful when it comes to using browser specific JavaScript features like the global variables `document` and `window`.<sup>[[12]](#ref-12)</sup>
These are usually not available when running the code in a Node.js server environment. 
If we still want to use these, we need to either check for their availability first or make use of techniques provided by the used framework.
This topic is covered in the [case study](./case-study).

Considering that using Universal JavaScript for the rendering process means that the HTML is assembled on the server and pre-rendering means loading the actual page including additional resources like stylesheets, images or videos, it can be assumed, that universal JavaScript needs less computing resources.
On the other hand, pre-rendering is usually easier to implement because it does not require any changes in the source code of the application.  
Both approaches will require more computing resources than a simple file server, so a sensitive strategy regarding caching and selection of server side rendered pages is recommended.

## (Re-)Hydration

When adding SSR to a Single Page Application, (re-)hydration can help to prevent an intermediate state between the server side rendered HTML and the DOM tree assembled by the browser where the user is presented a blank page.
However, simple hydration implementations do have disadvantages.

> "The primary downside of SSR with rehydration is that it can have a significant negative impact on Time To Interactive, even if it improves First Paint. 
> SSR’d pages often look deceptively loaded and interactive, but can’t actually respond to input until the client-side JS is executed and event handlers have been attached. 
> This can take seconds or even minutes on mobile." <sup>[[13]](#ref-13)</sup>
       
The [measurement results of our case study](./results#setup-%234%3A-cloudfront-cache%2C-slow-3g) prove that this can be the case (although to a smaller extent) even for simple applications like this blog when the user is operating on a slow network connection. 
      
To overcome these issues, a number of approaches have been developed and are still being explored.

*Partial rehydration* describes an approach where a part of the server rendered result is hydrated "while other parts of the page are still loading the code or data. This means that you can start interacting with parts of the screen while others are still hydrating." <sup>[[14]](#ref-14)</sup>
While the Pull Request where this was discussed was merged for React, this topic is still untackled for Angular.<sup>[[15]](#ref-15)</sup>
Google names this approach *progressive* rather than *partial* because the first assumes that in the end everything is hydrated (just not everything at once) while the second implies that some parts of the application are not hydrated at all.<sup>[[13]](#ref-13)</sup>

Google also suggests a technique called *Trisomorphic Rendering* where streaming server rendering is combined with service workers.<sup>[[9]](#ref-13)</sup>  

## Caching

Generating the HTML on demand has significant advantages compared to build time creation.
However if we decide to generate the HTML on demand, we expect a higher TTFB and more costs.
A desired scenario would combine the runtime benefits with reduced costs.
This can be achieved by adding a [http cache](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html).
To be more specific, a Caching Proxy would serve our needs:

> "The basic idea in caching is simple: store the retrieved
   document into a local file for further use so it won’t be
   necessary to connect to the remote server the next time
   that document is requested" <sup>[[12]](#ref-16)</sup>

If the first request to a page is made, the required HTML is generated by the server and the request is answered with this HTML.
At the same time a cache entry is created.
Any future requests to the same resource can be answered by the cache.
This way, it is possible to reduce the computing time required to answer a request because the task of creating the HTML is not performed for every request.
Instead it is only performed once for each sub page.
If we are in an environment where the costs are calculated based on the computing time, this would reduce both the TTFB and the costs.

To assure that the contents are always up to date, the cache needs to be [invalidated](https://foshttpcache.readthedocs.io/en/latest/invalidation-introduction.html) when the contents change.
This may seem obvious and straightforward but still deserves to be mentioned as it is considered one of the hardest things in computer science.<sup>[[13]](#ref-17)</sup>
  
<hr/>

<a name="ref-1">[1]</a> [Douglas, Brian on netlify.com. 2016. Prerendering Explained. visited April 11th 2020](https://www.netlify.com/blog/2016/11/22/prerendering-explained/)  
<a name="ref-2">[2]</a> [developers.google.com. Implement dynamic rendering. visited March 30th 2020](https://developers.google.com/search/docs/guides/dynamic-rendering)  
<a name="ref-3">[3]</a> [Malcher, Ferdinand et al. 2019. Angular. Page 551f](https://books.google.de/books/about/Angular.html?id=d46gDwAAQBAJ&redir_esc=y)  
<a name="ref-4">[4]</a> [aws.amazon.com. Amazon S3 pricing. visited April 11th 2020](https://aws.amazon.com/s3/pricing/)  
<a name="ref-5">[5]</a> [aws.amazon.com. Amazon EC2 Pricing. visited April 11th 2020](https://aws.amazon.com/ec2/pricing/on-demand/) Based on a t2.micro instance running 750 hours / month  
<a name="ref-6">[6]</a> [aws.amazon.com. AWS Lambda Pricing. visited March 30th 2020](https://aws.amazon.com/lambda/pricing/)   
<a name="ref-7">[7]</a> [Roberts, Mike on martinfowler.com. 2018. Serverless Architectures. visited April 11.th 2020](https://martinfowler.com/articles/serverless.html)  
<a name="ref-8">[8]</a> [Ackin, Sasha on hackernoon.com. 2017. What's New With Server-Side Rendering in React 16. visited March 30th 2020](https://hackernoon.com/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67)  
<a name="ref-9">[9]</a> [npmjs.com. Prerender SPA Plugin. visited April 12th 2020](https://www.npmjs.com/package/prerender-spa-plugin)  
<a name="ref-10">[10]</a> [Robbins, Charlie on blog.nodejitsu.com. 2011. Scaling Isomorpic JavaScript Code. visited March 30th 2020 (archived)](https://web.archive.org/web/20170703210112/https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)  
<a name="ref-11">[11]</a> [reactjs.org. ReactDOMServer. visited April 12th 2020](https://reactjs.org/docs/react-dom-server.html)  
<a name="ref-12">[12]</a> [angular.io. Server Side Rendering (SSR) with Angular Universal. visited April 12th 2020](https://angular.io/guide/universal#working-around-the-browser-apis)  
<a name="ref-13">[13]</a> [Miller, Jason and Osmani, Addy on developers.gooole.com. 2019. Rendering on the Web. visited March 30th 2020](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)  
<a name="ref-14">[14]</a> [Markbage, Sebastian on github.com. 2019. Partial Rehydration. visited March 30th 2020](https://github.com/facebook/react/pull/14717)  
<a name="ref-15">[15]</a> [Cross, Jeff on github.com. 2016. Partial Rehydration. visited March 30th 2020](https://github.com/angular/angular/issues/13446)  
<a name="ref-16">[16]</a> [Luotonen, Ari and Altis, Kevin. 1994. World-Wide Web Proxies](http://courses.cs.vt.edu/~cs4244/spring.09/documents/Proxies.pdf)  
<a name="ref-13">[17]</a> [Bray, Tim on tbray.org, citing Phil Karlton. 2005. visited March 30th 2020](http://www.tbray.org/ongoing/When/200x/2005/12/23/UPI)      





