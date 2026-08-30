'use client';

import { useEffect, useRef, useState } from 'react';
import { upcomingEvents } from '@/lib/events';

const ICON_BY_TYPE = { amavasai: '🌑', pournami: '🌕', festival: '🎉' };
const LABEL_BY_TYPE = { amavasai: 'அமாவாசை', pournami: 'பௌர்ணமி', festival: 'திருவிழா' };

function EventItem({ event }) {
  return (
    <span className="marquee-item">
      <span className="marquee-label">
        {ICON_BY_TYPE[event.type]} {LABEL_BY_TYPE[event.type]}
      </span>
      <span className="marquee-date">{event.dateStr}</span>
      {event.eventName && (
        <>
          <span className="marquee-separator">|</span>
          <span className="marquee-event-name">{event.eventName}</span>
        </>
      )}
      {event.tamilDate && (
        <>
          <span className="marquee-separator">|</span>
          <span className="marquee-tamil-date">{event.tamilDate}</span>
        </>
      )}
      {event.weekday && (
        <>
          <span className="marquee-separator">|</span>
          <span className="marquee-day">{event.weekday}</span>
        </>
      )}
      {event.house && (
        <>
          <span className="marquee-separator">|</span>
          <span className="marquee-house">{event.house} கோவில் வீடு</span>
        </>
      )}
    </span>
  );
}

export default function Marquee() {
  // upcomingEvents() is a pure, synchronous read of shared static data
  // (no network fetch, unlike the original DOM-parsing version), so it
  // can be computed once up front instead of via an effect.
  const [events] = useState(() => upcomingEvents(2));
  const trackRef = useRef(null);
  const marqueeRef = useRef(null);

  // Publishes the real rendered header/marquee heights as CSS
  // variables so body padding + the marquee's fixed `top` always
  // match, on any screen size or after the webfont swaps in.
  useEffect(() => {
    function updateOffsets() {
      const header = document.querySelector('header');
      if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
      }
      if (marqueeRef.current) {
        document.documentElement.style.setProperty('--marquee-height', `${marqueeRef.current.offsetHeight}px`);
      }
    }

    updateOffsets();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateOffsets);
    }

    let frame = null;
    const onResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        updateOffsets();
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [events]);

  useEffect(() => {
    if (!events.length || !trackRef.current) return;
    const track = trackRef.current;
    const halfWidth = track.scrollWidth / 2;
    const pixelsPerSecond = 70;
    const duration = Math.max(12, halfWidth / pixelsPerSecond);
    track.style.setProperty('--marquee-duration', `${duration}s`);
  }, [events]);

  const isStatic = events.length === 0;

  return (
    <div className={`temple-marquee${isStatic ? ' marquee-static' : ''}`} id="temple-marquee" ref={marqueeRef}>
      <div className="marquee-track" id="marquee-track" ref={trackRef}>
        {isStatic && (
          <span className="marquee-item marquee-message">
            🛕 அடுத்த விசேஷ நாட்களின் விவரங்கள் விரைவில் அறிவிக்கப்படும்.
          </span>
        )}
        {events.length > 0 && (
          <>
            {[0, 1].map((copy) => (
              <span key={copy} style={{ display: 'contents' }}>
                <span className="marquee-item marquee-lead">🛕 அடுத்த விசேஷ நாட்கள் :</span>
                {events.map((event, i) => (
                  <EventItem key={`${copy}-${i}`} event={event} />
                ))}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
