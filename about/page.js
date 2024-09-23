// app/about/page.js
import  Image  from 'next/image';

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our site. Here&rsquo;s what we do.</p>
    
        <h2>Welcome to Next.js Hotel Resort</h2>
        <p>Find the best hotel rooms and enjoy your stay</p>
        <p>Home away from home</p>
        <Image
  src="img\hotel1.png"
  alt="Sunset"
  width={600}
  height={450}
  unoptimized={true}
  loading="eager"
  layout="fixed"
/>
    </div>
  );
}
;

  
