# Component Stability Follow-Up

## Aggregate

| variant | mean state NLL | mean pred-y NLL | mean cov90 | min cov90 | mean var ratio | max var ratio |
|---|---:|---:|---:|---:|---:|---:|
| k4_component_baseline | 2.787505 | 0.522798 | 0.906386 | 0.886149 | 1.057096 | 1.153190 |
| shrink0p9_stab0p03 | 2.793952 | 0.515567 | 0.864692 | 0.765137 | 0.884604 | 1.054108 |
| shrink0p9_stab0p01 | 2.794017 | 0.515588 | 0.864638 | 0.764974 | 0.884525 | 1.054111 |
| shrink0p9 | 2.794042 | 0.515595 | 0.864610 | 0.764893 | 0.884503 | 1.054112 |
| stab0p1 | 2.798732 | 0.523812 | 0.961860 | 0.951172 | 1.729154 | 2.245549 |
| stab0p01 | 2.803021 | 0.524344 | 0.960802 | 0.951091 | 1.704413 | 2.171189 |
| k5_full_weight | 2.803440 | 0.524354 | 0.960802 | 0.951091 | 1.707011 | 2.178968 |
| stab0p03 | 2.816405 | 0.525884 | 0.960829 | 0.951091 | 1.728776 | 2.244309 |

## Per Pattern

| variant | x pattern | state NLL | pred-y NLL | cov90 | var ratio |
|---|---|---:|---:|---:|---:|
| shrink0p9 | intermittent_sinusoidal | 2.758564 | 0.383791 | 0.913086 | 1.016610 |
| shrink0p9_stab0p01 | intermittent_sinusoidal | 2.758564 | 0.383791 | 0.913086 | 1.016618 |
| shrink0p9_stab0p03 | intermittent_sinusoidal | 2.758565 | 0.383791 | 0.913086 | 1.016635 |
| stab0p1 | intermittent_sinusoidal | 2.786050 | 0.383725 | 0.951172 | 1.463711 |
| stab0p03 | intermittent_sinusoidal | 2.786051 | 0.383725 | 0.951091 | 1.463747 |
| stab0p01 | intermittent_sinusoidal | 2.786051 | 0.383725 | 0.951091 | 1.463757 |
| k5_full_weight | intermittent_sinusoidal | 2.786051 | 0.383725 | 0.951091 | 1.463762 |
| k4_component_baseline | intermittent_sinusoidal | 2.786885 | 0.384700 | 0.916504 | 1.121537 |
| k4_component_baseline | random_normal | 2.780498 | 0.852672 | 0.886149 | 0.896560 |
| stab0p1 | random_normal | 2.821854 | 0.856494 | 0.982422 | 2.245549 |
| stab0p01 | random_normal | 2.834692 | 0.858087 | 0.979329 | 2.171189 |
| k5_full_weight | random_normal | 2.835946 | 0.858119 | 0.979329 | 2.178968 |
| shrink0p9_stab0p03 | random_normal | 2.854815 | 0.831960 | 0.765137 | 0.583068 |
| shrink0p9_stab0p01 | random_normal | 2.855010 | 0.832022 | 0.764974 | 0.582847 |
| shrink0p9 | random_normal | 2.855084 | 0.832043 | 0.764893 | 0.582786 |
| stab0p03 | random_normal | 2.874852 | 0.862707 | 0.979411 | 2.244309 |
| shrink0p9_stab0p03 | weak_sinusoidal | 2.768474 | 0.330951 | 0.915853 | 1.054108 |
| shrink0p9_stab0p01 | weak_sinusoidal | 2.768476 | 0.330951 | 0.915853 | 1.054111 |
| shrink0p9 | weak_sinusoidal | 2.768477 | 0.330951 | 0.915853 | 1.054112 |
| stab0p1 | weak_sinusoidal | 2.788292 | 0.331217 | 0.951986 | 1.478201 |
| stab0p03 | weak_sinusoidal | 2.788313 | 0.331218 | 0.951986 | 1.478273 |
| stab0p01 | weak_sinusoidal | 2.788320 | 0.331218 | 0.951986 | 1.478294 |
| k5_full_weight | weak_sinusoidal | 2.788323 | 0.331218 | 0.951986 | 1.478304 |
| k4_component_baseline | weak_sinusoidal | 2.795133 | 0.331022 | 0.916504 | 1.153190 |
