# Measurement Results

To compare the performance of the different blog implementations, they were tested regarding the [metrics](./metrics) which were selected before.

The tests were run using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse).
To be able to run a larger number of these tests in the same setups, they were started programmatically.
A few different test setups were created. Each test was run 11 times and the median value (based on sorting by FMP) was selected as the result.

The test setups include three types of throttling presets.

* none: No request latency, no limit for download and upload throughput
* Fast 3G: 128ms request latency, 4096kbps download throughput, 1024kbps upload throughput
* Slow 3G: 384ms request latency, 768kbps download throughput, 64kbps upload throughput 

Lighthouse also allows settings a `cpuSlowdownMultiplier` which throttles the power of the CPU. This was set to the factor `4` for all setups.
The tests were run on a MacBook Pro (2019) with 2.8 GHz Intel Core i7 CPU, 16 GB 2133 MHz LPDDR3 RAM and Intel Iris Plus Graphics 655 1536 MB.
 
To showcase the impact of the Cloudfront cache, all tests were also run against the cache-enabled version (cloudflont) and the non-cached version (lb) of the applications. 

The tests regarding Contentful Initial Request (CIR) and Individual Sharing Preview (ISP) were only run once and copied over because their results are independent from the chosen test setup.     


## Throttling: none
| Implementation | TTFB | FCP   | FMP   | TTI   | MP FID | CIR | ISP |
| -------------- | ---- | ----- | ----- | ----- | ------ | --- | --- |
| Angular CSR    | 9ms  | 762ms | 762ms | 762ms | 16ms   |     |     |
| Angular SSR    | 11ms | 727ms | 727ms | 727ms | 16ms   |     |     |
| React CSR      | 12ms | 462ms | 679ms | 672ms | 140ms  |     |     |
| React SSR      | 8ms  | 703ms | 703ms | 703ms | 16ms   |     |     |
| Next           | 56ms | 632ms | 632ms | 632ms | 16ms   |     |     |
| Vue CSR        | 8ms  | 454ms | 655ms | 637ms | 150ms  |     |     |
| Vue SSR        | 9ms  | 649ms | 649ms | 649ms | 16ms   |     |     |

## Throttling: fast3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 130ms | 883ms  | 1089ms | 1081ms | 144ms  |     |     |
| Angular SSR    | 132ms | 1034ms | 1034ms | 1034ms | 16ms   |     |     |
| React CSR      | 130ms | 882ms  | 1316ms | 1292ms | 161ms  |     |     |
| React SSR      | 129ms | 971ms  | 971ms  | 971ms  | 16ms   |     |     |
| Next           | 130ms | 833ms  | 833ms  | 833ms  | 16ms   |     |     |
| Vue CSR        | 130ms | 834ms  | 1041ms | 1020ms | 134ms  |     |     |
| Vue SSR        | 132ms | 1018ms | 1018ms | 1018ms | 16ms   |     |     |

## Throttling: slow3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 399ms | 2105ms | 2740ms | 2717ms | 146ms  |     |     |
| Angular SSR    | 402ms | 1826ms | 1826ms | 2074ms | 202ms  |     |     |
| React CSR      | 388ms | 1932ms | 2623ms | 2612ms | 138ms  |     |     |
| React SSR      | 393ms | 1784ms | 1784ms | 1873ms | 90ms   |     |     |
| Next           | 388ms | 1874ms | 1874ms | 2006ms | 129ms  |     |     |
| Vue CSR        | 395ms | 1862ms | 2409ms | 2403ms | 164ms  |     |     |
| Vue SSR        | 388ms | 2098ms | 2098ms | 2303ms | 207ms  |     |     |


// OLD TESTS

## 1st setup

Network Throttling: 384 ms HTTP RTT, 768 Kbps down, 64 Kbps up   
Server Cache: On  
Contents: Text Only
CPU Slowdown: 4

| Implementation | TTFB  | FCP    | FMP    | Max potential FIP | TTI    | CIR | ISP |
|----------------|-------|--------|--------|-------------------|--------|-----|-----|
| Angular CSR    | 395ms | 2086ms | 2713ms | 157ms             | 2707ms | no  | no  |
| Angular SSR    | 391ms | 1840ms | 1840ms | 241ms             | 2190ms | yes | yes |
| React CSR      | 393ms | 1951ms | 2677ms | 164ms             | 2662ms | no  | no  |
| React SSR      | 394ms | 1898ms | 1898ms | 114ms             | 2007ms | yes | yes |
| Next SSR       | 388ms | 1906ms | 1907ms | 16ms              | 2082ms | yes | yes |
| Vue CSR        | 392ms | 1849ms | 2397ms | 152ms             | 2388ms | no  | no  |
| Vue SSR        | 392ms | 2033ms | 2033ms | 177ms             | 2200ms | yes | yes |

Observations:
* Next is the only with no high FIP
* CSR implementations have a difference in FMP and FCP because data is loaded async
* CSR implementations have a higher FCP because they first need to download their client bundle 

## 2nd setup

Network Throttling: 128 ms HTTP RTT, 4096 Kbps down, 1024 Kbps up   
Server Cache: On  
Contents: Text Only
CPU Slowdown: 4

