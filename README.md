# SABLE frontend

Production preview: http://127.0.0.1:4175/

Development preview: http://127.0.0.1:4174/

Vite + TypeScript + plain CSS. The accepted C-refined hero supplies the instrument, payment separation, visible sample-cipher transformation, finite enclave states, split trajectories and independent output controls. All numbered sections from skeleton.md are present. Static semantic content renders directly from index.html; TypeScript enhances controls. Fonts and licences are self-hosted in public/fonts.

## Commands

- `npm.cmd install`
- `npm.cmd run dev`
- `npm.cmd run build` checks TypeScript, validates design token references and builds dist.
- `npm.cmd run preview` serves the built frontend on 4174 when the development server is stopped.

The retained production preview uses `python -m http.server 4175 --bind 127.0.0.1 --directory runs/sable/site/dist` from the factory root. Both processes were started with hidden windows. No deployment or git commit was performed.

## Browser verification

Ready/full-page screenshots: screenshots/final-375-ready.png, final-768-ready.png, final-1440-ready.png. Hero transit/processing: final-1440-transit.png and final-1440-processing.png. Reduced-motion completion: final-375-reduced-complete.png. Earlier numbered captures document the vertical slices.

Checks passed: no horizontal overflow at all three widths; exact tagline; self-hosted font loading; native keyboard initiation; empty-input feedback; duplicate-run prevention; invariant payment region through the complete sequence; visible sample cipher; distinct processing; independently sealed outputs; receipt inspector focus; field selection; explicit synchronized answer reveal; clear session removing the local draft; radio-based privacy views including accurate enclave plaintext; local access exploration; native FAQ; sample presets focusing the prompt without running; reset during travel; width-change cancellation; skip; mobile menu disclosure/close; complete reduced-motion narrative with zero active animations. No browser JavaScript errors occurred.

The actual export Blob was inspected: sample=true, verified=false, and keys sample, verified, schema, id, model, environment, workload, freshness, completion. Visitor text, answer text and payment data were absent.

Native download saving now passes after critique fix 1 corrected CSS seconds-to-milliseconds parsing for the Blob cleanup timer. The browser successfully saved `sable-sample-receipt.json` as `sample-export.json`; its download failure was null. Earlier cancellations coincided with a full C: drive, but that was not proven to be their sole cause. No unrelated host files were cleaned.

## Performance evidence

Initial mobile report: lighthouse-initial.report.json/html, performance 86, accessibility 100, best practices 100, SEO 100. The 46KB blocking stylesheet and late font discovery were the bottleneck. The full-site copy now removes unused original hero variant rules, preloads its two initial fonts, and renders fixed sections as HTML rather than constructing them during startup. Final isolated mobile performance is **95**: FCP/LCP 2.3s, TBT 0ms, CLS 0.001. Evidence is in lighthouse-final-performance.report.json/html. Task-only browser/audit temporary files live in .runtime-temp because the host C: temporary directory is full.

The isolated repeat after critique-1 fixes scores **99**: FCP 1.5s, LCP 1.7s, TBT 100ms, CLS 0. Reports: lighthouse-fix-1-performance.report.json/html. Audit temporary files remain workspace-local.

Final user-authorized polish scores **95** in its single isolated mobile measurement: FCP/LCP 2.1s, TBT 0ms, CLS 0.031. The >=90 target passes. The report identifies the existing font loading as the small shift cause and records slower network timing than the prior run; see `FINAL-POLISH.md` and lighthouse-final-polish-performance.report.json/html. The asymmetric native instrument contour, early separate mobile access cue and all required responsive/behavior/export checks are documented there.

## Scope

Frontend-local proposed protocol demonstration. No encryption, wallet connection, payment, reservation, staking, inference API, hardware attestation or cryptographic verification occurs. Every cipher, receipt, model, environment and execution value is labelled sample/demo. Prompt text is kept in browser memory and excluded from URLs, logging, storage and exports. The fixed answer is explicitly a sample.

Critique 2 passed. Final user-authorized polish and its checks are complete; main chat owns approval/state/history recording. See `FINAL-POLISH.md` and ../STATE.md.
