# Alias Shrink Follow-Up

## Aggregate

| variant | mean state NLL | mean pred-y NLL | mean cov90 | min cov90 | mean var ratio | max var ratio |
|---|---:|---:|---:|---:|---:|---:|
| k4_component_baseline | 2.787505 | 0.522798 | 0.906386 | 0.886149 | 1.057096 | 1.153190 |
| shrink0p9 | 2.794042 | 0.515595 | 0.864610 | 0.764893 | 0.884503 | 1.054112 |
| shrink0p85 | 2.796066 | 0.516487 | 0.862820 | 0.760498 | 0.879307 | 1.047832 |
| k5_full_weight | 2.803440 | 0.524354 | 0.960802 | 0.951091 | 1.707011 | 2.178968 |
| shrink0p95 | 2.818138 | 0.515596 | 0.869005 | 0.772380 | 0.888388 | 1.082455 |

## Per Pattern

| variant | x pattern | state NLL | pred-y NLL | cov90 | var ratio |
|---|---|---:|---:|---:|---:|
| shrink0p85 | intermittent_sinusoidal | 2.757886 | 0.383787 | 0.912679 | 1.013147 |
| shrink0p9 | intermittent_sinusoidal | 2.758564 | 0.383791 | 0.913086 | 1.016610 |
| shrink0p95 | intermittent_sinusoidal | 2.760494 | 0.383809 | 0.916016 | 1.044760 |
| k5_full_weight | intermittent_sinusoidal | 2.786051 | 0.383725 | 0.951091 | 1.463762 |
| k4_component_baseline | intermittent_sinusoidal | 2.786885 | 0.384700 | 0.916504 | 1.121537 |
| k4_component_baseline | random_normal | 2.780498 | 0.852672 | 0.886149 | 0.896560 |
| k5_full_weight | random_normal | 2.835946 | 0.858119 | 0.979329 | 2.178968 |
| shrink0p9 | random_normal | 2.855084 | 0.832043 | 0.764893 | 0.582786 |
| shrink0p85 | random_normal | 2.861682 | 0.834718 | 0.760498 | 0.576943 |
| shrink0p95 | random_normal | 2.922733 | 0.832046 | 0.772380 | 0.537950 |
| shrink0p9 | weak_sinusoidal | 2.768477 | 0.330951 | 0.915853 | 1.054112 |
| shrink0p85 | weak_sinusoidal | 2.768629 | 0.330955 | 0.915283 | 1.047832 |
| shrink0p95 | weak_sinusoidal | 2.771189 | 0.330932 | 0.918620 | 1.082455 |
| k5_full_weight | weak_sinusoidal | 2.788323 | 0.331218 | 0.951986 | 1.478304 |
| k4_component_baseline | weak_sinusoidal | 2.795133 | 0.331022 | 0.916504 | 1.153190 |
