# Linear-Gaussian VBF Modernization Final Report

## Executive Summary

- The scalar linear-Gaussian benchmark now has exact Kalman, frozen-marginal, supervised, and ELBO baselines with matched metrics.
- Frozen marginal backward learning is the strongest control: it preserves exact filtering while testing learned edge/backward conditionals.
- Self-fed supervised filtering is the strongest learned baseline. Oracle-variance calibration penalties are useful diagnostics: low-observation calibration works for weak observability, while regime-local calibration is better for randomized Q/R.
- Vanilla MC ELBO is the true unsupervised baseline and is consistently under-dispersed in weak-observation and Q/R-mismatch regimes. Oracle-calibrated ELBO fixes the catastrophic cases, showing that variance calibration is the bottleneck, but those rows are diagnostic rather than fully unsupervised.
- Direct non-residualized ELBO remains much weaker in this scalar benchmark, so claims should distinguish residualized/analytic-update models from learned-from-scratch filters.

## Recommended Default Rows

| Suite | Rows |
|---|---|
| Weak observability | exact Kalman; frozen marginal; self-fed + oracle variance calibration; vanilla MC ELBO; oracle-variance-calibrated MC ELBO |
| Randomized Q/R | frozen marginal; regime-local self-fed; oracle regime-variance-calibrated MC ELBO |
| Fixed Q/R transfer | frozen marginal; self-fed + oracle variance calibration; oracle-calibrated MC ELBO as supporting evidence |

## Weak Observability

| Pattern | Model | state NLL | cov 90 | var ratio | pred NLL |
|---|---|---:|---:|---:|---:|
| sinusoidal_reference | exact Kalman | 0.401983 | 0.900220 | 1.000000 | 0.600858 |
| sinusoidal_reference | frozen marginal backward MLP | 0.401983 | 0.900220 | 1.000006 | 0.600858 |
| sinusoidal_reference | self-fed supervised + oracle variance calibration | 0.415025 | 0.898189 | 1.013291 | 0.607679 |
| sinusoidal_reference | MC ELBO structured | 0.492098 | 0.849060 | 0.662955 | 0.622721 |
| sinusoidal_reference | oracle-variance-calibrated MC ELBO | 0.438505 | 0.893258 | 0.998726 | 0.615828 |
| weak_sinusoidal | exact Kalman | 1.175155 | 0.899137 | 1.000000 | 0.363894 |
| weak_sinusoidal | frozen marginal backward MLP | 1.175155 | 0.899137 | 1.000005 | 0.363894 |
| weak_sinusoidal | self-fed supervised + oracle variance calibration | 1.184098 | 0.896826 | 0.999368 | 0.366838 |
| weak_sinusoidal | MC ELBO structured | 1.291485 | 0.813155 | 0.668404 | 0.377645 |
| weak_sinusoidal | oracle-variance-calibrated MC ELBO | 1.216600 | 0.881791 | 0.967360 | 0.373358 |
| intermittent_sinusoidal | exact Kalman | 0.911865 | 0.899402 | 1.000000 | 0.431967 |
| intermittent_sinusoidal | frozen marginal backward MLP | 0.911865 | 0.899402 | 1.000005 | 0.431967 |
| intermittent_sinusoidal | self-fed supervised + oracle variance calibration | 0.912915 | 0.899064 | 1.002485 | 0.432007 |
| intermittent_sinusoidal | MC ELBO structured | 0.947600 | 0.865519 | 0.892053 | 0.435886 |
| intermittent_sinusoidal | oracle-variance-calibrated MC ELBO | 0.929798 | 0.892521 | 0.989241 | 0.433509 |
| zero_unobservable | exact Kalman | 2.740063 | 0.904118 | 1.000000 | 0.268452 |
| zero_unobservable | frozen marginal backward MLP | 2.740063 | 0.904118 | 1.000003 | 0.268452 |
| zero_unobservable | self-fed supervised + oracle variance calibration | 2.742646 | 0.911780 | 1.055466 | 0.268452 |
| zero_unobservable | MC ELBO structured | 7.010386 | 0.391683 | 0.108259 | 0.268452 |
| zero_unobservable | oracle-variance-calibrated MC ELBO | 2.740240 | 0.905575 | 1.004223 | 0.268452 |
| random_normal | exact Kalman | 0.218954 | 0.897559 | 1.000000 | 0.693509 |
| random_normal | frozen marginal backward MLP | 0.218954 | 0.897563 | 1.000013 | 0.693509 |
| random_normal | self-fed supervised + oracle variance calibration | 0.223558 | 0.896183 | 0.989436 | 0.694443 |
| random_normal | MC ELBO structured | 0.306598 | 0.847164 | 0.776662 | 0.711019 |
| random_normal | oracle-variance-calibrated MC ELBO | 0.272531 | 0.889945 | 0.972512 | 0.707264 |

Weak-observability conclusion: oracle-variance-calibrated MC ELBO removes the severe vanilla ELBO under-dispersion, including the zero-observation failure, but self-fed supervision with oracle variance calibration remains better in observed regimes.

## Randomized Q/R Generalization

