# Nonlinear Unsupervised Objective Final Report

## Executive Summary

- The best fully unsupervised nonlinear row is `structured_joint_elbo_h4_w005_predictive_y_masked_y_spans_h4`.
- It improves degraded-observation robustness relative to vanilla structured ELBO on weak, intermittent, zero, and random-normal stressors.
- It is not a solved nonlinear filter: clean sinusoidal performance is slightly worse than structured ELBO, and absolute coverage/variance calibration remains weak.
- Reference-distilled rows remain much stronger and should be reported only as upper-bound diagnostics, not unsupervised results.

## Final Claim

A combined short-horizon joint ELBO, causal predictive-y objective, and masked-y span training objective materially reduces the nonlinear strict-filter failure under weak, intermittent, and non-informative observations. The remaining gap to reference-distilled controls indicates that the next research step should focus on objective/divergence design or posterior expressivity, not more local ELBO tuning.

## Robustness Suite

| Pattern | Row | signal | state NLL | cov 90 | var ratio | pred NLL |
|---|---|---|---:|---:|---:|---:|
| intermittent_sinusoidal | direct reference moment distillation | reference_distilled | 2.774 | 0.838 | 0.667 | 0.397 |
| intermittent_sinusoidal | direct ELBO | unsupervised | 28.659 | 0.288 | 0.018 | 0.362 |
| intermittent_sinusoidal | joint h4 w0.05 + predictive-y + masked-y h4 | unsupervised | 22.992 | 0.371 | 0.060 | 0.382 |
| intermittent_sinusoidal | structured ELBO | unsupervised | 37.853 | 0.327 | 0.038 | 0.368 |
| random_normal | direct reference moment distillation | reference_distilled | 2.771 | 0.841 | 0.676 | 0.905 |
| random_normal | direct ELBO | unsupervised | 83.103 | 0.254 | 0.006 | 0.573 |
| random_normal | joint h4 w0.05 + predictive-y + masked-y h4 | unsupervised | 60.109 | 0.358 | 0.040 | 0.638 |
| random_normal | structured ELBO | unsupervised | 113.958 | 0.315 | 0.014 | 0.559 |
| sinusoidal | direct reference moment distillation | reference_distilled | 2.773 | 0.839 | 0.674 | 0.809 |
| sinusoidal | direct ELBO | unsupervised | 61.750 | 0.270 | 0.008 | 0.481 |
| sinusoidal | joint h4 w0.05 + predictive-y + masked-y h4 | unsupervised | 54.930 | 0.342 | 0.083 | 0.586 |
| sinusoidal | structured ELBO | unsupervised | 52.989 | 0.347 | 0.041 | 0.500 |
| weak_sinusoidal | direct reference moment distillation | reference_distilled | 2.774 | 0.838 | 0.669 | 0.334 |
| weak_sinusoidal | direct ELBO | unsupervised | 20.312 | 0.279 | 0.025 | 0.312 |
| weak_sinusoidal | joint h4 w0.05 + predictive-y + masked-y h4 | unsupervised | 14.672 | 0.396 | 0.090 | 0.322 |
| weak_sinusoidal | structured ELBO | unsupervised | 20.865 | 0.332 | 0.058 | 0.313 |
| zero | direct reference moment distillation | reference_distilled | 2.774 | 0.838 | 0.668 | 0.263 |
| zero | direct ELBO | unsupervised | 6.912 | 0.372 | 0.080 | 0.263 |
| zero | joint h4 w0.05 + predictive-y + masked-y h4 | unsupervised | 8.414 | 0.388 | 0.107 | 0.263 |
| zero | structured ELBO | unsupervised | 13.474 | 0.282 | 0.056 | 0.263 |

## Fully Unsupervised Delta

| Pattern | Candidate NLL delta | Candidate cov delta | Candidate var-ratio delta | Interpretation |
|---|---:|---:|---:|---|
| intermittent_sinusoidal | -14.861 | 0.043 | 0.022 | improves robustness |
| random_normal | -53.848 | 0.043 | 0.026 | improves robustness |
| sinusoidal | 1.942 | -0.005 | 0.042 | regresses |
| weak_sinusoidal | -6.193 | 0.064 | 0.032 | improves robustness |
| zero | -5.060 | 0.106 | 0.051 | improves robustness |

## Objective Variants Tested

