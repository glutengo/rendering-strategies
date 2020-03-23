caching off ( => lb)

## Throttling: none
| Implementation | TTFB | FCP   | FMP   | TTI   | MP FID | CIR | ISP |
| -------------- | ---- | ----- | ----- | ----- | ------ | --- | --- |
| Angular CSR    | 20ms | 623ms | 823ms | 814ms | 148ms  |     |     |
| Angular SSR    | 44ms | 803ms | 803ms | 803ms | 16ms   |     |     |
| React CSR      | 19ms | 502ms | 786ms | 775ms | 198ms  |     |     |
| React SSR      | 37ms | 666ms | 666ms | 666ms | 16ms   |     |     |
| Next           | 36ms | 644ms | 644ms | 644ms | 16ms   |     |     |
| Vue CSR        | 18ms | 512ms | 729ms | 721ms | 170ms  |     |     |
| Vue SSR        | 38ms | 700ms | 700ms | 700ms | 16ms   |     |     |
