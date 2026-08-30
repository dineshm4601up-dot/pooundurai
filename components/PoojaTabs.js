'use client';

import { useState } from 'react';
import { poojaDetails } from '@/lib/pooja-details';

export default function PoojaTabs() {
  const [active, setActive] = useState(poojaDetails[0].key);

  return (
    <section className="pooja-details-section">
      <div className="pooja-tabs" role="tablist" aria-label="சிறப்பு பூஜைகள்">
        {poojaDetails.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`pooja-tab${active === item.key ? ' active' : ''}`}
            role="tab"
            aria-selected={active === item.key}
            onClick={() => setActive(item.key)}
          >
            <span className="pooja-tab-icon">{item.icon}</span>
            <span className="pooja-tab-text">{item.tabText}</span>
          </button>
        ))}
      </div>

      <div className="pooja-description-panel">
        {poojaDetails.map((item) => (
          <div
            key={item.key}
            className={`pooja-description${active === item.key ? ' active' : ''}`}
          >
            <h3 className="pooja-description-title">{item.title}</h3>
            <div className="pooja-description-text">
              {item.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
