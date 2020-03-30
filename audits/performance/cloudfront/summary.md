## Throttling: none
| Implementation | TTFB | FCP   | FMP   | TTI   | MP FID | CIR | ISP |
| -------------- | ---- | ----- | ----- | ----- | ------ | --- | --- |
| Angular CSR    | 9ms  | 788ms | 788ms | 788ms | 16ms   |     |     |
| Angular SSR    | 12ms | 719ms | 719ms | 719ms | 16ms   |     |     |
| React CSR      | 10ms | 414ms | 633ms | 607ms | 144ms  |     |     |
| React SSR      | 8ms  | 627ms | 627ms | 627ms | 16ms   |     |     |
| Next           | 10ms | 568ms | 568ms | 568ms | 16ms   |     |     |
| Vue CSR        | 9ms  | 443ms | 644ms | 628ms | 152ms  |     |     |
| Vue SSR        | 9ms  | 617ms | 617ms | 617ms | 16ms   |     |     |

## Throttling: fast3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 129ms | 1148ms | 1148ms | 1148ms | 16ms   |     |     |
| Angular SSR    | 131ms | 1017ms | 1017ms | 1017ms | 16ms   |     |     |
| React CSR      | 131ms | 781ms  | 1133ms | 1114ms | 150ms  |     |     |
| React SSR      | 130ms | 921ms  | 921ms  | 921ms  | 16ms   |     |     |
| Next           | 134ms | 984ms  | 984ms  | 984ms  | 16ms   |     |     |
| Vue CSR        | 132ms | 813ms  | 1015ms | 994ms  | 135ms  |     |     |
| Vue SSR        | 131ms | 1002ms | 1002ms | 1002ms | 16ms   |     |     |

## Throttling: slow3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 391ms | 2089ms | 2706ms | 2696ms | 134ms  |     |     |
| Angular SSR    | 403ms | 1745ms | 1745ms | 2087ms | 201ms  |     |     |
| React CSR      | 390ms | 1912ms | 2615ms | 2603ms | 138ms  |     |     |
| React SSR      | 392ms | 1771ms | 1771ms | 1876ms | 106ms  |     |     |
| Next           | 400ms | 1864ms | 1864ms | 1995ms | 128ms  |     |     |
| Vue CSR        | 386ms | 1817ms | 2352ms | 2337ms | 138ms  |     |     |
| Vue SSR        | 385ms | 2006ms | 2006ms | 2170ms | 166ms  |     |     |
