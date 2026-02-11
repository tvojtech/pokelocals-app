import { CurrentYear } from '@/components/CurrentYear';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-transparent print:hidden">
      <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground sm:text-sm">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-between">
          <p className="whitespace-nowrap text-center sm:text-left">
            &copy; <CurrentYear /> POK&#201; LOCALS. All rights reserved.
          </p>

          <div className="flex flex-nowrap items-center gap-3 whitespace-nowrap">
            <a href="mailto:info@pokelocals.online" className="transition-colors hover:text-foreground">
              info@pokelocals.online
            </a>
            <a
              href="https://x.com/pokelocals"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="inline-flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-foreground hover:text-background">
              <span className="sr-only">Twitter</span>
              <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>

          <nav aria-label="Footer links" className="flex flex-nowrap items-center gap-3 whitespace-nowrap">
            <a
              href="https://www.pokelocals.online/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap transition-colors hover:text-foreground">
              Privacy policy
            </a>
            <a
              href="https://www.pokelocals.online/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap transition-colors hover:text-foreground">
              Terms of service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
