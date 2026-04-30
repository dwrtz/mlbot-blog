# Nonlinear Quadrature ADF / Power-EP Suite

These rows are deterministic reference-free baselines: they use only the known
transition, known observation model, and observed `x,y`, then project the
local tilted distribution back to a strict Gaussian or Gaussian mixture.

| x pattern | Model | components | power | state NLL | ref state NLL | cov 90 | var ratio | pred-y NLL | ref pred NLL |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| sinusoidal | reference-free quadrature ADF Gaussian | 1 | 1.00 | 6.054099 | 2.691023 | 0.817546 | 1.098277 | 0.687358 | 0.457118 |
| sinusoidal | reference-free quadrature ADF K2 | 2 | 1.00 | 20.978921 | 2.691023 | 0.762207 | 0.524024 | 0.502116 | 0.457118 |
| sinusoidal | reference-free quadrature ADF K4 spread 2pi | 4 | 1.00 | 6.839985 | 2.691023 | 0.809408 | 0.877449 | 0.489497 | 0.457118 |
| sinusoidal | reference-free quadrature Power-EP K4 alpha 0.5 spread 2pi alpha=0.50 | 4 | 0.50 | 2.866602 | 2.691023 | 0.852620 | 0.876197 | 0.506078 | 0.457118 |
| weak_sinusoidal | reference-free quadrature ADF Gaussian | 1 | 1.00 | 2.749367 | 2.692361 | 0.905273 | 0.945751 | 0.332878 | 0.301245 |
| weak_sinusoidal | reference-free quadrature ADF K2 | 2 | 1.00 | 2.958450 | 2.692361 | 0.884115 | 0.938871 | 0.312388 | 0.301245 |
| weak_sinusoidal | reference-free quadrature ADF K4 spread 2pi | 4 | 1.00 | 2.648053 | 2.692361 | 0.919352 | 1.290849 | 0.314055 | 0.301245 |
| weak_sinusoidal | reference-free quadrature Power-EP K4 alpha 0.5 spread 2pi alpha=0.50 | 4 | 0.50 | 2.637562 | 2.692361 | 0.928060 | 1.215569 | 0.320576 | 0.301245 |
| intermittent_sinusoidal | reference-free quadrature ADF Gaussian | 1 | 1.00 | 2.768658 | 2.695039 | 0.886312 | 0.908330 | 0.390607 | 0.351468 |
| intermittent_sinusoidal | reference-free quadrature ADF K2 | 2 | 1.00 | 3.733279 | 2.695039 | 0.854736 | 0.791023 | 0.358784 | 0.351468 |
| intermittent_sinusoidal | reference-free quadrature ADF K4 spread 2pi | 4 | 1.00 | 2.674221 | 2.695039 | 0.903402 | 1.225335 | 0.356788 | 0.351468 |
| intermittent_sinusoidal | reference-free quadrature Power-EP K4 alpha 0.5 spread 2pi alpha=0.50 | 4 | 0.50 | 2.528341 | 2.695039 | 0.919922 | 1.162230 | 0.362396 | 0.351468 |
| zero | reference-free quadrature ADF Gaussian | 1 | 1.00 | 2.693344 | 2.693317 | 0.913900 | 1.000501 | 0.259663 | 0.259663 |
| zero | reference-free quadrature ADF K2 | 2 | 1.00 | 2.693476 | 2.693317 | 0.913900 | 1.000501 | 0.259663 | 0.259663 |
| zero | reference-free quadrature ADF K4 spread 2pi | 4 | 1.00 | 2.736383 | 2.693317 | 0.951904 | 1.369919 | 0.259663 | 0.259663 |
| zero | reference-free quadrature Power-EP K4 alpha 0.5 spread 2pi alpha=0.50 | 4 | 0.50 | 2.736383 | 2.693317 | 0.951904 | 1.369919 | 0.259663 | 0.259663 |
| random_normal | reference-free quadrature ADF Gaussian | 1 | 1.00 | 8.833866 | 2.697773 | 0.740153 | 3.651619 | 0.803609 | 0.529506 |
| random_normal | reference-free quadrature ADF K2 | 2 | 1.00 | 38.979881 | 2.697773 | 0.687988 | 0.407669 | 0.557264 | 0.529506 |
| random_normal | reference-free quadrature ADF K4 spread 2pi | 4 | 1.00 | 8.975737 | 2.697773 | 0.808838 | 0.755969 | 0.546472 | 0.529506 |
| random_normal | reference-free quadrature Power-EP K4 alpha 0.5 spread 2pi alpha=0.50 | 4 | 0.50 | 5.002086 | 2.697773 | 0.815348 | 0.863937 | 0.561492 | 0.529506 |
