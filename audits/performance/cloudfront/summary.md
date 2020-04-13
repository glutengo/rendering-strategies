## Throttling: none
| Implementation | TTFB | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ---- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 8ms  | 1025ms | 1025ms | 1025ms | 16ms   |     |     |
| Angular SSR    | 11ms | 997ms  | 997ms  | 997ms  | 16ms   |     |     |
| React CSR      | 14ms | 451ms  | 926ms  | 903ms  | 399ms  |     |     |
| React SSR      | 11ms | 849ms  | 849ms  | 849ms  | 16ms   |     |     |
| Next           | 11ms | 867ms  | 867ms  | 867ms  | 16ms   |     |     |
| Vue CSR        | 11ms | 573ms  | 1022ms | 1000ms | 404ms  |     |     |
| Vue SSR        | 10ms | 968ms  | 968ms  | 968ms  | 16ms   |     |     |

## Throttling: fast3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 132ms | 912ms  | 1396ms | 1358ms | 400ms  |     |     |
| Angular SSR    | 131ms | 1287ms | 1287ms | 1287ms | 16ms   |     |     |
| React CSR      | 132ms | 823ms  | 1451ms | 1419ms | 358ms  |     |     |
| React SSR      | 130ms | 1181ms | 1181ms | 1181ms | 16ms   |     |     |
| Next           | 132ms | 1101ms | 1101ms | 1101ms | 16ms   |     |     |
| Vue CSR        | 131ms | 957ms  | 1422ms | 1397ms | 403ms  |     |     |
| Vue SSR        | 129ms | 1124ms | 1124ms | 1366ms | 256ms  |     |     |

## Throttling: slow3G
| Implementation | TTFB  | FCP    | FMP    | TTI    | MP FID | CIR | ISP |
| -------------- | ----- | ------ | ------ | ------ | ------ | --- | --- |
| Angular CSR    | 395ms | 2138ms | 2968ms | 2952ms | 357ms  |     |     |
| Angular SSR    | 391ms | 2091ms | 2091ms | 2322ms | 201ms  |     |     |
| React CSR      | 395ms | 1852ms | 2814ms | 2782ms | 358ms  |     |     |
| React SSR      | 395ms | 2124ms | 2124ms | 2207ms | 92ms   |     |     |
| Next           | 398ms | 2155ms | 2155ms | 2277ms | 124ms  |     |     |
| Vue CSR        | 397ms | 2618ms | 3407ms | 3374ms | 361ms  |     |     |
| Vue SSR        | 397ms | 2146ms | 2146ms | 2567ms | 250ms  |     |     |