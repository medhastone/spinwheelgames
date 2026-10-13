import { permanentRedirect } from 'next/navigation';

export const dynamic = 'force-static';

export default function Roll1d4Page() {
  permanentRedirect('/dice/d4');
}
