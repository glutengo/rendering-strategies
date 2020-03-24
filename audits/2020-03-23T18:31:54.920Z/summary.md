## Throttling: none
| Implementation | TTFB | FCP   | FMP   | TTI   | MP FID | CIR | ISP |
| -------------- | ---- | ----- | ----- | ----- | ------ | --- | --- |
| Angular CSR    | 21ms | 597ms | 797ms | 782ms | 145ms  |     |     |
| Angular SSR    | 45ms | 777ms | 777ms | 777ms | 16ms   |     |     |
| React CSR      | 18ms | 457ms | 675ms | 658ms | 144ms  |     |     |
| React SSR      | 38ms | 632ms | 632ms | 632ms | 16ms   |     |     |
| Next           | 39ms | 594ms | 594ms | 594ms | 16ms   |     |     |
| Vue CSR        | 20ms | 505ms | 689ms | 665ms | 143ms  |     |     |
| Vue SSR        | 40ms | 693ms | 693ms | 693ms | 16ms   |     |     |

## Throttling: fast3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 131ms | 867ms  | 1081ms | 1065ms | 148ms  |     |     |
| Angular SSR    | 131ms | 1025ms | 1025ms | 1025ms | 16ms   |     |     |
| React CSR      | 132ms | 809ms  | 1159ms | 1146ms | 138ms  |     |     |
| React SSR      | 129ms | 938ms  | 938ms  | 938ms  | 16ms   |     |     |
| Next           | 130ms | 835ms  | 835ms  | 835ms  | 16ms   |     |     |
| Vue CSR        | 129ms | 836ms  | 1035ms | 1026ms | 139ms  |     |     |
| Vue SSR        | 129ms | 864ms  | 864ms  | 1028ms | 165ms  |     |     |

## Throttling: slow3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 389ms | 2066ms | 2700ms | 2684ms | 136ms  |     |     |
| Angular SSR    | 393ms | 1728ms | 1728ms | 2032ms | 193ms  |     |     |
| React CSR      | 394ms | 1835ms | 2550ms | 2537ms | 138ms  |     |     |
| React SSR      | 394ms | 1803ms | 1803ms | 1900ms | 99ms   |     |     |
| Next           | 392ms | 1875ms | 1875ms | 2002ms | 123ms  |     |     |
| Vue CSR        | 400ms | 1829ms | 2384ms | 2378ms | 132ms  |     |     |
| Vue SSR        | 390ms | 1836ms | 1836ms | 2871ms | 155ms  |     |     |