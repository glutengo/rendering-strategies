# Measurement Results

To compare the performance of the different blog implementations, they were tested regarding the [metrics](./metrics) which were selected before.

## Test Setup

The tests were run using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse).
To be able to run a larger number of these tests with the same prerequisites, they were started programmatically.

To evaluate how the implementations fare in different environments, a few different test setups were created. 
Each test was run 11 times and the median value (based on sorting by FMP) was selected as the result.
The [metrics](./metrics) post was opened on each test. 
This post contains a medium amount of text, but no other resources like images. 

Lighthouse allows [throttling](https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md) the network connection when running the audits. 
For these tests, the *request-level throttling* method was used.
The test setups include three throttling presets. 

* none: No request latency, 50000kbps download throughput, 50000kbps upload throughput
* Fast 3G: 128ms request latency, 4096kbps download throughput, 1024kbps upload throughput<sup>[[2]](#ref-2)</sup>
* Slow 3G: 384ms request latency, 768kbps download throughput, 64kbps upload throughput<sup>[[2]](#ref-2)</sup>

The tests were run on a MacBook Pro (2019) with 2.8 GHz Intel Core i7 CPU, 16 GB 2133 MHz LPDDR3 RAM and Intel Iris Plus Graphics 655 1536 MB.
This is a high end machine which is likely to be quicker than the computer/smartphone of the average user.
As the values become smaller it is also harder to tell whether there was a significant difference between two values.
For these purposes Lighthouse offers the `cpuSlowdownMultiplier` option which throttles the power of the CPU. 
This was set to `4` for all setups.

To learn the impact of the Cloudfront cache and CDN, all tests were run against the cache-enabled version (via cloudfront) and the non-cached version (direct access to the loadbalancer) of the applications.
The tests have shown that the effect of the cache regarding timings decreases on slower connections.
Therefore only the results for the non-cached setup with no network throttling have been included here. 

The tests regarding contentful initial request (CIR) and individual sharing preview (ISP) were only run once and copied over, because their results are independent from the chosen test setup.

The full audit results were collected in the code repository of the case study. 
Follow this [link](https://github.com/glutengo/rendering-strategies/tree/master/audits) to view them.

### Setup #1: No Cache, No Network Throttling
     
| Implementation | TTFB | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ---- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 18ms | 624ms  | 1092ms | 1073ms | 401ms  | no  | no  |
| Angular SSR    | 52ms | 1041ms | 1041ms | 1041ms | 16ms   | yes | yes |
| React CSR      | 18ms | 453ms  | 940ms  | 912ms  | 405ms  | no  | no  |
| React SSR      | 42ms | 869ms  | 869ms  | 869ms  | 16ms   | yes | yes |
| Next           | 52ms | 870ms  | 870ms  | 870ms  | 16ms   | yes | yes |
| Vue CSR        | 17ms | 622ms  | 1068ms | 1045ms | 407ms  | no  | no  |
| Vue SSR        | 40ms | 997ms  | 997ms  | 997ms  | 16ms   | yes | yes |

The first tests were run against the loadbalancer with no network throttling.

#### Observations:
* CSR and SSR for each setup have a difference of 23-34ms regarding TTFB. This is the time it takes the server to render the HTML on demand.
* FCP for any CSR setup is lower than all SSR setups. This is caused by the smaller payload of the initial response. The browser also needs to render less content.
* CSR setups show a gap between FMP and FCP. This is down to the fact that the CSR setups need to fetch the actual data and render again.
* CSR setups have a high max potential FID and a gap between TTI and FCP
* SSR setups have a CIR and ISP, CSR setups do not have these

### Setup #2: Cloudfront Cache, No Network Throttling

| Implementation | TTFB | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ---- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 8ms  | 1025ms | 1025ms | 1025ms | 16ms   | no  | no  |
| Angular SSR    | 11ms | 997ms  | 997ms  | 997ms  | 16ms   | yes | yes |
| React CSR      | 14ms | 451ms  | 926ms  | 903ms  | 399ms  | no  | no  |
| React SSR      | 11ms | 849ms  | 849ms  | 849ms  | 16ms   | yes | yes |
| Next           | 11ms | 867ms  | 867ms  | 867ms  | 16ms   | yes | yes |
| Vue CSR        | 11ms | 573ms  | 1022ms | 1000ms | 404ms  | no  | no  |
| Vue SSR        | 10ms | 968ms  | 968ms  | 968ms  | 16ms   | yes | yes |

In the second setup, the tests were run against Cloudfront with no network throttling.

#### New Observations:
* (almost) no difference between CSR and SSR for each setup regarding TTFB. This is the case, because the server does not need to render the HTML. The requests are fully answered by the cache. 
* Overall TTFB values are lower than in the first setup. This is the case, because in addition to caching, Cloudfront offers further optimizations regarding latency and transfer speeds.<sup>[[3]](#ref-3)</sup>
* FCP, FMP and TTI are also slightly lower
* Angular CSR has an increased FCP. Max Potential FIP is low and there is no gap between FMP/TTI and FCP.  

### Setup #3: Cloudfront Cache, Fast 3G

| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 132ms | 912ms  | 1396ms | 1358ms | 400ms  | no  | no  |
| Angular SSR    | 131ms | 1287ms | 1287ms | 1287ms | 16ms   | yes | yes |
| React CSR      | 132ms | 823ms  | 1451ms | 1419ms | 358ms  | no  | no  |
| React SSR      | 130ms | 1181ms | 1181ms | 1181ms | 16ms   | yes | yes |
| Next           | 132ms | 1101ms | 1101ms | 1101ms | 16ms   | yes | yes |
| Vue CSR        | 131ms | 957ms  | 1422ms | 1397ms | 403ms  | no  | no  |
| Vue SSR        | 129ms | 1124ms | 1124ms | 1366ms | 256ms  | yes | yes |


In the third setup, the tests were run against Cloudfront with Fast 3G network throttling.

#### New Observations:
* Overall TTFB values have risen and are marginally higher than the configured request latency (128ms)
* FCP, FMP and TTI have also risen
* Angular CSR is back in line among the other CSR setups (Increased Max Potential FIP and gap between FMP/TTI and FCP)
* React CSR has a larger gap between FMP and FCP (628ms vs. 484ms for Angular and 465ms for Vue)

### Setup #4: Cloudfront Cache, Slow 3G

| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 395ms | 2138ms | 2968ms | 2952ms | 357ms  | no  | no  |
| Angular SSR    | 391ms | 2091ms | 2091ms | 2322ms | 201ms  | yes | yes |
| React CSR      | 395ms | 1852ms | 2814ms | 2782ms | 358ms  | no  | no  |
| React SSR      | 395ms | 2124ms | 2124ms | 2207ms | 92ms   | yes | yes |
| Next           | 398ms | 2155ms | 2155ms | 2277ms | 124ms  | yes | yes |
| Vue CSR        | 397ms | 2618ms | 3407ms | 3374ms | 361ms  | no  | no  |
| Vue SSR        | 397ms | 2146ms | 2146ms | 2567ms | 250ms  | yes | yes |

In the third setup, the tests were run against Cloudfront with Slow 3G network throttling.

#### New Observations

* Overall TTFB values have risen and are marginally higher than the configured request latency (384ms)
* FCP, FMP and TTI have also risen
* CSR Setups have a higher gap between FMP and FCP
* SSR setups have an increased Max Potential FID
* SSR setups have a notable gap between TTI and FMP now
* FMP for Angular and Vue SSR setups are lower then FCP of the respective CSR setup

## Summary

The tests show that introducing server side rendering has a positive effect regarding perceived user performance.
In all network setups, the first meaningful paint was lower when server side rendering was enabled.
The CSR variants show downsides in user experience regarding responsiveness.
This is revealed by the gap between TTI and FCP and an increased Max Potential First Input Delay. 
This effect was observed for the SSR variants as well, but only for the Slow 3G setup.
On fast network connections, CSR setups offer the benefit of a low FCP. 
This has the effect that the user is shown some elements of the page very quickly although the main content is not visible yet.
The difference between this low FCP for CSR setups and the FCP (= FMP) for the respective SSR setup is just under 200ms for each framework.
Moving towards slower connections, this effects fades. 
For the Slow 3G setup, the FMP of the SSR setup for Angular and Vue is even lower than the FCP for the relevant CSR setup.
This means the the SSR versions are able to display the full content before the CSR variant shows anything.

Among the different JavaScript frameworks, the differences in performance were not significant.
It is notable that Angular CSR performed comparably bad in the second setup (Cloudfront, no network throttling) and showed a deviation from the typical [rendering flow for CSR apps](./rendering-strategies#client-side-rendering-(csr)).
Vue.js shows a significantly high difference between FMP for CSR and SSR in the Slow 3G setup. 
    
For the blog implementation, the impact of the cache seems negligible user performance wise.

The tests also reveal that server side rendering provides improvements regarding bot performance.
The fact that the initial response is contentful and the sharing preview is individual for each sub page represent advantages.
The TTFB has proved to be slightly worse in the SSR setups.
This can be bypassed by setting up a http cache.

### Outlook

The case study served as a good first point of touch with the topic of server side rendered web applications.
There is still great potential to extend the research on the topic.

* For further tests it would be interesting to see how the numbers change when sub pages with different content (images, videos, iframes) and more interactivity are visited.
* The tests were run with request-level throttling. 
This has some downsides which are described in the [Lighthouse docs](https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md).
For more accurate tests, packet-level throttling or testing on real mobile devices could lead to more reliable results.  
* As Next.js performed quite well, extending the case study to include [Nuxt.js](https://nuxtjs.org/) as an alternative setup to Vue.js could provide new insights.
* In larger applications, state management libraries like [redux](https://redux.js.org/), [ngrx](https://ngrx.io/) or [vuex](https://vuex.vuejs.org/) are used. These require and allow new approaches in the SSR implementation, e.g. when it comes to avoiding duplicated requests.    
* The negative impacts of re-hydration could be tackled with partial re-hydration, progressive re-hydration or trisomorphic rendering (see [(re-)hydration](./considerations#(re-)hydration)).
* A performance comparison between universal JavaScript and pre-rendering would also be interesting.

<hr/>

<a name="ref-1">[1]</a> [Grigorik, Ilya on hpbn.co. High Performance Browser Netowrking: Mobile Networks. visited March 16th 2020](https://hpbn.co/mobile-networks)  
<a name="ref-2">[2]</a> The values were selected after consulting [[1]](#ref-1). The article contains a table which lists bounds for 3G (among others) data rates and latency. For both setups, values near the upper / lower edge of the stated scala were picked.  
<a name="ref-3">[3]</a> [aws.amazon.com. Amazon Cloudfront. visited March 16th 2020](https://aws.amazon.com/cloudfront/)
