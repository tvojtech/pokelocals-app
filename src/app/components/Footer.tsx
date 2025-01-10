import { CurrentYear } from '@/app/components/CurrentYear';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t text-gray-800 print:hidden">
      <div className="container mx-auto px-4 py-4 text-center">
        <p>
          &copy; <CurrentYear /> blaf. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
