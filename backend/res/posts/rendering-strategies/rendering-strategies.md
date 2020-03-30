# Rendering Strategies

[We have seen](./motivation) that Single Page Applications built with modern web frameworks are very popular.
It is also known that these single page applications have potential flaws regarding perceived user performance and search engines.

To tackle these flaws it is required to put the rendering strategy which is used in single page applications into perspective.

## Client Side Rendering (CSR)

In their standard setups, Angular, React and Vue all use a rendering strategy which is described as Client Side Rendering (CSR).

> "Client-side rendering (CSR) means rendering pages directly in the browser using JavaScript. All logic, data fetching, templating and routing are handled on the client rather than the server."<sup>[[1]](#ref-1)</sup>

This means that the initial HTML document provided by the server does not contain any content.

<p class="image">
<img src="./timeline-csr.png"/>
Typical timeline for the rendering process for CSR<sup><a href="#ref-2">[2]</a></sup>  
</p>

Our application needs to load and process further resources (primarily JavaScript) to be able to display the content and allow any interaction.
For client side rendered applications, the TTFB is usually very low because the server only needs to deliver static resources.
Once the main JavaScript bundle is loaded, the application can produce its FCP which will usually only contain some static site elements and not the actual content.
The application may then download the content from an API and render the content so it gets visible to the user (FMP).
As a result, the FMP and the TTI can be quite high which can lead to a bad perceived performance regarding page load. 
Once the application is fully loaded, it feels very quick and does not need full repaints when navigating to other areas of the application because the logic to render the UI has already been downloaded and the newly needed data can be fetched asynchronously.

Examples for this technique:
* [Microsoft Office Home](https://www.office.com/apps)<sup><a href="#ref-4">[4]</a></sup>
* gmail.com, [default mail client](https://gmail.com) 

## Server Side Rendering (SSR)

The complete opposite of CSR lies in Server Side Rendering (SSR).
  
> "Server rendering generates the full HTML for a page on the server in response to navigation. This avoids additional round-trips for data fetching and templating on the client, since it’s handled before the browser gets a response."<sup>[[1]](#ref-1)</sup>

In this case, the initial HTML document contains the actual content of the page.

<p class="image">
<img src="./timeline-ssr.png"/>
Typical timeline for the rendering process for SSR<sup><a href="#ref-2">[2]</a></sup>  
</p>

In extreme cases, this can lead to FCP, FMP and TTI happening at the same time.
The application may load and process JavaScript to add enhancements (omitted in the diagram), but these scripts tend to be a lot smaller because they are not responsible for critical tasks like rendering.
Because the HTML needs to be built on the server and more data is transferred from the server to the client in the initial request, the TTFB is usually higher compared to CSR applications.
On the other side, the gap between TTI and FMP is smaller (or zero) because the amount of JavaScript that needs to be processed is smaller in most cases.
After the loading process, the user experience is considered worse because navigation to another (sub) page requires a full repaint of the page.

Examples for this technique:
* amazon.com, e.g. the [product detail page](https://www.amazon.de/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
* [vogue.com](https://vogue.com) as an example for a wordpress website
* github.com, e.g. the [repository page](https://github.com/glutengo/rendering-strategies)

## SSR with with re-hydration

Comparing the two techniques, it seems useful to find a solution which combines the best of the two:
Having a fully rendered DOM in the initial Request and not needing a page reload when navigating through the application.

To achieve that, we need to to render the initially requested page on the server and still bootstrap the full application in the browser again.
If we would just do that and let our single page application clean the DOM Element where it uses as a rendering target, we would end up with a temporarily blank screen.
To avoid that, a technique called *hydration* or *re-hydration* has emerged.

> "Rehydration: “booting up” JavaScript views on the client such that they reuse the server-rendered HTML’s DOM tree and data."<sup>[[1]](#ref-1)</sup> 
 
Just like the CSR approach, this solution provides a good user experience in terms of not needing any full page reloads, once the application is fully loaded.

<p class="image">
<img src="./timeline-ssr-hydration.png"/>
Typical timeline for the rendering process for SSR with ry-hydration<sup><a href="#ref-2">[2]</a></sup>
</p>

It is slower regarding TTFB because the server needs to do more than just deliver static files and the payload of the initial request is bigger.
This can be improved by adding a [cache](./considerations#caching).
The FMP should be comparably low or at least the difference between FMP and TTFB should be small because our single page application does not need to do any rendering or fetch data before the user is presented with the content.
Probably the biggest downside of this approach is an increased gap between FMP and TTI. 
The user may be presented the contents very quickly but he still needs to wait until the JavaScript is processed until the application becomes fully reactive.<sup>[[6]](#ref-6)</sup>
There are some experimental strategies for overcoming this problem or reducing this effects. These are listed in the [considerations](./considerations#(re-)hydration).

Examples for this technique:
* [m.twitch.com](https://m.twitch.tv)<sup><a href="#ref-3">[3]</a></sup>
* [airbnb.com](https://www.airbnb.com/)<sup><a href="#ref-5">[5]</a></sup>
* [onefootball.com](https://onefootball.com/)<sup><a href="#ref-4">[5]</a></sup>
  
<hr/> 
  
<a name="ref-1">[1]</a> [Miller, Jason and Osmani, Addy on developers.gooole.com. Rendering on the Web, visited March 30th 2020](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)  
<a name="ref-2">[2]</a> These diagrams were created based on the insights gained in the [measurements results](./results) of the [case study](./case-study) and inspired by [[1]](#ref-1) and the [performance tab](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance) in Chrome developer tools.  
<a name="ref-3">[3]</a> [nextjs.org. Showcase, visited March 30th 2020](https://nextjs.org/showcase)  
<a name="ref-4">[4]</a> [madewithangular.com. Angular, visited March 30th 2020](https://www.madewithangular.com/categories/angular/)  
<a name="ref-5">[5]</a> [stackshare.io. Airbnb, visited March 30th 2020](https://stackshare.io/airbnb/airbnb)  
<a name="ref-6">[6]</a> [Osmani, Addy on addyosmani.com. The Cost Of Client-side Rehydration, visited March 30th 2020](https://addyosmani.com/blog/rehydration/)
