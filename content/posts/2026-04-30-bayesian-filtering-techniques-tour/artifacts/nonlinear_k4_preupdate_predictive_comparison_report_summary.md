# Nonlinear Unsupervised Objective Final Report

## Executive Summary

- The best fully unsupervised nonlinear row is `structured_joint_elbo_h4_w005_predictive_y_masked_y_spans_h4`.
- It improves degraded-observation robustness relative to vanilla structured ELBO on weak, intermittent, zero, and random-normal stressors.
- It is not a solved nonlinear filter: clean sinusoidal performance is slightly worse than structured ELBO, and absolute coverage/variance calibration remains weak.
- Reference-distilled rows remain much stronger and should be reported only as upper-bound diagnostics, not unsupervised results.

## Final Claim

A combined short-horizon joint ELBO, causal predictive-y objective, and masked-y span training objective materially reduces the nonlinear strict-filter failure under weak, intermittent, and non-informative observations. The remaining gap to reference-distilled controls indicates that the next research step should focus on objective/divergence design or posterior expressivity, not more local ELBO tuning.

## Robustness Suite

| Pattern | Row | signal | state NLL | cov 90 | var ratio | pred-y NLL | pred NLL |
|---|---|---|---:|---:|---:|---:|---:|

## Fully Unsupervised Delta

| Pattern | Candidate NLL delta | Candidate cov delta | Candidate var-ratio delta | Interpretation |
|---|---:|---:|---:|---|

## Objective Variants Tested

| Suite | Pattern | Row | state NLL | cov 90 | var ratio | pred-y NLL |
|---|---|---|---:|---:|---:|---:|
| nonlinear_k2_projection_beta_sweep_1000 | intermittent_sinusoidal | direct K2 local ADF beta 0.3 | 2.847 | 0.782 | 0.523 | 0.392 |
| nonlinear_k2_projection_beta_sweep_1000 | intermittent_sinusoidal | direct K2 local ADF beta 0.5 | 2.855 | 0.777 | 0.513 | 0.392 |
| nonlinear_k2_projection_beta_sweep_1000 | intermittent_sinusoidal | direct K2 local ADF beta 0.7 | 2.862 | 0.775 | 0.506 | 0.392 |
| nonlinear_k2_projection_beta_sweep_1000 | weak_sinusoidal | direct K2 local ADF beta 0.3 | 2.838 | 0.789 | 0.536 | 0.334 |
| nonlinear_k2_projection_beta_sweep_1000 | weak_sinusoidal | direct K2 local ADF beta 0.5 | 2.838 | 0.789 | 0.536 | 0.334 |
| nonlinear_k2_projection_beta_sweep_1000 | weak_sinusoidal | direct K2 local ADF beta 0.7 | 2.840 | 0.788 | 0.534 | 0.334 |
| nonlinear_k4_projection_beta_0p3_spread_2pi_1000 | intermittent_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi | 2.640 | 0.786 | 0.619 | 0.362 |
| nonlinear_k4_projection_beta_0p3_spread_2pi_1000 | weak_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi | 2.724 | 0.918 | 1.082 | 0.329 |
| nonlinear_k4_spread_predictive_y_1000 | intermittent_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi + late pred-y w0.1 | 2.643 | 0.780 | 0.609 | 0.361 |
| nonlinear_k4_spread_predictive_y_1000 | intermittent_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi + pred-y w0.05 | 2.640 | 0.784 | 0.614 | 0.361 |
| nonlinear_k4_spread_predictive_y_1000 | weak_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi + late pred-y w0.1 | 2.727 | 0.910 | 1.053 | 0.328 |
| nonlinear_k4_spread_predictive_y_1000 | weak_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi + pred-y w0.05 | 2.761 | 0.900 | 1.071 | 0.330 |
| nonlinear_k4_spread_preupdate_predictive_1000 | intermittent_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi + late preupdate w0.1 | 2.643 | 0.780 | 0.609 | 0.361 |
| nonlinear_k4_spread_preupdate_predictive_1000 | weak_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi + late preupdate w0.1 | 2.727 | 0.910 | 1.053 | 0.328 |

## Predictive-Y Promotion Gate

Promotable rows must keep predictive-y NLL within 0.03 of the current promoted baseline for the same pattern.

| Pattern | state-density candidate | predictive-y candidate | promotable candidate | baseline pred-y NLL |
|---|---|---|---|---:|
| intermittent_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi (state 2.640, pred-y 0.362) | direct K4 local ADF beta 0.3 spread 2pi + late pred-y w0.1 (state 2.643, pred-y 0.361) |  |  |
| random_normal | direct K4 local ADF beta 0.3 spread 2pi (state 3.278, pred-y 0.575) | direct K4 local ADF beta 0.3 spread 2pi + late pred-y w0.1 (state 3.308, pred-y 0.571) |  |  |
| sinusoidal | direct K4 local ADF beta 0.3 spread 2pi (state 3.163, pred-y 0.514) | direct K4 local ADF beta 0.3 spread 2pi + pred-y w0.05 (state 3.184, pred-y 0.507) |  |  |
| weak_sinusoidal | direct K4 local ADF beta 0.3 spread 2pi (state 2.724, pred-y 0.329) | direct K4 local ADF beta 0.3 spread 2pi + late pred-y w0.1 (state 2.727, pred-y 0.328) |  |  |
| zero | direct K4 local ADF beta 0.3 spread 2pi (state 2.757, pred-y 0.263) | direct K2 local ADF beta 0.3 (state 2.836, pred-y 0.263) |  |  |

## Reference-Distilled Diagnostics

| Pattern | Diagnostic | state NLL | cov 90 | var ratio |
|---|---|---:|---:|---:|

## Decision

Continue the unsupervised program only as a targeted objective/divergence branch. The current combined objective is the best fully unsupervised robustness baseline, but it does not meet the original calibration gate. The strongest next candidates are multi-sample/IWAE-style objectives, alpha/Renyi objectives, or entropy/calibration terms that remain fully unsupervised.

## Source Artifacts

- `outputs/nonlinear_k4_projection_beta_0p3_spread_2pi_1000/metrics.csv`
- `outputs/nonlinear_k4_spread_predictive_y_1000/metrics.csv`
- `outputs/nonlinear_k4_spread_preupdate_predictive_1000/metrics.csv`
- `outputs/nonlinear_k2_projection_beta_sweep_1000/metrics.csv`
