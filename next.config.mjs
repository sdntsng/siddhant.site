const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // dynamic mode for Cloudflare
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/meet',
        destination: 'https://calendar.app.google/2NFbAy4kHjsXmwPR6',
        permanent: false,
      },
      {
        source: '/wa',
        destination: 'https://chat.whatsapp.com/KWXcQb0oUMR7rqDMR4BERb',
        permanent: false,
      },
      {
        source: '/resume',
        destination: 'https://drive.google.com/file/d/10s8OzQP12PJVdWOIrd0M6_H67nzHk1bo/view?usp=drive_link',
        permanent: false,
      },
      {
        source: '/li',
        destination: 'https://www.linkedin.com/in/singhsiddhant/',
        permanent: false,
      },
      {
        source: '/ig',
        destination: 'https://www.instagram.com/founder.vs.market',
        permanent: false,
      },
      {
        source: '/fb',
        destination: 'https://fb.me/SiddhantSingh.me',
        permanent: false,
      },
      {
        source: '/music',
        destination: 'https://soundcloud.com/cidic96',
        permanent: false,
      },
      {
        source: '/paypal',
        destination: 'https://paypal.me/siddhaaant',
        permanent: false,
      },
      {
        source: '/feedback',
        destination: 'https://forms.gle/gZnRdbdVoLf27WU78',
        permanent: false,
      },
    ];
  },
};


export default nextConfig;
