# Nonlinear Learned Filter Suite

The promoted unsupervised baseline `structured_joint_elbo_h4_w005_predictive_y_masked_y_spans_h4` is a partial success for robustness, not a solved nonlinear strict filter; divergence/family rows should be compared against it.

| x pattern | Model | signal | Steps | state NLL | ref state NLL | cov 90 | ref cov 90 | var ratio | pred-y NLL | pred NLL | ref pred NLL |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| weak_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4 w0.05, predictive-y, and masked-y spans h4 | unsupervised | 1000 | 15.965449 | 2.738192 | 0.397705 | 0.908366 | 0.088379 | 0.318788 | 0.319024 | 0.296951 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k8 | unsupervised | 1000 | 5.338509 | 2.738192 | 0.434001 | 0.908366 | 0.242303 | 0.331352 | 0.331403 | 0.296951 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k16 | unsupervised | 1000 | 5.292873 | 2.738192 | 0.419271 | 0.908366 | 0.261202 | 0.331298 | 0.331319 | 0.296951 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k32 | unsupervised | 1000 | 4.644018 | 2.738192 | 0.483561 | 0.908366 | 0.332984 | 0.331443 | 0.331428 | 0.296951 |
| weak_sinusoidal | direct nonlinear K2 mixture IWAE h4 k16 + predictive-y | unsupervised | 1000 | 5.932719 | 2.738192 | 0.386149 | 0.908366 | 0.223663 | 0.331328 | 0.331399 | 0.296951 |
| weak_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4 w0.05, predictive-y, and masked-y spans h4 | unsupervised | 1000 | 17.900330 | 2.776700 | 0.356934 | 0.877279 | 0.078612 | 0.328781 | 0.328955 | 0.305738 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k8 | unsupervised | 1000 | 4.165872 | 2.776700 | 0.503337 | 0.877279 | 0.197229 | 0.336165 | 0.336120 | 0.305738 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k16 | unsupervised | 1000 | 4.078058 | 2.776700 | 0.511068 | 0.877279 | 0.200843 | 0.336244 | 0.336202 | 0.305738 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k32 | unsupervised | 1000 | 4.266207 | 2.776700 | 0.493978 | 0.877279 | 0.187601 | 0.336305 | 0.336268 | 0.305738 |
| weak_sinusoidal | direct nonlinear K2 mixture IWAE h4 k16 + predictive-y | unsupervised | 1000 | 4.255581 | 2.776700 | 0.494873 | 0.877279 | 0.186787 | 0.336060 | 0.336022 | 0.305738 |
| weak_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4 w0.05, predictive-y, and masked-y spans h4 | unsupervised | 1000 | 10.149324 | 2.657798 | 0.433757 | 0.927490 | 0.102917 | 0.317410 | 0.317537 | 0.303765 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k8 | unsupervised | 1000 | 4.208476 | 2.657798 | 0.514404 | 0.927490 | 0.141747 | 0.332698 | 0.332695 | 0.303765 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k16 | unsupervised | 1000 | 3.973650 | 2.657798 | 0.532145 | 0.927490 | 0.155711 | 0.333602 | 0.333595 | 0.303765 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k32 | unsupervised | 1000 | 3.750569 | 2.657798 | 0.558268 | 0.927490 | 0.174048 | 0.333836 | 0.333827 | 0.303765 |
| weak_sinusoidal | direct nonlinear K2 mixture IWAE h4 k16 + predictive-y | unsupervised | 1000 | 4.176056 | 2.657798 | 0.515869 | 0.927490 | 0.142162 | 0.332830 | 0.332831 | 0.303765 |
| intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4 w0.05, predictive-y, and masked-y spans h4 | unsupervised | 1000 | 24.300824 | 2.732284 | 0.372966 | 0.914062 | 0.050397 | 0.372941 | 0.381795 | 0.346522 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k8 | unsupervised | 1000 | 5.139566 | 2.732284 | 0.433675 | 0.914062 | 0.285243 | 0.383589 | 0.391706 | 0.346522 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k16 | unsupervised | 1000 | 5.092268 | 2.732284 | 0.445882 | 0.914062 | 0.270450 | 0.383532 | 0.391942 | 0.346522 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k32 | unsupervised | 1000 | 5.056869 | 2.732284 | 0.440430 | 0.914062 | 0.274696 | 0.383453 | 0.391897 | 0.346522 |
| intermittent_sinusoidal | direct nonlinear K2 mixture IWAE h4 k16 + predictive-y | unsupervised | 1000 | 5.162781 | 2.732284 | 0.441569 | 0.914062 | 0.263726 | 0.383509 | 0.391918 | 0.346522 |
| intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4 w0.05, predictive-y, and masked-y spans h4 | unsupervised | 1000 | 26.128002 | 2.776782 | 0.349447 | 0.874349 | 0.071730 | 0.377186 | 0.387543 | 0.357559 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k8 | unsupervised | 1000 | 4.744861 | 2.776782 | 0.460205 | 0.874349 | 0.325965 | 0.392114 | 0.398457 | 0.357559 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k16 | unsupervised | 1000 | 4.208056 | 2.776782 | 0.498942 | 0.874349 | 0.309594 | 0.391340 | 0.398395 | 0.357559 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k32 | unsupervised | 1000 | 4.173729 | 2.776782 | 0.500570 | 0.874349 | 0.310566 | 0.391386 | 0.398414 | 0.357559 |
| intermittent_sinusoidal | direct nonlinear K2 mixture IWAE h4 k16 + predictive-y | unsupervised | 1000 | 4.211083 | 2.776782 | 0.501221 | 0.874349 | 0.319076 | 0.391333 | 0.398299 | 0.357559 |
| intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4 w0.05, predictive-y, and masked-y spans h4 | unsupervised | 1000 | 18.545874 | 2.654578 | 0.389404 | 0.926595 | 0.057823 | 0.370901 | 0.377351 | 0.352279 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k8 | unsupervised | 1000 | 4.214376 | 2.654578 | 0.522624 | 0.926595 | 0.143857 | 0.389682 | 0.397083 | 0.352279 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k16 | unsupervised | 1000 | 3.942927 | 2.654578 | 0.545166 | 0.926595 | 0.160839 | 0.390438 | 0.397831 | 0.352279 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k32 | unsupervised | 1000 | 3.774318 | 2.654578 | 0.563070 | 0.926595 | 0.175933 | 0.390848 | 0.398171 | 0.352279 |
| intermittent_sinusoidal | direct nonlinear K2 mixture IWAE h4 k16 + predictive-y | unsupervised | 1000 | 4.416855 | 2.654578 | 0.509033 | 0.926595 | 0.131804 | 0.389455 | 0.396967 | 0.352279 |

