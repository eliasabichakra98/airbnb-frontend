export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: 'all',  // Allow all hosts
  },
})
