import localFont from 'next/font/local';

// Configura la fuente Blatant desde los archivos locales
export const blatant = localFont({
  src: [
    {
      path: '../public/fonts/Blatant.otf',
      weight: '400',
      style: 'normal',
    },
    // Agrega más variantes si las tienes (bold, italic, etc.)
  ],
  variable: '--font-blatant', // Para usar como variable CSS
  display: 'swap',
});