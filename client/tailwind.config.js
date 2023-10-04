/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      heading: ['20px', { lineHeight: '25.2px' }],
      'body-1': ['21px', { lineHeight: '21px' }],
      'body-2': ['12px', { lineHeight: '18px' }],
      'body-3': ['10px', { lineHeight: '15px' }],
      'body-4': ['8px', { lineHeight: '10px' }],
    },
    extend: {
      colors: {
        primary: { 300: '#FFF8F5', 400: '#FFE8DE', 500: '#FF4E00' },
        secondary: { 300: '#FFE1BD', 400: '#FFBB6A', 500: '#FF8A00' },
        success: { 300: '#D2F6DA', 400: '#27C149', 500: '#145923' },
        danger: { 300: '#F9CDCD', 400: '#E63C3C', 500: '#6C0E0E' },
        warning: { 400: '#FFEBB8', 500: '#FFB800' },
        info: { 500: '#B2DFFF' },
        background: { 500: '#EEEEEE' },
        neutral: { 300: '#F5F5F5', 400: '#D9D9D9', 500: '#C3C3C3' },
        slate: { 300: '#868686', 400: '#555555', 500: '#414141' },
      },
    },
  },
  plugins: [],
}
