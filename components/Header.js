'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks, site } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const navRef = useRef(null);
  const btnRef = useRef(null);

  // Closes the mobile menu on navigation without an effect (React's
  // documented "adjust state during render" pattern for props/route
  // changes), since useEffect(..., [pathname]) would fire after paint.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onDocClick(event) {
      if (
        open &&
        !btnRef.current?.contains(event.target) &&
        !navRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header>
      <div className="nav-container">
        <div className="site-branding">
          <div className="temple-logo" style={{ position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/assets/temple-2.jpg"
              alt={site.name}
              fill
              sizes="100px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="site-title-wrapper">
            <h4>{site.name}</h4>
            <p>{site.place}</p>
          </div>
        </div>

        <button
          ref={btnRef}
          type="button"
          className={`mobile-menu-btn${open ? ' active' : ''}`}
          id="menu-btn"
          aria-controls="nav-links"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <nav>
          <ul id="nav-links" ref={navRef} className={`mobile-menu${open ? ' show' : ''}`}>
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link href={link.href} className={isActive ? 'active' : undefined}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
