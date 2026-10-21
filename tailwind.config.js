/* Design tokens exported from Google Stitch (project "Dr.Studio AI Production Website", 2026-10-21),
   plus Dr.Studio brand colours. Build: node <tailwindcss v3>/lib/cli.js -c tailwind.config.js -i src/input.css -o assets/css/site.css --minify */
const SERIF = ['"EB Garamond"', '"Pretendard Variable"', 'Pretendard', 'Georgia', 'serif'];
const SANS = ['"IBM Plex Sans"', '"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'];

module.exports = {
  content: ['./index.html', './assets/js/site.js', './request/index.html', './assets/js/request.js'],
  theme: {
    extend: {
      colors: {
        'paper': '#FAF8F4',
        'emerald': '#00A39B',
        'emerald-hl': '#20BAAC',
        'primary-fixed': '#baece5', 'secondary-fixed-dim': '#5dd9d0', 'inverse-surface': '#30312e', 'on-surface': '#1b1c1a',
        'surface-container-high': '#eae8e4', 'error-container': '#ffdad6', 'on-secondary-fixed': '#00201e', 'on-error': '#ffffff',
        'surface-tint': '#376661', 'surface-dim': '#dbdad6', 'surface': '#fbf9f5', 'surface-container-low': '#f5f3ef',
        'on-primary-fixed': '#00201d', 'on-background': '#1b1c1a', 'secondary-fixed': '#7cf6ec', 'on-tertiary': '#ffffff',
        'error': '#ba1a1a', 'primary-fixed-dim': '#9fd0c9', 'surface-container': '#efeeea', 'on-secondary-fixed-variant': '#00504c',
        'on-secondary': '#ffffff', 'on-primary': '#ffffff', 'outline-variant': '#c0c8c6', 'surface-bright': '#fbf9f5',
        'surface-container-highest': '#e4e2de', 'primary': '#002a26', 'on-primary-fixed-variant': '#1d4e49', 'tertiary-fixed': '#73f8e8',
        'inverse-primary': '#9fd0c9', 'on-tertiary-fixed': '#00201d', 'surface-container-lowest': '#ffffff', 'tertiary': '#002a26',
        'on-primary-container': '#7cada6', 'surface-variant': '#e4e2de', 'on-error-container': '#93000a', 'on-secondary-container': '#00716b',
        'secondary-container': '#7cf6ec', 'on-tertiary-container': '#19b7a9', 'outline': '#707977', 'tertiary-fixed-dim': '#52dbcc',
        'on-tertiary-fixed-variant': '#005049', 'on-surface-variant': '#404847', 'inverse-on-surface': '#f2f0ed', 'tertiary-container': '#00423c',
        'background': '#fbf9f5', 'secondary': '#006a65', 'primary-container': '#0b413c'
      },
      borderRadius: { DEFAULT: '0.25rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
      spacing: {
        'margin-tablet': '2.5rem', 'space-md': '1.5rem', 'space-xs': '0.375rem', 'space-sm': '0.75rem', 'gutter-desktop': '2.5rem',
        'space-xl': '6rem', 'margin': '1.25rem', 'gutter': '1.5rem', 'space-lg': '3rem', 'margin-desktop': '4.5rem'
      },
      fontFamily: {
        serif: SERIF, sans: SANS,
        'label-md': SANS, 'label-sm': SANS, 'label-lg': SANS, 'body-sm': SANS,
        'headline-lg': SERIF, 'body-lg': SERIF, 'display-xl-mobile': SERIF, 'headline-sm': SERIF, 'headline-md': SERIF,
        'headline-lg-mobile': SERIF, 'display-xl': SERIF, 'body-md': SERIF
      },
      fontSize: {
        'label-md': ['0.6875rem', { lineHeight: '0.875rem', letterSpacing: '0.22em', fontWeight: '500' }],
        'label-sm': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.22em', fontWeight: '500' }],
        'body-sm': ['0.875rem', { lineHeight: '1.375rem', fontWeight: '400' }],
        'headline-lg': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.015em', fontWeight: '400' }],
        'body-lg': ['1.25rem', { lineHeight: '1.875rem', fontWeight: '400' }],
        'display-xl-mobile': ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-sm': ['1.5rem', { lineHeight: '2rem', fontWeight: '400' }],
        'headline-md': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '400' }],
        'headline-lg-mobile': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em', fontWeight: '400' }],
        'display-xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.02em', fontWeight: '400' }],
        'body-md': ['1.0625rem', { lineHeight: '1.625rem', fontWeight: '400' }],
        'label-lg': ['0.8125rem', { lineHeight: '1rem', letterSpacing: '0.18em', fontWeight: '600' }]
      }
    }
  },
  plugins: []
};
