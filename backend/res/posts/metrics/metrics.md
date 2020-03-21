# Metrics

One important aim of this blog is to compare the performance of different rendering approaches for web applications built with modern JavaScript frameworks.
To be able to do this, it is required to find out which metrics could be suitable to measure the performance.

### User centric performance metrics

Because the performance which is perceived by the user is one of the main reasons to care about website rendering, it is required to have metrics which model this user perception. 
Google has identified a number of indicators as user centric performance metrics.<sup>[[1]](#ref-1)</sup>
For measuring the user centric performance regarding rendering strategies we select the following metrics.
All of these metrics can be measured using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse). 
We will perform an audit for each blog implementation and compare the numbers in course of the [case study](./case-study) and have a look at the [results](./results) afterwards.

### First Contentful Paint (FCP)

> "The First Contentful Paint (FCP) metric measures the time from when the page starts loading to when any part of the page's content is rendered on the screen."<sup>[[2](#ref-2)]</sup>

To summarize, this metrics tells us how long it takes for the user to be shown any content, which may be either "text, images (including background images), `<svg>` elements, or non-white `<canvas>` elements"<sup>[[2](#ref-2)]</sup>.

### Largest Contentful Paint (LCP)

> "The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible in the viewport."<sup>[[3](#ref-3)]</sup>

In contrast to the the FCP, this metric is not satisfied with just *any* content.
Instead it waits for the largest element in the viewport to become visible. 
The element matching this criteria may change during the render process as more and more elements become visible.
Therefore, the LCP changes during the render process whenever the largest visible element changes.
The last value emitted by the browser is deemed to be the metrics (final) value.<sup>[[3](#ref-3)]</sup>

The LCP is a relatively new metric and was introduced to replace the formerly popular First *Meaningful* Paint (FMP).
Google have announced to implement this change in version 6.0 of their lighthouse tool.<sup>[[4](#ref-4)]</sup>
This version has not been released yet (as from March 16th, 2020).
Version 5.6 still measures the FMP, so we will use this metric instead.

### First Meaningful Paint (FMP)

> "FMP measures when the primary content of a page is visible to the user. The raw score for FMP is the time in seconds between the user initiating the page load and the page rendering the primary above-the-fold content." <sup>[[4](#ref-4)]</sup>



### First Input Delay (FID)

> "FID measures the time from when a user first interacts with your site (i.e. when they click a link, tap on a button, or use a custom, JavaScript-powered control) to the time when the browser is actually able to respond to that interaction." <sup>[[5](#ref-5)]</sup>

This metric is especially interesting regarding single page applications.
Single page applications usually set their event listeners during their bootstrap process.
The latter can take longer for large applications. 
So if the user interacts with an element which is already visible but not yet assigned an event listener, the interaction may be handled after a delay or even worse not trigger any action at all. <sup>[[5](#ref-5)]</sup>

### Max Potential FID

> "Max Potential FID measures the worst-case First Input Delay that your users might experience." <sup>[[6](#ref-6)]</sup>

To calculate this, the longest blocking JavaScript task is identified. 
It is considered that as long as the browser is busy executing JavaScript, it cannot respond to user interaction.
So the longest blocking JavaScript task gives us the Maximum Potential First Input Delay. <sup>[[6](#ref-6)]</sup>


### Time to interactive (TTI)

> "The TTI metric measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input quickly." <sup>[[7](#ref-7)]</sup>

## Machine centric performance metrics

Server side rendering also aims to improve website performance regarding bots.
We care about two types of bots when measuring our performance.

### Search Engines

#### Time to First Byte (TTFB)

> "This metric captures how long it takes your browser to receive the first byte of a response from a web server when you request a particular URL. In other words, this metric encompasses the network latency of sending your request to the web server, the amount of time the web server spent processing and generating a response, and amount of time it took to send the first byte of that response back from the server to your browser" <sup>[[8](#ref-8)]</sup>

The Time to First Byte (TTFB) has been found correlated to the google search rank and is therefore an important metric to measure the performance of our blog implementations.

#### Contentful Initial Response
Most Search Engines require the real content of the page to be present in the initial HTML document provided by the web server and do only process JavaScript in a deferred way or not at all.<sup>[[9](#ref-9)]</sup>
To determine whether the website is performing well regarding search engines, we will therefore check if the initial HTML document contains real data or not.

### Sharing previews

Sharing previews are available in most social applications. 
When the user shares a link, these applications usually do not just render the actual url.
Instead, they generate a preview which displays more insightful information which gives the user an idea of what to expect when following the link.
To measure the performance of our blog implementations regarding sharing previews, we will use the debugger tools provided by [facebook](https://developers.facebook.com/tools/debug/) and [twitter](https://cards-dev.twitter.com/validator) (TODO: Links).
Developers can use these for getting an idea of how the sharing preview of their website would look like if a user shared a link to the website in the respective network.
We will paste the URL of each blog implementation into both debugger tools and evaluate whether the sharing preview is generic or page specific. (binary)


<a name="ref-1">[1]</a> [web.dev: User Centric Performance Metrics](https://web.dev/user-centric-performance-metrics/)  
<a name="ref-2">[2]</a> [web.dev: First Contentful Paint](https://web.dev/fcp/)  
<a name="ref-3">[3]</a> [web.dev: Largest Contentful Paint](https://web.dev/lcp/)  
<a name="ref-4">[4]</a> [web.dev: First Meaningful Paint](https://web.dev/first-meaningful-paint/)  
<a name="ref-5">[5]</a> [web.dev: First Input Delay](https://web.dev/fid/)  
<a name="ref-6">[6]</a> [web.dev: Max Potential FID to Interactive](https://web.dev/lighthouse-max-potential-fid/)  
<a name="ref-7">[7]</a> [web.dev: Time to Interactive](https://web.dev/tti/)  
<a name="ref-8">[8]</a> [Billy Hoffmann: How Website Speed Actually Impacts Search Ranking](https://moz.com/blog/how-website-speed-actually-impacts-search-ranking)
<a name="ref-9">[9]</a> [Are Search Engines Ready for JavaScript Crawling](https://moz.com/blog/search-engines-ready-for-javascript-crawling)

https://moz.com/blog/improving-search-rank-by-optimizing-your-time-to-first-byte
https://blog.angular.io/3-tips-for-angular-runtime-performance-from-the-real-world-d467fbc8f66e
