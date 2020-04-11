# Metrics

One aim of this blog is to compare the performance of different rendering approaches for web applications built with modern JavaScript frameworks.
To be able to do this, it is required to find out which metrics could be suitable to measure the performance.

### User centric performance metrics

Because the perceived user performance is one of the main reasons to care about website rendering, it is required to have metrics which model this user perception. 
Google has identified a number of indicators as user centric performance metrics.<sup>[[1]](#ref-1)</sup>
For measuring the user centric performance regarding rendering strategies we select the following metrics.
All of these can be measured using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse). 
We will perform an audit for each blog implementation and compare the numbers in course of the [case study](./case-study) and have a look at the [results](./results) afterwards.

### First Contentful Paint (FCP)

> "The First Contentful Paint (FCP) metric measures the time from when the page starts loading to when any part of the page's content is rendered on the screen."<sup>[[2](#ref-2)]</sup>

To summarize, this metrics tells us how long it takes for the user to be shown any content, which may be either "text, images (including background images), `<svg>` elements, or non-white `<canvas>` elements"<sup>[[2](#ref-2)]</sup>.

### Largest Contentful Paint (LCP)

> "The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible in the viewport."<sup>[[3](#ref-3)]</sup>

In contrast to the the FCP, this metric is not satisfied by just *any* content.
Instead it waits for the largest element in the viewport to become visible. 
The element matching this criteria may change during the render process as more and more elements become visible.
Therefore, the LCP changes during the render process whenever the largest visible element changes.
The last value emitted by the browser is deemed to be the metrics (final) value.<sup>[[3](#ref-3)]</sup>

The LCP is a relatively new metric and was introduced to replace the formerly popular First *Meaningful* Paint (FMP).
Google have announced to implement this change in version 6.0 of their lighthouse tool.<sup>[[4](#ref-4)]</sup>
This version has not been released yet<sup>[[5](#ref-5)]</sup> and version 5.6 still measures the FMP, so we will use this metric instead.

### First Meaningful Paint (FMP)

> "FMP measures when the primary content of a page is visible to the user. The raw score for FMP is the time in seconds between the user initiating the page load and the page rendering the primary above-the-fold content." <sup>[[4](#ref-4)]</sup>

The First Meaningful Paint was introduced to identify the time when the main contents of the page become visible. 
"Paints with only the page header, navigation bar, or loading indicator such as spinner icon don't qualify"<sup>[[6](#ref-6)]</sup>, which represents a clear difference to FCP. 

### First Input Delay (FID)

> "FID measures the time from when a user first interacts with your site (i.e. when they click a link, tap on a button, or use a custom, JavaScript-powered control) to the time when the browser is actually able to respond to that interaction." <sup>[[7](#ref-7)]</sup>

This metric is especially interesting regarding single page applications.
Single page applications usually assign their event listeners during their bootstrap process.
The latter can take longer for large applications. 
So if the user interacts with an element which is already visible but not yet assigned an event listener, the interaction may be handled after a delay or even worse not trigger any action at all. <sup>[[7](#ref-7)]</sup>

### Max Potential FID

> "Max Potential FID measures the worst-case First Input Delay that your users might experience." <sup>[[8](#ref-8)]</sup>

To calculate this, the longest blocking JavaScript task is identified. 
It is considered that as long as the browser is busy executing JavaScript, it cannot respond to user interaction.
So the longest blocking JavaScript task gives us the Maximum Potential First Input Delay. <sup>[[8](#ref-8)]</sup>

### Time to Interactive (TTI)

> "The TTI metric measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input quickly." <sup>[[9](#ref-9)]</sup>

The Time to Interactive (TTI) is strongly related to the Max Potential FID. 
It also keeps track on long tasks which block the main thread. 
Instead of just finding the longest task, it identifies the time when the last of these long tasks has finished and the browser is ready to respond on user interactions reliably.<sup>[[9](#ref-9)]</sup> 

## Machine centric performance metrics

Server side rendering also aims to improve website performance regarding bots.
We care about two types of bots when measuring our performance.

### Search Engines

#### Time to First Byte (TTFB)

> "This metric captures how long it takes your browser to receive the first byte of a response from a web server when you request a particular URL. In other words, this metric encompasses the network latency of sending your request to the web server, the amount of time the web server spent processing and generating a response, and amount of time it took to send the first byte of that response back from the server to your browser" <sup>[[10](#ref-10)]</sup>

The Time to First Byte (TTFB) has been found correlated to the google search rank and is therefore an important metric to measure the performance of our blog implementations.<sup>[[10](#ref-10)]</sup>
It is also worth mentioning that a high TTFB also increases the value of FCP, LCP, FMP and TTI, because they all start their timer when the page starts loading. 
This includes the time it takes the server to process the request.

#### Contentful Initial Response (CIR)
Most Search Engines require the real content of the page to be present in the initial HTML document provided by the web server and do only process JavaScript in a deferred way or not at all.<sup>[11](#ref-11)]</sup>
To determine whether the website is performing well regarding search engines, we will therefore check if the initial HTML document contains real data or not.

### Sharing previews

Sharing previews are available in most social applications. 
When the user shares a link, these applications usually do not just render the actual url.
Instead, they generate a preview which displays more insightful information which gives the user an idea of what to expect when following the link.
To measure the performance of our blog implementations regarding sharing previews, we will use the debugger tools provided by [facebook](https://developers.facebook.com/tools/debug/) and [twitter](https://cards-dev.twitter.com/validator).
Developers can use these for getting an idea of how the sharing preview of their website would look like if a user shared a link to the website in the respective network.
We will paste the URL of each blog implementation into both debugger tools and evaluate whether the sharing preview is generic or page specific.

<hr/>

<a name="ref-1">[1]</a> [Walton, Philip on web.dev. 2019. User-centric performance metrics. visited March 7th 2020](https://web.dev/user-centric-performance-metrics/)  
<a name="ref-2">[2]</a> [Walton, Philip on web.dev. 2019. First Contentful Paint (FCP). visited March 7th 2020](https://web.dev/fcp/)  
<a name="ref-3">[3]</a> [Walton, Philip on web.dev. 2019. Largest Contentful Paint (LCP). visited March 7th 2020](https://web.dev/lcp/)  
<a name="ref-4">[4]</a> [web.dev. 2019. First Meaningful Paint. visited March 7th 2020](https://web.dev/first-meaningful-paint/)
<a name="ref-5">[5]</a> [github.com. Lighthouse Releases. visited March 7th 2020](https://github.com/GoogleChrome/lighthouse/releases)
<a name="ref-6">[6]</a> [Chris on Code on scotch.io. FMP: First Meaningful Paint. visited April 11th 2020](https://scotch.io/courses/10-web-performance-audit-tips-for-your-next-billion-users-in-2018/fmp-first-meaningful-paint)  
<a name="ref-7">[7]</a> [Walton, Philip on web.dev. 2019. First Input Delay (FID), visited March 7th 2020](https://web.dev/fid/)  
<a name="ref-8">[8]</a> [web.dev. 2019. Max Potential First Input Delay. visited March 7th 2020](https://web.dev/lighthouse-max-potential-fid/)  
<a name="ref-9">[9]</a> [Walton, Philip on web.dev. 2019. Time to Interactive. visited March 7th 2020](https://web.dev/tti/)  
<a name="ref-10">[10]</a> [Hoffmann, Billy on moz.com. 2013. How Website Speed Actually Impacts Search Ranking. visited March 7th 2020](https://moz.com/blog/how-website-speed-actually-impacts-search-ranking)  
<a name="ref-11">[11]</a> [Góralewicz, Bartosz on moz.com. 2017. Going Beyond Google: Are Search Engines Ready for JavaScript Crawling & Indexing?. visited March 7th 2020](https://moz.com/blog/search-engines-ready-for-javascript-crawling)  


