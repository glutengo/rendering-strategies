# Measurement Results

To compare the performance of the different blog implementations, they were tested regarding the [metrics](./metrics) which were selected before.

## Test Setup

The tests were run using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse).
To be able to run a larger number of these tests in the same setups, they were started programmatically.

To evaluate how the implementations fare in different environments, a few different test setups were created. 
Each test was run 11 times and the median value (based on sorting by FMP) was selected as the result.
The [metrics](./metrics) post was opened on each test. This post contains a comparably large amount of text but now other resources like images. 

The test setups include three types of throttling presets.

* none: No request latency, no limit for download and upload throughput
* Fast 3G: 128ms request latency, 4096kbps download throughput, 1024kbps upload throughput<sup>[[2]](#ref-2)</sup>
* Slow 3G: 384ms request latency, 768kbps download throughput, 64kbps upload throughput<sup>[[2]](#ref-2)</sup>

The tests were run on a MacBook Pro (2019) with 2.8 GHz Intel Core i7 CPU, 16 GB 2133 MHz LPDDR3 RAM and Intel Iris Plus Graphics 655 1536 MB.
This is a high end machine which is likely to be quicker than the computer/smartphone of the average user.
As the values become smaller it is also harder to tell whether there was a significan   t difference between to values.
For these purposes, Lighthouse offers the option `cpuSlowdownMultiplier` which throttles the power of the CPU. 
This was set to `4` for all setups.

To showcase the impact of the Cloudfront cache and CDN, all tests were also run against the cache-enabled version (via cloudfront) and the non-cached version (direct access to the loadbalancer) of the applications.
The tests have shown that the effect of the cache regarding timings decreases on slower connections.
Therefore, only the results for the non-cached setup with no network throttling has been included here. 

The tests regarding Contentful Initial Request (CIR) and Individual Sharing Preview (ISP) were only run once and copied over because their results are independent from the chosen test setup.

All audit results were collected in the code repository of the case study. 
Follow this [link](TODO LINK) to view them.

### Setup #1: No Cache, No Network Throttling
     
| Implementation | TTFB | FCP   | FMP   | TTI   | MP FID | CIR | ISP |
| -------------- | ---- | ----- | ----- | ----- | ------ | --- | --- |
| Angular CSR    | 21ms | 597ms | 797ms | 782ms | 145ms  | no  | no  |
| Angular SSR    | 45ms | 777ms | 777ms | 777ms | 16ms   | yes | yes |
| React CSR      | 18ms | 457ms | 675ms | 658ms | 144ms  | no  | no  |
| React SSR      | 38ms | 632ms | 632ms | 632ms | 16ms   | yes | yes |
| Next           | 39ms | 594ms | 594ms | 594ms | 16ms   | yes | yes |
| Vue CSR        | 20ms | 505ms | 689ms | 665ms | 143ms  | no  | no  |
| Vue SSR        | 40ms | 693ms | 693ms | 693ms | 16ms   | yes | yes |

The first tests were run against the loadbalancer with no network throttling.

#### Observations:
* CSR and SSR for each setup have a difference of ~20ms regarding TTFB. This is the time it takes the server to render the HTML on demand.
* FCP for any CSR setup is lower than all SSR setups. This is caused by the smaller payload of the initial response. The browser also needs to render less content.
* CSR setups show a gap between FMP and FCP. This is down to the fact that the CSR setups need to fetch the actual data and render again.
* CSR setups have a high Max Potential FID and a gap between TTI and FCP
* SSR setups have a CIR and ISP, CSR setups do not have these

### Setup #2: Cloudfront Cache, No Network Throttling

| Implementation | TTFB | FCP   | FMP   | TTI   | MP FID | CIR | ISP |
| -------------- | ---- | ----- | ----- | ----- | ------ | --- | --- |
| Angular CSR    | 9ms  | 788ms | 788ms | 788ms | 16ms   | no  | no  |
| Angular SSR    | 12ms | 719ms | 719ms | 719ms | 16ms   | yes | yes |
| React CSR      | 10ms | 414ms | 633ms | 607ms | 144ms  | no  | no  |
| React SSR      | 8ms  | 627ms | 627ms | 627ms | 16ms   | yes | yes |
| Next           | 10ms | 568ms | 568ms | 568ms | 16ms   | no  | no  |
| Vue CSR        | 9ms  | 443ms | 644ms | 628ms | 152ms  | no  | no  |
| Vue SSR        | 9ms  | 617ms | 617ms | 617ms | 16ms   | yes | yes |

In the second setup, the tests were run against Cloudfront with no network throttling.

#### New Observations:
* (almost) no difference between CSR and SSR for each setup regarding TTFB. This is the case because the server does not need to render the HTML.   
* Overall TTFB values are lower than in the first setup. This is the case because in addition to caching, Cloudfront offers further optimizations regarding latency and transfer speeds. 
* FCP, FMP and TTI are also slightly lower
* React and Vue CSR Setups have a slightly lower gap between FMP and FCP
* React and Vue CSR Setups have a slightly lower Max Potential FID and lower gap between TTI and FCP
* Angular CSR has an increased FCP. Max Potential FIP is low and there is no gap between FMP/TTI and FCP   

This is the case because the server does not perform any computational tasks here. The requests are fully answered by the cache.
This is caused by the optimizations that cloudfront offers over the loadbalancer.

### Setup #3: Cloudfront Cache, Fast 3G

| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 130ms | 883ms  | 1089ms | 1081ms | 144ms  | no  | no  |
| Angular SSR    | 132ms | 1034ms | 1034ms | 1034ms | 16ms   | yes | yes |
| React CSR      | 130ms | 882ms  | 1316ms | 1292ms | 161ms  | no  | no  |
| React SSR      | 129ms | 971ms  | 971ms  | 971ms  | 16ms   | yes | yes |
| Next           | 130ms | 833ms  | 833ms  | 833ms  | 16ms   | yes | yes |
| Vue CSR        | 130ms | 834ms  | 1041ms | 1020ms | 134ms  | no  | no  |
| Vue SSR        | 132ms | 1018ms | 1018ms | 1018ms | 16ms   | yes | yes |

In the third setup, the tests were run against Cloudfront with Fast 3G network throttling.

#### New Observations:
* Overall TTFB values have risen and are marginally higher than the configured request latency (128ms)
* FCP, FMP and TTI have also risen
* Angular CSR is back in line among the other CSR setups (Increased Max Potential FIP and gap between FMP/TTI and FCP)
* React CSR has a larger gap between FMP/TTI and FCP (~440ms vs. ~120ms for Angular and ~180ms for Vue)

### Setup #4: Cloudfront Cache, Slow 3G

| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 399ms | 2105ms | 2740ms | 2717ms | 146ms  | no  | no  |
| Angular SSR    | 402ms | 1826ms | 1826ms | 2074ms | 202ms  | yes | yes |
| React CSR      | 388ms | 1932ms | 2623ms | 2612ms | 138ms  | no  | no  |
| React SSR      | 393ms | 1784ms | 1784ms | 1873ms | 90ms   | yes | yes | 
| Next           | 388ms | 1874ms | 1874ms | 2006ms | 129ms  | yes | yes |
| Vue CSR        | 395ms | 1862ms | 2409ms | 2403ms | 164ms  | no  | no  |
| Vue SSR        | 388ms | 2098ms | 2098ms | 2303ms | 207ms  | yes | yes |

In the third setup, the tests were run against Cloudfront with Slow 3G network throttling.

#### New Observations

* Overall TTFB values have risen and are marginally higher than the configured request latency (384ms)
* FCP, FMP and TTI have also risen
* CSR Setups have a higher gap between FMP and FCP
* SSR setups have an increased Max Potential FID which in two cases (Angular, Vue) Max Potential FID for SSR exceeds the value for the related CSR value.
* SSR setups have a notable gap between TTI and FMP now
* FMP for Angular and React SSR are lower then the respective FCP of the respective CSR setup

## Summary

The tests show that introducing Server Side Rendering has a positive effect regarding perceived user performance.
In all network setups, the first meaningful paint was lower when Server Side Rendering was enabled.
The CSR variants show downsides in user experience regarding responsiveness.
This is revealed by the gap between TTI and FCP and an increased Max Potential First Input Delay. 
This effect was observed for the SSR variants as well, but only for the Slow 3G setup.
On fast network connections, CSR setups offer the benefit of a low FCP. 
This has the effect that the user is shown some elements of the page very quickly although the main contents are not visible yet.
The difference between this low FCP for CSR setups and the FCP (= FMP) for the respective SSR setup is just under 200ms for each framework.
Moving towards slower connections, this effects fades. 
For the Slow 3G setup, the FMP of the SSR setup for Angular and React is even lower than the FCP for the relevant CSR setup.
This means the the SSR versions are able to display the full content before the CSR variant shows anything.

Among the different JavaScript frameworks, the differences in performance were not significant.
It is notable that Angular CSR performed comparably bad in the second setup (Cloudfront, no network throttling) and showed a deviation from the typical rendering flow for CSR apps.
NextJS seems to have the best overall performance (best or joint best in FMP, TTI and MP FID in the first three setups) but it was outperformed by React SSR in the Slow 3G setups.
Vue revealed a significantly low difference between FMP for CSR and SSR in the Slow 3G setup. 

For further tests it would be interesting to see how the numbers change when sub pages with different contents (images, videos, iframes) and more interactivity are visited.  
For our blog implementation, the impact of the cache seems negligible user performance wise.

The tests also reveal that Server Side Rendering provides improvements regarding bot performance.
The fact that the intitial response is contentful and the sharing preview is individual for each sub page represent advantages.
The TTFB has proved to be slightly worse in the SSR setups.
This can be bypassed by using setting up a http cache.

<hr/>

<a name="ref-1">[1]</a> [High Performance Browser Netowrking: Mobile Networks](https://hpbn.co/mobile-networks)  
<a name="ref-2">[2]</a> The values were selected after consulting [[1]](#ref-1). The article contains a table which lists bounds for 3G (among others) data rates and latency. For both setups, values near the upper / lower edge of the stated scala were picked.
<a name="ref-3">[3]</a> [Amazon Cloudfront](https://aws.amazon.com/cloudfront/)     