| Implementation | TTFB  | FCP    | FMP    | Max potential FIP | TTI    | CIR | ISP |
|----------------|-------|--------|--------|-------------------|--------|-----|-----|
| Angular CSR    | 130ms | 873ms  | 1118ms | 153ms             | 1444ms | no  | no  |
| Angular SSR    | 130ms | 1061ms | 1061ms | 16ms              | 1061ms | yes | yes |
| React CSR      | 130ms | 810ms  | 1203ms | 163ms             | 1189ms | no  | no  |
| React SSR      | 131ms | 955ms  | 955ms  | 16ms              | 955ms  | yes | yes |
| Next SSR       | 130ms | 863ms  | 863ms  | 16ms              | 863ms  | yes | yes |
| Vue CSR        | 129ms | 841ms  | 1092ms | 172ms             | 1087ms | no  | no  |
| Vue SSR        | 130ms | 1181ms | 1181ms | 16ms              | 1181ms | yes | yes |

Observations:
* CSR implementations have a high Max potemtial FIP
* In some cases, CSR FMP is quicker than SSR FMP (AND SSR FCP)

## 3rd setup

Network Throttling: 384 ms HTTP RTT, 768 Kbps down, 64 Kbps up   
Server Cache: On  
Contents: Text and Images
CPU Slowdown: 4

| Implementation | TTFB  | FCP    | FMP    | Max potential FIP | TTI    | CIR | ISP |
|----------------|-------|--------|--------|-------------------|--------|-----|-----|
| Angular CSR    | 388ms | 2095ms | 2736ms | 139ms             | 2721ms | no  | no  |
| Angular SSR    | 390ms | 1989ms | 1989ms | 212ms             | 3516ms | yes | yes |
| React CSR      | 390ms | 2850ms | 2564ms | 145ms             | 2548ms | no  | no  |
| React SSR      | 391ms | 2030ms | 2030ms | 241ms             | 2943ms | yes | yes |
| Next SSR       | 392ms | 2029ms | 2029ms | 160ms             | 2807ms | yes | yes |
| Vue CSR        | 390ms | 1861ms | 2392ms | 140ms             | 2372ms | no  | no  |
| Vue SSR        | 392ms | 1868ms | 1868ms | 160ms             | 2683ms | yes | yes |

## 4th setup

Network Throttling: 128 ms HTTP RTT, 4096 Kbps down, 1024 Kbps up   
Server Cache: On  
Contents: Text and Images
CPU Slowdown: 4

| Implementation | TTFB  | FCP   | FMP    | Max potential FIP | TTI    | CIR | ISP |
|----------------|-------|-------|--------|-------------------|--------|-----|-----|
| Angular CSR    | 130ms | 937ms | 1239ms | 143ms             | 1138ms | no  | no  |
| Angular SSR    | 130ms | 899ms | 899ms  | 212ms             | 1154ms | yes | yes |
| React CSR      | 130ms | 820ms | 1185ms | 137ms             | 1171ms | no  | no  |
| React SSR      | 130ms | 898ms | 898ms  | 150ms             | 950ms  | yes | yes |
| Next SSR       | 130ms | 842ms | 842ms  | 16ms              | 947ms  | yes | yes |
| Vue CSR        | 130ms | 860ms | 1150ms | 166ms             | 1138ms | no  | no  |
| Vue SSR        | 130ms | 901ms | 901ms  | 174ms             | 1118ms | yes | yes |

## 5th setup

Network Throttling: none   
Server Cache: Off  
Contents: Text
CPU Slowdown: 4

| Implementation | TTFB | FCP   | FMP   | Max potential FIP | TTI   | CIR | ISP |
|----------------|------|-------|-------|-------------------|-------|-----|-----|
| Angular CSR    | 20ms | 703ms | 852ms | 156ms             | 852ms | no  | no  |
| Angular SSR    | 48ms | 850ms | 850ms | 16ms              | 824ms | yes | yes |
| React CSR      | 19ms | 529ms | 762ms | 155ms             | 753ms | no  | no  |
| React SSR      | 47ms | 691ms | 691ms | 16ms              | 691ms | yes | yes |
| Next SSR       | 30ms | 622ms | 622ms | 16ms              | 622ms | yes | yes |
| Vue CSR        | 18ms | 507ms | 712ms | 155ms             | 703ms | no  | no  |
| Vue SSR        | 34ms | 713ms | 713ms | 16ms              | 713ms | yes | yes |

## 6th setup

Network Throttling: none   
Server Cache: On  
Contents: Text
CPU Slowdown: 4

// EVEN OLDER TESTS

## 1st setup

Network Throttling: 562.5 ms HTTP RTT, 1,474.6 Kbps down, 675 Kbps up   
Server Cache: On  
Contents: Text Only

| Implementation | TTFB  | FCP    | FMP    | Max potential FIP | TTI    | CIR | ISP |
|----------------|-------|--------|--------|-------------------|--------|-----|-----|
| Angular CSR    | 570ms | 1959ms | 2556ms | 28ms              | 1959ms | no  | no  |
| Angular SSR    | 584ms | 2002ms | 2002ms | 16ms              | 2002ms | yes | yes |
| React CSR      | 578ms | 2001ms | 2665ms | 16ms              | 2001ms | no  | no  |
| React SSR      | 589ms | 2077ms | 2077ms | 16ms              | 2077ms | yes | yes |
| Next SSR       | 598ms | 1989ms | 1989ms | 16ms              | 1989ms | yes | yes |
| Vue CSR        | 571ms | 2017ms | 2650ms | 16ms              | 2017ms | no  | no  |
| Vue SSR        | 687ms | 2189ms | 2189ms | 16ms              | 2190ms | yes | yes |

https://hpbn.co/mobile-networks/
