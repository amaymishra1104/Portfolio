import DesktopEnvironment from '@/components/desktop/DesktopEnvironment';

export const metadata = {
  title: 'Amay OS | Desktop Experience',
  description: 'Interactive Desktop OS style portfolio for Amay Mishra',
};

export default function DesktopPage() {
  return (
    <main className="w-full min-h-screen bg-black">
      <DesktopEnvironment />
    </main>
  );
}
