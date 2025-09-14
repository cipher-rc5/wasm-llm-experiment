import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-cipher-gold/20">
        <div className="flex items-center space-x-2">
          <span className="text-cipher-gold text-sm font-mono">POWERED BY</span>
          <div className="w-6 h-6 bg-cipher-gold/20 rounded border border-cipher-gold/40" />
        </div>

        <nav className="flex space-x-8">
          <a
            href="#"
            className="text-cipher-gold hover:text-white transition-colors text-sm font-mono tracking-wide"
          >
            HOME
          </a>
          <a
            href="#"
            className="text-cipher-gold hover:text-white transition-colors text-sm font-mono tracking-wide"
          >
            AGENTS
          </a>
          <a
            href="#"
            className="text-cipher-gold hover:text-white transition-colors text-sm font-mono tracking-wide"
          >
            CONCEPTS
          </a>
          <a
            href="#"
            className="text-cipher-gold hover:text-white transition-colors text-sm font-mono tracking-wide"
          >
            FORGE
          </a>
        </nav>

        <div className="bg-cipher-gray px-4 py-2 rounded border border-cipher-gold/30">
          <span className="text-cipher-gold text-sm font-mono">SELECT WALLET</span>
        </div>
      </div>

      {/* Main Logo */}
      <div className="flex justify-center py-16">
        <div className="border-2 border-cipher-gold/40 px-12 py-8">
          <h1 className="text-8xl font-mono tracking-widest text-cipher-gold">
            CIPHER
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
