# Single Page Applications - the good, the bad and the why

## Web Frameworks

Job descriptions for frontend web developer jobs barely hold great surprises these days and this has been the case for the last few years. They very often match in their requirements regarding their applicants' skills in frameworks or pupular libraries for building web applications.
When searching for the term *frontend developer* on job platforms [linkedin.com](https://linkedin.com)<sup>[[1](#ref-1)]</sup> and [monster.com](https://monster.com)<sup>[[2](#ref-2)]</sup>, 6 out of the 10 first listings contained references to [Angular](https://angular.io/), [React](https://reactjs.org/) or both.

Angular and React are both developed by companies which are considered to be leaders in the digital sector. Their creators [Facebook](https://facebook.com) and [Google](https://google.com) (represented by parent company Alphabet) both make the top 10 of [forbes.com's Top 100 Digital Companies List](https://www.forbes.com/top-digital-companies). Considering that these companies created these tools and continue to use them<sup>[[3]](#ref-3),[[4]](#ref-4)</sup>, their quality is considered to be industry proven and many other organisations and developers decided to utilise them as well. 

This has lead to a high popularity of these libraries and frameworks among developers worldwide. React is #4 (143 250 Stars) on the list of the highest ranked code repositories on [github](https://github.com), Angular currently ranks on #41 (57 164 Stars) but might have also been among the top 10, had they not chosen to open a new repository in opposition to continuing their work on the repository of predecessor AngularJS (#35, 59 644 Stars). Another Web Frontend Framwork with a high position on the list is [Vue.js](https://vuejs.org) (#3, 156 499 Stars). In contrast to React and Facebook, Vue.js was started as a private project by a (now former) Google employee<sup>[[5](#ref-5)]</sup>. [stackoverflow.com](https://stackoverflow.com)'s 2019 developer survey shows that React, Vue.js and Angular are the mosted wanted web frameworks.<sup>[[6](#ref-6)]</sup>

## Single Page Applications

While all of the introduced frameworks offer support for a number of different use cases, the default setup seems to be tailored for building so-called single-page applications. The React docs list [create-react-app](https://github.com/facebook/create-react-app), a tool for building single-page-applications with react as the first of four recommended toolchains.<sup>[[7]](#ref-7)</sup> The Vue installation Guide introduces its CLI as a tool for "quickly scaffolding ambitious Single Page Applications"<sup>[[8]](#ref-8)</sup> and Angular docs state that "Angular is an app-design framework and development platform for creating efficient and sophisticated single-page apps"<sup>[[9]](#ref-9)</sup>.

> "A *single page application* is exactily what its name implies: a JavaScript-driven web application that requires only a single page load" <sup>[[10]](#ref-10)</sup>

The response of the single page requested from the server only contains references to further resources (CSS, Scripts) and a very small amount of markup. The actual rendering is performed in the browser by a script. Data may be fetched asynchronously by a script as well.

### Benefits
The payload of the single page requested from the server is usually very low which leads to a quick response because the responsible server does not require to do any computational tasks. Its only purpose is to delivery static resources.  
Visiting a different sub-site of the application does not require a full page reload. This is considered a big advantage as it results in a smooth, app-like user experience once the application has loaded.<sup>[[11]](#ref-11)</sup>

<p class="image">
<img src="./angular-spa.gif"/>
Single-page application example: <a href="https://angular.io/">Angular Website</a>
</p>

The Angular Website is an example of a such single-page application. Whilst we are navigating through the application, we are never presented a blank screen, even if the network connection is bad.

### Downsides
The described way of building an application comes with a few downsides. The fact that a script is responsible for rendering the markup and fetching the real data makes it a very critical resource. If we visit the same page with JavaScript disabled, we are presented with a page offering basically no content and no interactivity.

<p class="image">
<img src="./angular-js-disabled.png"/>
<a href="https://angular.io/">Angular Website</a> with JavaScript disabled
</p>

"Who disables JavaScript in their browser?" or "Who has a browser with no JavaScript in 2020?" one might ask. People usually do not, but robots may. 
A very important robot which may visit your site is the Googlebot, Google's web crawler. 

<p class="image">
<img src="./googlebot-crawl-render-index.png"/>
Googlebot JavaScript Processing<sup><a href="#ref-12">[12]</a></sup>
</p>

The good news is: Googlebot does process JavaScript. It does work with an evergreen version of Chromium which needs to be considered when selecting the JavaScript language features used in the application. But: The JavaScript is not processed on the first visit of the site. Googlebot first just crawls the initial HTML and puts the JavaScript-based rendering (or more general: execution of any JavaScript) into a qeueue which it processes "once Googlebot resources allow"<sup>[[12]](#ref-12)</sup> it. Google does not make definite statements on how long it may take for a queue entry to be processed.<sup>[[12]](#ref-12)</sup>

When the server answers each initial request with the same static HTML file, there is also no room for optimizing the sharing behavior for inidividual sub pages of the application. Facebook, for instance, uses the [Open Graph Protocol](https://ogp.me) to generate its sharing previews on their platform. 
There are a number of predefined Meta Tags (e.g. `og:title` and `og:image`) which need to be set for a good sharing performance.<sup>[[13]](#ref-13)</sup> If these are only defined once, the sharing preview for each sub page (e.g. `/home` and `/about`) will always look the same. 
This leaves the developer with only two options: he could either use very general values which are feasible for all pages or he could use specific values for the page he judges the most important. Both options are not really satisfactory.

<hr/>        

<a name="ref-1">[1]</a> [Job Search on monster.com, February 8th 2020](https://www.monster.com/jobs/search/?q=frontend-developer&intcid=skr_navigation_nhpso_searchMain)  
<a name="ref-2">[2]</a> [Job Search on linkedin.com, February 8th 2020](https://www.linkedin.com/jobs/search?keywords=Frontend%20Developer)  
<a name="ref-3">[3]</a> [Angular on opensource.google, February 8th 2020](https://opensource.google/projects/angular)  
<a name="ref-4">[4]</a> [Dan Abramov on Twitter, February 8th 2020](https://twitter.com/dan_abramov/status/1002590695859933191)  
<a name="ref-5">[5]</a> [Interview with Vue.js creator Evan You, February 8th 2020](https://www.freecodecamp.org/news/between-the-wires-an-interview-with-vue-js-creator-evan-you-e383cbf57cc4/)  
<a name="ref-6">[6]</a> [Stackoverflow Survey 2019: Most wanted web frameworks, February 8th 2020](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-web-frameworks)  
<a name="ref-7">[7]</a> [React Toolchains, February 8th 2020](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains)  
<a name="ref-8">[8]</a> [Vue.JS Guide, February 8th 2020](https://vuejs.org/v2/guide/installation.html#CLI)  
<a name="ref-9">[9]</a> [Angular Docs Introduction, February 8th 2020](https://angular.io/docs#introduction-to-the-angular-docs)  
<a name="ref-10">[10]</a> [JavaScript The Definitge Guide, Page 497](https://books.google.de/books?id=2weL0iAfrEMC)  
<a name="ref-11">[11]</a> [Single-page application vs. multiple-page application, February 8th 2020](https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58)  
<a name="ref-12">[12]</a> [Understand the JavaScript SEO basics
](https://developers.google.com/search/docs/guides/javascript-seo-basics?hl=en)  
<a name="ref-13">[13]</a> [The Open Graph protocol](https://ogp.me/)  
