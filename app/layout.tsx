import clsx from 'clsx';
// Components
import Provider from '@/components/Provider';
import Sidebar from '@/components/Sidebar';
// Styles
import '@/stylesheets/globals.css';
import '@/stylesheets/fonts.css';

export const metadata = {
  title: 'Multi-step Form | Frontend Mentor',
  description: 'Created with Next.js, React Hook Form and Tailwind',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-magnolia font-ubuntu h-full flex flex-col justify-start lg:justify-center items-center">
        <main className="font-normal relative w-full max-w-lg lg:max-w-[940px]">
          <div className="lg:bg-white w-full flex flex-col lg:flex-row px-4 lg:p-4 rounded-2xl lg:shadow-lg">
            <Sidebar />
            <Provider>{children}</Provider>
          </div>
          <footer
            className={clsx(
              'absolute -bottom-16 lg:-bottom-12',
              'py-4 px-4',
              'text-xs lg:text-sm text-cool-gray',
              'flex flex-col gap-x-1 lg:flex-row justify-center w-full items-center'
            )}
          >
            <span>
              Challenge by{' '}
              <a
                href="https://www.frontendmentor.io?ref=challenge"
                target="_blank"
                className="text-marine-blue"
              >
                Frontend Mentor
              </a>
              .
            </span>
            <span>
              Coded by{' '}
              <a
                href="https://github.com/waldosmuts"
                target="_blank"
                className="text-marine-blue"
              >
                Waldo
              </a>
              .
            </span>
          </footer>
        </main>
      </body>
    </html>
  );
}
