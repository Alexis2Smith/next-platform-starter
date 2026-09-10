import '../styles/globals.css';

export const metadata = {
  title: {
    template: '%s | Ascend AI NOW',
    default: 'Ascend AI NOW | Digital Headquarters',
  },
  description: 'Executive AI governance command center for Ascend AI NOW, LLC.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
