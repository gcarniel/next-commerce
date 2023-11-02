import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(90deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        updown: {
          '0%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '70%': { transform: 'translateY(+10px)' },
          '100%': { transform: 'translateY(0)' },
        },

        scale10: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(.7)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out forwards',
        updown: 'updown 1s ease-in-out forwards',
        scale10: 'scale10 .5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
