# Case Study

The aim of this case study is to find out which steps are required to move from a standard single-page application which is fully rendered in the browser towards an optimized server supported rendering architecture.
 
The sample application for this undertaking is the blog web app that you are currently using. 
The blog has been implemented in all three platforms both in a simple CSR manner and in a more sophisticated SSR-enabled version.
The official documentation of the respective framework was used as the main resource for instructions and advise.

The full source code is available in this [github repository](https://github.com/glutengo/rendering-strategies). 

## Frontend

The frontend application consists of three main components:

* The `Post` component displays the current post. This component is mapped to the route `/post/:id`.
When created, it fetches the contents of this post form the backend using the `id` provided in the URL. 
When following an internal link (e.g. a reference to another blog post), there should not be a full page reload.
The router of the single-page application should handle the navigation instead.
* The `Header` component contains the page header which displays the title of the blog. 
It also displays a HTML `<select>` element which shows the currently used implementation and allows the user to switch between the different implementations.
To be able to render this data, this component needs to fetch the list of implementation options from the backend.
* The `PostList` component displays the table of content and allows the user to navigate between the different blog posts.
To achieve this, this components needs to load the list of posts from the backend.
When navigating to another post, there should not be a full page reload. 
The navigation should be handled by the router of the single-page application.
The currently displayed post is highlighted in the list.


## Backend

All three frontend applications are accompanied by the same backend application. 
It is a Node.JS server application which has the main purpose of serving static files and prepare the blog contents which are Markdown files so they can easily be rendered in the browser. 

The frontend applications contain hardly any style declarations. This is decision was made to ensure that the three frontend applications have the same look and file. 
It is therefore required that the frontend applications produce the same (or at least a compatible) DOM tree which so combined with a central stylesheet provided by the backend they have the same appearance.   

While reading this blog, you can switch between the different frameworks and implementation variations anytime by using the dropdown menu in the page header.     

[Angular](./angular)  
[React](./react)  
[Vue.js](./vue)
