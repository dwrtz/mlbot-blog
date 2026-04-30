# Nonlinear K4 Pareto Promotion Report

This report compares the K4 spread state-density candidate, the K4 spread late predictive-y candidate, and the bootstrap particle-filter reference.

## Candidate Metrics

| Pattern | Row | seeds | state NLL | cov 90 | var ratio | pred-y NLL |
|---|---|---:|---:|---:|---:|---:|
| intermittent_sinusoidal | PF n512 reference | 3 | 3.140 | 0.847 | 0.865 | 0.348 |
| intermittent_sinusoidal | K4 spread state-density | 3 | 2.640 | 0.786 | 0.619 | 0.362 |
| intermittent_sinusoidal | K4 spread late pred-y | 3 | 2.643 | 0.780 | 0.609 | 0.361 |
| random_normal | PF n512 reference | 3 | 4.288 | 0.819 | 0.807 | 0.521 |
| random_normal | K4 spread state-density | 3 | 3.278 | 0.747 | 0.477 | 0.575 |
| random_normal | K4 spread late pred-y | 3 | 3.308 | 0.745 | 0.473 | 0.571 |
| sinusoidal | PF n512 reference | 3 | 3.300 | 0.845 | 0.847 | 0.452 |
| sinusoidal | K4 spread state-density | 3 | 3.163 | 0.830 | 0.619 | 0.514 |
| sinusoidal | K4 spread late pred-y | 3 | 3.185 | 0.832 | 0.617 | 0.510 |
| weak_sinusoidal | PF n512 reference | 3 | 2.946 | 0.844 | 0.899 | 0.303 |
| weak_sinusoidal | K4 spread state-density | 3 | 2.724 | 0.918 | 1.082 | 0.329 |
| weak_sinusoidal | K4 spread late pred-y | 3 | 2.727 | 0.910 | 1.053 | 0.328 |
| zero | PF n512 reference | 3 | 2.843 | 0.871 | 0.899 | 0.263 |
| zero | K4 spread state-density | 3 | 2.757 | 0.935 | 1.190 | 0.263 |
| zero | K4 spread late pred-y | 3 | 2.757 | 0.935 | 1.190 | 0.263 |

## Promotion Decision

`late pred-y` is marked as a secondary candidate when it improves pred-y and costs no more than 0.03 state NLL.

| Pattern | pred-y gain | state NLL cost | PF pred-y gap | recommendation |
|---|---:|---:|---:|---|
| intermittent_sinusoidal | 0.001 | 0.003 | 0.013 | late pred-y secondary |
| random_normal | 0.004 | 0.030 | 0.050 | late pred-y secondary |
| sinusoidal | 0.004 | 0.022 | 0.058 | late pred-y secondary |
| weak_sinusoidal | 0.001 | 0.002 | 0.026 | late pred-y secondary |
| zero | 0.000 | 0.000 | -0.000 | keep state candidate |

## Bottom Line

- The K4 spread state-density row remains the main promotion candidate.
- The late predictive-y row is useful as a secondary/Pareto row, but its pred-y gains are small relative to the PF reference gap.
- The next research step should target the predictive normalizer directly rather than adding another scalar predictive-y weight.
