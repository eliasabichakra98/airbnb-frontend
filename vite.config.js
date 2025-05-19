import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allows access from external IPs / domains
    allowedHosts: ['ec2-16-171-144-210.eu-north-1.compute.amazonaws.com'], // Allow your EC2 DNS
  },
})
