# Rendering Strategies for Web Applications

This repository contains the source code for a blog application which was developed to compare the SSR options in Web Frameworks Angular, React and Vue.js.

The blog is running here:  
~~[Angular CSR](http://d1pw9cfb12erjk.cloudfront.net)~~
~~[Angular SSR](http://d2hzvu1y6e5tsn.cloudfront.net)~~
~~[React CSR](http://d1h9bx0qn9u5ul.cloudfront.net)~~
~~[React SSR](http://d3iyszkp1de9rn.cloudfront.net)~~
~~[Next.js](http://d2bsz75rmkcsy3.cloudfront.net)~~
~~[Vue.js CSR](http://dcktqs7uo9ylw.cloudfront.net)~~
~~[Vue.js SSR](http://d3hhz5c0f514y5.cloudfront.net)~~

The blog applications are not running on AWS anymore due to increased costs. A limited version of the project is available at the following URL. Please note that only the Angular CSR variant is running and the switch to the other implementations does not work here.
https://rendering-strategies-ng-csr.herokuapp.com

The repository contains subdirectories for the backend application and each frontend implementation.
Please consult the relevant subdirectory or blog post for more information.

The root directory also contains the script which was used to run the audits (`./scripts/lighthouse.js`) and the audit results (`./audits`for the performance and sharing previews.
The performance audits can be re-run by installing the dependencies (`npm install`) and then running the `analyze` script (`npm run analyze`).
This will perform the audits and store the results in a new subdirectory named with the current date in the `audits` directory. 
 