## Aggregate By Seed

| x pattern | Model | Steps | seeds | state NLL | coverage 90 | variance ratio |
|---|---|---:|---:|---:|---:|---:|
| intermittent_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4 w0.05, predictive-y, and masked-y spans h4 | 1000 | 3 | 22.991567 +/- 3.230870 | 0.370605 +/- 0.016398 | 0.059983 +/- 0.008842 |
| intermittent_sinusoidal | direct nonlinear K2 mixture IWAE h4 k16 + predictive-y | 1000 | 3 | 4.596907 +/- 0.408857 | 0.483941 +/- 0.030131 | 0.238202 +/- 0.078555 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k16 | 1000 | 3 | 4.414417 +/- 0.491382 | 0.496663 +/- 0.040564 | 0.246961 +/- 0.062959 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k32 | 1000 | 3 | 4.334972 +/- 0.535869 | 0.501356 +/- 0.050071 | 0.253732 +/- 0.056928 |
| intermittent_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k8 | 1000 | 3 | 4.699601 +/- 0.379061 | 0.472168 +/- 0.037285 | 0.251689 +/- 0.078040 |
| weak_sinusoidal | EKF-residualized nonlinear MC ELBO + joint h4 w0.05, predictive-y, and masked-y spans h4 | 1000 | 3 | 14.671701 +/- 3.293920 | 0.396132 +/- 0.031383 | 0.089969 +/- 0.009986 |
| weak_sinusoidal | direct nonlinear K2 mixture IWAE h4 k16 + predictive-y | 1000 | 3 | 4.788118 +/- 0.810006 | 0.465630 +/- 0.056852 | 0.184204 +/- 0.033323 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k16 | 1000 | 3 | 4.448194 +/- 0.598798 | 0.487495 +/- 0.049003 | 0.205919 +/- 0.043216 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k32 | 1000 | 3 | 4.220265 +/- 0.366193 | 0.511936 +/- 0.033037 | 0.231544 +/- 0.071942 |
| weak_sinusoidal | direct nonlinear K2 mixture windowed IWAE h4 k8 | 1000 | 3 | 4.570952 +/- 0.543023 | 0.483914 +/- 0.035582 | 0.193759 +/- 0.041125 |

The signal column classifies each training row as unsupervised,
reference-distilled, or oracle-calibrated according to the objective
weights used during training.
