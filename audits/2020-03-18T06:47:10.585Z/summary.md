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