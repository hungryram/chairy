import { Inter, Barlow_Condensed } from 'next/font/google';
 
export const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--body-font'
});

export const headingFont = Barlow_Condensed({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200','300', '400', '500', '600', '600'],
  variable: '--heading-font'
});