## Throttling: none
| Implementation | TTFB | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ---- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 18ms | 624ms  | 1092ms | 1073ms | 401ms  |     |     |
| Angular SSR    | 52ms | 1041ms | 1041ms | 1041ms | 16ms   |     |     |
| React CSR      | 18ms | 453ms  | 940ms  | 912ms  | 405ms  |     |     |
| React SSR      | 42ms | 869ms  | 869ms  | 869ms  | 16ms   |     |     |
| Next           | 52ms | 870ms  | 870ms  | 870ms  | 16ms   |     |     |
| Vue CSR        | 17ms | 622ms  | 1068ms | 1045ms | 407ms  |     |     |
| Vue SSR        | 40ms | 997ms  | 997ms  | 997ms  | 16ms   |     |     |

## Throttling: fast3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 128ms | 928ms  | 1408ms | 1375ms | 399ms  |     |     |
| Angular SSR    | 128ms | 1293ms | 1293ms | 1293ms | 16ms   |     |     |
| React CSR      | 129ms | 829ms  | 1441ms | 1410ms | 357ms  |     |     |
| React SSR      | 129ms | 1190ms | 1190ms | 1190ms | 16ms   |     |     |
| Next           | 131ms | 1103ms | 1103ms | 1103ms | 16ms   |     |     |
| Vue CSR        | 133ms | 978ms  | 1430ms | 1413ms | 351ms  |     |     |
| Vue SSR        | 131ms | 1135ms | 1135ms | 1736ms | 252ms  |     |     |

## Throttling: slow3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 393ms | 2121ms | 2973ms | 2944ms | 357ms  |     |     |
| Angular SSR    | 386ms | 2081ms | 2081ms | 2309ms | 197ms  |     |     |
| React CSR      | 394ms | 1916ms | 2831ms | 2815ms | 355ms  |     |     |
| React SSR      | 385ms | 2049ms | 2049ms | 2130ms | 87ms   |     |     |
| Next           | 391ms | 2147ms | 2147ms | 2269ms | 126ms  |     |     |
| Vue CSR        | 385ms | 2630ms | 3420ms | 3387ms | 357ms  |     |     |
| Vue SSR        | 386ms | 2124ms | 2124ms | 7191ms | 224ms  |     |     |