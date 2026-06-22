---
'@clerk/electron-passkeys': patch
---

Publish prebuilt native binaries (macOS arm64/x64, Windows arm64/x64) alongside the package so passkey support works without a local toolchain. Installing the wrapper now pulls in the matching platform binary automatically.
