import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Home, User, Grid3x3, Code, Mail, Moon } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { NAV_LINKS } from '../../utils/constants';

const navIcons: Record<string, any> = {
  home: Home,
  about: User,
  projects: Grid3x3,
  skills: Code,
  contact: Mail,
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { isVisible } = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      // Track if user has scrolled past hero section (roughly 80vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.substring(1);

    if (id === 'home') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
          {/* Navigation Bar Container */}
          <div
            className={`rounded-full px-4 py-2 flex items-center gap-2 border shadow-lg transition-all duration-500 ${isScrolled
                ? 'bg-[#2a2a2a] border-white/10'
                : 'bg-white/5 backdrop-blur-md border-white/10'
              }`}
          >
            {/* Navigation Items */}
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              const IconComponent = navIcons[sectionId] || Home;

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isActive
                      ? isScrolled
                        ? 'bg-[#1a1a1a]'
                        : 'bg-white/10'
                      : 'hover:bg-white/5'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent
                    size={18}
                    className={`${isActive ? 'text-white' : 'text-white/70'
                      }`}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  <span className={`text-sm font-normal ${isActive ? 'text-white' : 'text-white/90'
                    }`}>
                    {link.label}
                  </span>
                </motion.a>
              );
            })}

            {/* Separator */}
            <div className="w-px h-6 bg-white/20 mx-2" />

            {/* Dark Mode Toggle */}
            <motion.button
              className={`p-2 rounded-full transition-colors ${isScrolled ? 'bg-[#2a2a2a] hover:bg-[#1a1a1a]' : 'bg-white/5 hover:bg-white/10'
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              <Moon size={18} className="text-white/90" strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden fixed top-6 right-6 p-3 rounded-full bg-[#2a2a2a] border border-white/10 text-white hover:bg-[#1a1a1a] transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.div>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed top-20 right-6 bg-[#2a2a2a] rounded-lg border border-white/10 shadow-lg overflow-hidden z-50"
              >
                <div className="py-2 min-w-[200px]">
                  {NAV_LINKS.map((link, index) => {
                    const sectionId = link.href.substring(1);
                    const isActive = activeSection === sectionId;
                    const IconComponent = navIcons[sectionId] || Home;

                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${isActive
                            ? 'bg-[#1a1a1a] text-white'
                            : 'text-white/90 hover:bg-white/5'
                          }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <IconComponent size={18} strokeWidth={isActive ? 2 : 1.5} />
                        <span className="text-sm">{link.label}</span>
                      </motion.a>
                    );
                  })}
                  <div className="h-px bg-white/20 my-2" />
                  <motion.button
                    className="flex items-center gap-3 px-4 py-3 w-full text-white/90 hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAV_LINKS.length * 0.05 }}
                  >
                    <Moon size={18} strokeWidth={1.5} />
                    <span className="text-sm">Dark Mode</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

