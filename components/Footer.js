import { site } from '@/lib/site';
import CurrentYear from './CurrentYear';

export default function Footer() {
  return (
    <footer>
      <p>
        <strong>{site.name}</strong> - {site.place}
      </p>
      <p>
        &copy; <CurrentYear /> அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
      </p>
      <p>
        <small>
          Developed by{' '}
          <a href={site.developer.url} target="_blank" rel="noopener">
            {site.developer.name}
          </a>
        </small>
      </p>
    </footer>
  );
}