| Suite | Pattern | Row | state NLL | cov 90 | var ratio |
|---|---|---|---:|---:|---:|
| nonlinear_unsupervised_joint_elbo_pilot_1000 | intermittent_sinusoidal | EKF-residualized nonlinear windowed ELBO h4 | 32.530 | 0.367 | 0.052 |
| nonlinear_unsupervised_joint_elbo_pilot_1000 | intermittent_sinusoidal | structured ELBO | 37.853 | 0.327 | 0.038 |
| nonlinear_unsupervised_joint_elbo_pilot_1000 | weak_sinusoidal | EKF-residualized nonlinear windowed ELBO h4 | 26.181 | 0.298 | 0.042 |
| nonlinear_unsupervised_joint_elbo_pilot_1000 | weak_sinusoidal | structured ELBO | 20.865 | 0.332 | 0.058 |
| nonlinear_unsupervised_joint_predictive_masked_y_pilot_1000 | intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4, predictive-y, and masked-y spans h4 | 23.285 | 0.369 | 0.054 |
| nonlinear_unsupervised_joint_predictive_masked_y_pilot_1000 | intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + predictive-y and masked-y spans h4 | 22.745 | 0.381 | 0.059 |
| nonlinear_unsupervised_joint_predictive_masked_y_pilot_1000 | intermittent_sinusoidal | structured ELBO | 37.853 | 0.327 | 0.038 |
| nonlinear_unsupervised_joint_predictive_masked_y_pilot_1000 | weak_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4, predictive-y, and masked-y spans h4 | 13.411 | 0.395 | 0.108 |
| nonlinear_unsupervised_joint_predictive_masked_y_pilot_1000 | weak_sinusoidal | EKF-residualized nonlinear MC ELBO + predictive-y and masked-y spans h4 | 14.789 | 0.398 | 0.088 |
| nonlinear_unsupervised_joint_predictive_masked_y_pilot_1000 | weak_sinusoidal | structured ELBO | 20.865 | 0.332 | 0.058 |
| nonlinear_unsupervised_joint_weight_sweep_1000 | intermittent_sinusoidal | joint h4 w0.05 + predictive-y + masked-y h4 | 22.992 | 0.371 | 0.060 |
| nonlinear_unsupervised_joint_weight_sweep_1000 | weak_sinusoidal | joint h4 w0.05 + predictive-y + masked-y h4 | 14.672 | 0.396 | 0.090 |
| nonlinear_unsupervised_masked_y_pilot_1000 | intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + masked-y spans h4 | 23.918 | 0.369 | 0.057 |
| nonlinear_unsupervised_masked_y_pilot_1000 | intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + predictive-y auxiliary | 33.279 | 0.358 | 0.035 |
| nonlinear_unsupervised_masked_y_pilot_1000 | intermittent_sinusoidal | structured ELBO | 37.853 | 0.327 | 0.038 |
| nonlinear_unsupervised_masked_y_pilot_1000 | weak_sinusoidal | EKF-residualized nonlinear MC ELBO + masked-y spans h4 | 16.059 | 0.376 | 0.087 |
| nonlinear_unsupervised_masked_y_pilot_1000 | weak_sinusoidal | EKF-residualized nonlinear MC ELBO + predictive-y auxiliary | 22.994 | 0.324 | 0.043 |
| nonlinear_unsupervised_masked_y_pilot_1000 | weak_sinusoidal | structured ELBO | 20.865 | 0.332 | 0.058 |
| nonlinear_unsupervised_predictive_y_pilot_1000 | intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + predictive-y auxiliary | 33.619 | 0.346 | 0.032 |
| nonlinear_unsupervised_predictive_y_pilot_1000 | intermittent_sinusoidal | structured ELBO | 37.996 | 0.329 | 0.029 |
| nonlinear_unsupervised_predictive_y_pilot_1000 | weak_sinusoidal | EKF-residualized nonlinear MC ELBO + predictive-y auxiliary | 25.105 | 0.301 | 0.207 |
| nonlinear_unsupervised_predictive_y_pilot_1000 | weak_sinusoidal | structured ELBO | 21.611 | 0.338 | 0.048 |

## Reference-Distilled Diagnostics

| Pattern | Diagnostic | state NLL | cov 90 | var ratio |
|---|---|---:|---:|---:|
| intermittent_sinusoidal | direct reference moment distillation | 2.774 | 0.838 | 0.667 |
| intermittent_sinusoidal | structured h4 reference rollout distillation | 3.275 | 0.860 | 1.437 |
| random_normal | direct reference moment distillation | 2.771 | 0.841 | 0.676 |
| random_normal | structured h4 reference rollout distillation | 135.169 | 0.422 | 1.838 |
| sinusoidal | direct reference moment distillation | 2.773 | 0.839 | 0.674 |
| sinusoidal | structured h4 reference rollout distillation | 52.729 | 0.491 | 2.316 |
| weak_sinusoidal | direct reference moment distillation | 2.774 | 0.838 | 0.669 |
| weak_sinusoidal | structured h4 reference rollout distillation | 2.774 | 0.885 | 0.994 |
| zero | direct reference moment distillation | 2.774 | 0.838 | 0.668 |
| zero | structured h4 reference rollout distillation | 2.728 | 0.909 | 1.000 |

## Decision

Continue the unsupervised program only as a targeted objective/divergence branch. The current combined objective is the best fully unsupervised robustness baseline, but it does not meet the original calibration gate. The strongest next candidates are multi-sample/IWAE-style objectives, alpha/Renyi objectives, or entropy/calibration terms that remain fully unsupervised.

## Source Artifacts

- `outputs/nonlinear_unsupervised_predictive_y_pilot_1000/metrics.csv`
- `outputs/nonlinear_unsupervised_masked_y_pilot_1000/metrics.csv`
- `outputs/nonlinear_unsupervised_joint_elbo_pilot_1000/metrics.csv`
- `outputs/nonlinear_unsupervised_joint_predictive_masked_y_pilot_1000/metrics.csv`
- `outputs/nonlinear_unsupervised_joint_weight_sweep_1000/metrics.csv`
- `outputs/nonlinear_unsupervised_objective_robustness_full_1000/metrics.csv`
- `outputs/nonlinear_head_seed_sweep_1000/metrics.csv`
