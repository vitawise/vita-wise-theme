# VitaWise Twilight Theme

Salla Twilight implementation of the VitaWise e-commerce frontend specification.

## Stack

- Twig templates in `src/views`
- Tailwind CSS via `@salla.sa/twilight-tailwind-theme`
- Vanilla JavaScript in `src/assets/js/app.js`
- Salla Web Components (`@salla.sa/twilight-components`)
- Salla JS SDK (`@salla.sa/twilight`)
- Webpack bundling

## Development

1. **Always open a terminal in this folder** (`vita-wise-theme`), not the parent workspace, so `twilight.json` and `node_modules` match what Salla CLI expects.
2. Install dependencies:
   - `npm install`
3. Build assets:
   - `npm run build`
4. Log in once: `salla login`
5. Run theme preview:
   - `npm run dev`  
   - or: `salla theme preview --store "YOUR_STORE_NAME" --without-editor`

### Three different URLs (don’t mix them up)

| What the CLI prints | What it is |
|---------------------|------------|
| **Assets URL** (`http://localhost:xxxx`) | Local server that serves your **compiled CSS/JS** so the real store preview can load them. **Opening this alone is not your shop**—it’s only the asset bundle. |
| **Live reload URL** (`ws://localhost:xxxx`) | WebSocket for hot reload while preview runs. |
| **Preview URL** (`Preview URL: https://…`) | The **actual demo store** opened with your theme. This line appears only when the next step succeeds. |

### Why there is no “Preview URL” line

The CLI only logs **`Preview URL: …`** after **Salla’s API** (`https://api.salla.dev/...`) returns a `preview_url`. That happens **after** local checks, starting the asset + websocket servers, and (usually) running the **`development` / webpack watch** script. If anything fails before that (DNS error, duplicate Git tag, auth, timeout), you will see **Assets URL** and **Live reload** but **no Preview URL**.

- **Wait**: Leave the terminal open; webpack may still be compiling—watch for new lines or errors below “servers are running”.
- **Scroll**: Errors often appear **after** the “Hooray!” message.
- **Fix API/network**: Resolve `api.salla.dev` (`nslookup api.salla.dev`), fix tag/version issues, and ensure `salla login` is valid.
- **Alternative**: In **[Salla Partners](https://salla.partners/)** → **Themes** → your theme, use the dashboard **preview / draft** options if the CLI keeps failing (wording may vary by account).

### Preview troubleshooting (common CLI errors)

| Symptom | What it means | What to try |
|--------|----------------|-------------|
| `node_modules folder is not found` | CLI is resolving a folder without dependencies (often the parent `site for salla` copy). | Run `npm install` **in this directory** (`vita-wise-theme`), then run `salla theme preview` **from this same directory**. |
| `Tag X already exists` / `Authorization Error` | A Git tag for that version already exists on GitHub, or GitHub permissions failed. | Bump `"version"` in `twilight.json` and `package.json`, commit, push, then preview again. Or remove the conflicting tag on GitHub (only if safe for your workflow). |
| `getaddrinfo ENOTFOUND api.salla.dev` | Your PC could not resolve the Salla API hostname (DNS/network). | Check internet/VPN; try `nslookup api.salla.dev`. Flush DNS: `ipconfig /flushdns`. Try Google DNS (`8.8.8.8`) on your adapter. On Windows, prefer IPv4 for Node: `$env:NODE_OPTIONS="--dns-result-order=ipv4first"` then run preview again. |

## Localization

- `src/locales/ar.json`
- `src/locales/en.json`

## Theme Settings

- `src/config/settings.json`