| eval Q | eval R | Model | state NLL | cov 90 | var ratio | pred NLL |
|---:|---:|---|---:|---:|---:|---:|
| 0.03 | 0.03 | frozen marginal backward MLP | -0.192878 | 0.900346 | 1.000011 | 0.004960 |
| 0.03 | 0.03 | regime-local self-fed supervised | -0.168295 | 0.895707 | 1.015044 | 0.018927 |
| 0.03 | 0.03 | oracle regime-variance-calibrated MC ELBO | -0.051062 | 0.861226 | 1.011369 | 0.069179 |
| 0.03 | 0.3 | frozen marginal backward MLP | 0.461248 | 0.899919 | 1.000011 | 0.941608 |
| 0.03 | 0.3 | regime-local self-fed supervised | 0.474714 | 0.900415 | 1.005023 | 0.947430 |
| 0.03 | 0.3 | oracle regime-variance-calibrated MC ELBO | 0.553383 | 0.849805 | 0.972514 | 0.965394 |
| 0.1 | 0.1 | frozen marginal backward MLP | 0.401983 | 0.900220 | 1.000006 | 0.600858 |
| 0.1 | 0.1 | regime-local self-fed supervised | 0.416249 | 0.894421 | 0.999319 | 0.607951 |
| 0.1 | 0.1 | oracle regime-variance-calibrated MC ELBO | 0.461048 | 0.880180 | 0.989530 | 0.625405 |
| 0.3 | 0.03 | frozen marginal backward MLP | 0.133134 | 0.900175 | 1.000005 | 0.530738 |
| 0.3 | 0.03 | regime-local self-fed supervised | 0.146506 | 0.894499 | 1.010729 | 0.536225 |
| 0.3 | 0.03 | oracle regime-variance-calibrated MC ELBO | 0.180429 | 0.903296 | 0.990049 | 0.546888 |
| 0.3 | 0.3 | frozen marginal backward MLP | 0.943551 | 0.900334 | 1.000003 | 1.144913 |
| 0.3 | 0.3 | regime-local self-fed supervised | 0.957915 | 0.892554 | 0.992193 | 1.150463 |
| 0.3 | 0.3 | oracle regime-variance-calibrated MC ELBO | 0.980429 | 0.894177 | 0.998269 | 1.157446 |

Randomized-Q/R conclusion: conditioning the learned components on `log Q` and `log R` works. Regime-local self-fed is the best learned baseline, and oracle regime-variance-calibrated ELBO is the strongest Q/R calibration diagnostic.

## Fixed-Q/R Transfer Pilot

| train Q | train R | eval Q | eval R | Model | state NLL | cov 90 | var ratio | pred NLL |
|---:|---:|---:|---:|---|---:|---:|---:|---:|
| 0.1 | 0.1 | 0.03 | 0.03 | frozen marginal backward MLP | -0.190343 | 0.899828 | 1.000011 | 0.002321 |
| 0.1 | 0.1 | 0.03 | 0.03 | oracle-variance-calibrated MC ELBO | -0.095235 | 0.877367 | 0.934506 | 0.047272 |
| 0.1 | 0.1 | 0.03 | 0.03 | self-fed supervised + oracle variance calibration | -0.161138 | 0.887953 | 1.087920 | 0.015010 |
| 0.1 | 0.1 | 0.03 | 0.3 | frozen marginal backward MLP | 0.464039 | 0.899482 | 1.000011 | 0.938904 |
| 0.1 | 0.1 | 0.03 | 0.3 | oracle-variance-calibrated MC ELBO | 0.512179 | 0.895318 | 1.020082 | 0.954032 |
| 0.1 | 0.1 | 0.03 | 0.3 | self-fed supervised + oracle variance calibration | 0.593053 | 0.830397 | 1.150105 | 0.956352 |
| 0.1 | 0.1 | 0.1 | 0.1 | frozen marginal backward MLP | 0.404516 | 0.899624 | 1.000006 | 0.598216 |
| 0.1 | 0.1 | 0.1 | 0.1 | oracle-variance-calibrated MC ELBO | 0.467544 | 0.885980 | 0.993896 | 0.624217 |
| 0.1 | 0.1 | 0.1 | 0.1 | self-fed supervised + oracle variance calibration | 0.423695 | 0.894504 | 1.054077 | 0.607364 |
| 0.1 | 0.1 | 0.3 | 0.03 | frozen marginal backward MLP | 0.133580 | 0.900214 | 1.000005 | 0.529122 |
| 0.1 | 0.1 | 0.3 | 0.03 | oracle-variance-calibrated MC ELBO | 0.275187 | 0.875414 | 0.976359 | 0.571441 |
| 0.1 | 0.1 | 0.3 | 0.03 | self-fed supervised + oracle variance calibration | 0.223549 | 0.883124 | 1.053232 | 0.551381 |
| 0.1 | 0.1 | 0.3 | 0.3 | frozen marginal backward MLP | 0.946073 | 0.899767 | 1.000003 | 1.142270 |
| 0.1 | 0.1 | 0.3 | 0.3 | oracle-variance-calibrated MC ELBO | 1.008251 | 0.891378 | 1.048407 | 1.162292 |
| 0.1 | 0.1 | 0.3 | 0.3 | self-fed supervised + oracle variance calibration | 0.995222 | 0.901564 | 1.226342 | 1.157989 |

Fixed-Q/R conclusion: fixed-regime transfer is useful as a diagnostic but is not the preferred final setting. True randomized-Q/R conditioning gives much more stable learned edge generalization.

## Final Recommendation

Use the scalar linear-Gaussian benchmark as a calibrated reporting suite before moving to nonlinear observations or larger sequence models. The report-ready baseline set is frozen marginal, self-fed supervised, vanilla MC ELBO, and oracle-calibrated diagnostics, with the calibration form matched to the stressor: low-observation time-local calibration for weak observability and regime-local calibration for randomized Q/R.

## Source Artifacts

- `outputs/linear_gaussian_weak_observability_canonical/summary.md`
- `outputs/linear_gaussian_random_qr_generalization_canonical/summary.md`
- `outputs/linear_gaussian_qr_generalization_pilot/`
