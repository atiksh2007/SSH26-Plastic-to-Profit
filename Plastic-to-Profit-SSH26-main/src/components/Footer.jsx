import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { name: 'Marketplace', path: '/marketplace' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'How It Works', path: '/#features' },
      { name: 'Pricing', path: '/#pricing' }
    ],
    Company: [
      { name: 'About Us', path: '/#about' },
      { name: 'Our Mission', path: '/#mission' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' }
    ],
    Resources: [
      { name: 'Help Center', path: '/help' },
      { name: 'API Documentation', path: '/docs' },
      { name: 'Community', path: '/community' },
      { name: 'Contact', path: '/contact' }
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Compliance', path: '/compliance' }
    ]
  };

  return (
<footer id="support" className="bg-black text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-olive-600 opacity-5 rounded-full -translate-x-32 -translate-y-32 animate-fadeInUp "></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-olive-600 opacity-5 rounded-full translate-x-48 translate-y-48 animate-fadeInUp"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative animate-fadeInUp">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 animate-fadeInUp">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-12 h-12 bg-olive-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">♻</span>
              </div>
              <span className="text-2xl font-bold">
                Plastic<span className="text-olive-600">Profit</span>
              </span>
            </Link>
            
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Transforming plastic waste into economic opportunity. Join thousands of businesses creating a circular economy.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-olive-600 transition-all duration-300 hover:scale-110"
                  aria-label={social}
                >
                  <span className="text-xl">
                    {social === 'twitter' && '𝕏'}
                    {social === 'linkedin' && 'in'}
                    {social === 'facebook' && 'f'}
                    {social === 'instagram' && '📷'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-bold mb-4 text-white">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-olive-600 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Get the latest on sustainable recycling and marketplace updates.
              </p>
            </div>
            
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-olive-600 w-full md:w-64"
              />
              <button className="px-6 py-3 bg-olive-600 text-white font-semibold rounded-r-lg hover:bg-olive-700 transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} PlasticProfit. All rights reserved. Built with ♻️ for a sustainable future.
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-olive-600 transition-colors duration-200">
              Accessibility
            </a>
            <a href="#" className="text-gray-400 hover:text-olive-600 transition-colors duration-200">
              Sitemap
            </a>
            <a href="#" className="text-gray-400 hover:text-olive-600 transition-colors duration-200">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;