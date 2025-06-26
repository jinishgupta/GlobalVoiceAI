module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Vibrant blue
        secondary: '#f97316', // Vibrant orange
        'base-bg': '#f6f8fa', // Lighter, cleaner background
        'base-bg-alt': '#e0e7ef', // Soft blue-gray
        'text-main': '#1e293b', // Deep slate
        'text-muted': '#64748b', // Muted slate
        divider: '#e2e8f0', // Light blue-gray
        'vibrant-blue': '#0ea5e9',
        'vibrant-orange': '#f97316',
        'teal-500': '#14b8a6',
        'yellow-500': '#f59e42',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-primary', 'bg-primary/10', 'bg-primary/30', 'bg-primary/90', 'bg-primary/100',
    'text-primary', 'text-primary/10', 'text-primary/30', 'text-primary/90', 'text-primary/100',
    'border-primary', 'border-primary/10', 'border-primary/30', 'border-primary/90', 'border-primary/100',
    'bg-secondary', 'bg-secondary/10', 'bg-secondary/30', 'bg-secondary/90', 'bg-secondary/100',
    'text-secondary', 'text-secondary/10', 'text-secondary/30', 'text-secondary/90', 'text-secondary/100',
    'border-secondary', 'border-secondary/10', 'border-secondary/30', 'border-secondary/90', 'border-secondary/100',
    'bg-base-bg', 'bg-base-bg-alt', 'text-text-main', 'text-text-muted', 'border-divider',
    'bg-white', 'text-white', 'border-white',
  ],
}; 