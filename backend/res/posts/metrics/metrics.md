# Metrics

One important aim of this blog is to compare the performance of different rendering approaches  web applications build with modern JavaScript frameworks.
To be able to do this, it is required to select reasonable (?) metrics that can be used to measure the performance.

### User centric performance metrics

https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics

As perceived performance (by the user) is one of the reasons to care about website rendering, it is required to have metrics which map this user perception. 

Google has identified the following indicators as user centric performance metrics.

### First Contentful Paint (FCP)

"The First Contentful Paint (FCP) metric measures the time from when the page starts loading to when any part of the page's content is rendered on the screen."

### Largest Contentful Paint (LCP)

"The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible in the viewport."

### Time to interactive (TTI)

"The TTI metric measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input quickly."

All of these metrics can be measured using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse). 
We will perform an audit for each blog implementation and compare the numbers.    

## Machine centric performance metrics

Server side rendering also tackles website performance regarding bots.
We care about two types of bots when measuring our performance.

### Search Engines

(Most) Search Engines require the real content of the page to be present in the initial HTML document provided by the web server (TODO: QUELLE).
To determine whether the website is performing well regarding search engines, we will therefore check if the initial HTML document contains real data or not (binary).

### Sharing previews

Sharing previews are available in most social applications. 
When the user shares a link, these applications usually do not just render the actual url.
Instead, they generate a preview which displays more insightful information which gives the user an idea of what to expect when following the link.
To measure the performance of our blog implementations regarding sharing previews, we will use the debugger tools provided by facebook and twitter (TODO: Links).
Developers can use these for getting an idea of how the sharing preview of their website would look like if a user shared a link to the website in the respective network.
We will paste the URL of each blog implementation into both debugger tools and evaluate whether the sharing preview is generic or page specific. (binary)            

https://web.dev/fcp/
https://web.dev/lcp/
https://web.dev/tti/

