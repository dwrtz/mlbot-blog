# Nonlinear Quadrature ADF / Power-EP Suite

These rows are deterministic reference-free baselines: they use only the known
transition, known observation model, and observed `x,y`, then project the
local tilted distribution back to a strict Gaussian or Gaussian mixture.

| x pattern | Model | components | power | state NLL | ref state NLL | cov 90 | var ratio | pred-y NLL | ref pred NLL |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.601793 | 2.691023 | 0.923584 | 1.533422 | 0.709700 | 0.457118 |
| sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 3.421934 | 2.691023 | 0.810791 | 0.604364 | 0.649797 | 0.457118 |
| sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.35 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 3.307080 | 2.691023 | 0.813395 | 0.601486 | 0.648968 | 0.457118 |
| sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.45 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.601793 | 2.691023 | 0.923584 | 1.533422 | 0.709700 | 0.457118 |
| weak_sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.749821 | 2.692361 | 0.967773 | 1.561591 | 0.333502 | 0.301245 |
| weak_sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.687297 | 2.692361 | 0.913493 | 0.997764 | 0.333511 | 0.301245 |
| weak_sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.35 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.687297 | 2.692361 | 0.913493 | 0.997764 | 0.333511 | 0.301245 |
| weak_sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.45 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.749821 | 2.692361 | 0.967773 | 1.561591 | 0.333502 | 0.301245 |
| intermittent_sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.738528 | 2.695039 | 0.962484 | 1.548910 | 0.392604 | 0.351468 |
| intermittent_sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.682626 | 2.695039 | 0.909098 | 0.993837 | 0.392533 | 0.351468 |
| intermittent_sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.35 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.682639 | 2.695039 | 0.909098 | 0.993837 | 0.392531 | 0.351468 |
| intermittent_sinusoidal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.45 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.738528 | 2.695039 | 0.962484 | 1.548910 | 0.392604 | 0.351468 |
| zero | reference-free quadrature prior-weighted alias-indexed Power-EP K5 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.757849 | 2.693317 | 0.968913 | 1.584653 | 0.259663 | 0.259663 |
| zero | reference-free quadrature prior-weighted alias-indexed Power-EP K5 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.695217 | 2.693317 | 0.916016 | 1.016344 | 0.259663 | 0.259663 |
| zero | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.35 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.695217 | 2.693317 | 0.916016 | 1.016344 | 0.259663 | 0.259663 |
| zero | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.45 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.757849 | 2.693317 | 0.968913 | 1.584653 | 0.259663 | 0.259663 |
| random_normal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.717083 | 2.697773 | 0.888102 | 2.010820 | 0.827241 | 0.529506 |
| random_normal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 3.751675 | 2.697773 | 0.805827 | 0.630618 | 0.746335 | 0.529506 |
| random_normal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.35 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 3.602845 | 2.697773 | 0.773844 | 0.613262 | 0.732406 | 0.529506 |
| random_normal | reference-free quadrature prior-weighted alias-indexed Power-EP K5 entropy>=0.45 shrink 0.85 alpha 0.5 spacing 2pi alpha=0.50 | 5 | 0.50 | 2.716269 | 2.697773 | 0.887126 | 2.009313 | 0.827035 | 0.529506 |
