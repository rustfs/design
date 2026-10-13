# Copy, terminology and facts

## Voice

RustFS sounds like a senior storage engineer: conclusion first, then evidence; facts instead of adjectives; limits stated plainly. Traits: exact (not cold), candid (not alarmist), engineered (not jargon-heavy), open (not sloppy).

Tone by context: docs neutral and direct (second person, actionable steps); website and ads confident and restrained (one message, footnoted claims); release notes clear and complete (breaking changes first); security advisories calm and precise (ID, scope, severity, fixed version, mitigation); community warm and level (thank specific people); errors specific and actionable (what happened, why, how to fix — no apology, no blame).

Normative documents use 应 / 须 / 不得 and should / must / must not. Never narrate how something was produced.

## Rules

- No superlatives or unverifiable claims: avoid fastest, best, world-leading, 100% compatible, military-grade, zero ops, revolutionary; 最快、最强、全球领先、100% 兼容、军工级、零运维、颠覆、赋能.
- Claims carry conditions and a source. Example: "With EC 4+2, data stays readable with any two drives offline."
- Preview features say Preview / 预览 (currently S3 Tables, MinIO on-disk compatibility). SFTP and the Swift API are opt-in build features.
- Comparisons use verifiable facts only and never disparage other projects. Name third parties in text; never use their logos without permission.
- Buttons start with a verb naming the result. Link text describes the destination.
- English headings use sentence case; Chinese headings take no full stop.
- Chinese: half-width space between Chinese and Latin letters/numbers; full-width punctuation; quotes 「」 (nested 『』); Arabic numerals for all numbers.
- Numbers: 34,869 / 2.7M+ / 15.15M; dates 2026-10-14; versions 1.0.1 (no "v"); KiB/MiB/GiB; `EC 4+2`; a space before units (15 Gbps).
- Name: always "RustFS" in text (never RUSTFS, Rustfs, Rust FS); commands and paths keep lowercase (`rustfs/rustfs`). RustFS is object storage, never "a file system".

## Approved campaign lines

| 中文 | English | Proof / footnote |
|---|---|---|
| 丢盘，不丢数据。 | Lose drives. Keep data. | EC 4+2 配置下，任意两块盘离线时数据仍可读取。 / With EC 4+2, data stays readable with any two drives offline. |
| S3 调用不变，底层换成 Rust。 | Same S3 calls. Rust underneath. | S3 兼容范围以官方兼容性矩阵为准。 / S3 coverage is defined by the official compatibility matrix. |
| 开源，不设暗条款。 | Open source. No fine print. | Apache License 2.0 |
| 数据只留在你的硬件上。 | Your data stays on your hardware. | 无遥测，完全自托管。 / No telemetry. Fully self-hosted. |
| 为 AI 数据打造的内存安全存储。 | Memory-safe storage for AI data. | 以 Rust 构建。 / Built in Rust. |
| 每一个字节，都有着落。 | Every byte, accounted for. | Brand line; needs no footnote. |

## Terminology (zh ↔ en)

对象存储 object storage · 存储桶 bucket · 对象 object · 纠删码 erasure coding (EC) · 纠删集 erasure set · 数据块 / 校验块 data shard / parity shard · 存储池 pool · 位腐烂保护 bitrot protection · 修复 healing · 版本控制 versioning · 对象锁定 Object Lock (WORM) · 服务端加密 server-side encryption (SSE) · 站点复制 / 存储桶复制 site / bucket replication · 生命周期管理 lifecycle management (ILM) · 分层存储 tiering · 控制台 Console (product name stays English: RustFS Console).

## Brand facts

Source: official RustFS website and repository. As of 2026-10-14 — re-check before publishing and always print the source and date next to a figure.

- 34,869 GitHub stars · 2,700,000+ instances · 15,154,618 Docker pulls (15.15M) · 7,094 commits
- 1.0.0 GA released 2026-09-16; current release 1.0.1; Apache License 2.0
- Blog posts: "Announcing RustFS 1.0.0 GA" (2026-09-16); "RustFS Launches S3 Tables: Apache Iceberg Tables Inside an Open-Source Object Store" (2026-09-10); "Step-by-Step Tutorial: How to Install RustFS with RPM/DEB Packages" (2026-08-19); "Managing AI Fine-Tuning Storage with Nawāt and RustFS" (2026-08-06); "GitLab and RustFS Integration: OIDC SSO and S3 Object Storage" (2026-08-04)
- Real commands (README):
  - `curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh`
  - `mkdir -p data logs && chown -R 10001:10001 data logs`
  - `docker run -d -p 9000:9000 -p 9001:9001 -v $(pwd)/data:/data -v $(pwd)/logs:/logs rustfs/rustfs:latest`
  - S3 API http://localhost:9000 · Console http://localhost:9001
- URLs: rustfs.com · docs.rustfs.com · github.com/rustfs/rustfs
- Canonical sample values: bucket `my-bucket`, object `/path/to/hello.txt`, region `us-east-1`.
