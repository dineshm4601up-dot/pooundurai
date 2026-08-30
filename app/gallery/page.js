import Image from 'next/image';
import { galleryImages } from '@/lib/gallery';

export const metadata = {
  title: 'புகைப்படங்கள்',
  description: 'அம்பாள் திவ்ய தரிசனம் - ஸ்ரீ பெரியகாண்டியம்மன் கோவில் புகைப்படங்கள்.',
};

export default function GalleryPage() {
  return (
    <div className="container">
      <div className="page-title">
        <h2>அம்பாள் திவ்ய தரிசனம்</h2>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((img, i) => (
          <div className="gallery-item" key={img.src}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              loading={i < 3 ? undefined : 'lazy'}
              priority={i < 3}
            />
            <div className="gallery-caption" />
          </div>
        ))}
      </div>
    </div>
  );
}
