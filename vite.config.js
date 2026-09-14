import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite hardcodes a `crossorigin` attribute onto the built module <script>
// tag (and modulepreload <link> tags). That attribute forces the browser
// to CORS-validate the script load against the page's own origin -- so
// any time we set a specific Access-Control-Allow-Origin value in
// vercel.json, it only works for requests matching that exact origin.
// Since every Vercel preview deployment gets its own unique origin, a
// fixed ACAO value inevitably breaks the site the next time someone opens
// a preview URL instead of the production one.
// We only ever serve these assets from the same origin as the page
// (no separate CDN domain), so `crossorigin` isn't actually needed here.
// Stripping it removes the CORS check entirely for our own script/style
// tags, which lets us safely set a real, restrictive
// Access-Control-Allow-Origin header without risking another crash.
function stripCrossorigin() {
  return {
    name: 'strip-crossorigin',
    transformIndexHtml(html) {
      // Only strip crossorigin from tags pointing at our own /assets/
      // files (same-origin, don't need it). Leave it alone anywhere else
      // (e.g. the Google Fonts preconnect, which genuinely is
      // cross-origin and correctly needs crossorigin to work well).
      return html.replace(
        /<(script|link)([^>]*\/assets\/[^>]*)>/g,
        (match, tag, attrs) => `<${tag}${attrs.replace(/ crossorigin(="[^"]*")?/g, '')}>`
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), stripCrossorigin()],
})
