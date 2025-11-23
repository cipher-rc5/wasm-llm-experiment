import React from 'react';

interface LoadingScreenProps {
  progress: number;
  status: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, status }) => {
  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center text-white'>
      <div className='absolute inset-0 bg-gradient-to-br from-cipher-dark/80 to-black/90' />
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cipher-gold/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cipher-gold/5 rounded-full blur-3xl animate-pulse delay-700' />
      </div>

      <div className='relative z-10 text-center'>
        {/* Logo */}
        <div className='border-2 border-cipher-gold/40 px-8 py-6 mb-12'>
          <h1 className='text-6xl font-mono tracking-widest text-cipher-gold'>CIPHER</h1>
        </div>

        {/* Loading Status */}
        <div className='space-y-6'>
          <div className='text-cipher-gold font-mono text-lg'>{status}</div>

          {/* Progress Bar */}
          <div className='w-80 mx-auto'>
            <div className='bg-cipher-gray/30 border border-cipher-gold/30 rounded-full h-2'>
              <div className='bg-cipher-gold h-full rounded-full transition-all duration-300' style={{ width: `${progress}%` }} />
            </div>
            <div className='text-cipher-gold/60 font-mono text-sm mt-2'>{progress}%</div>
          </div>

          {/* Loading Animation */}
          <div className='flex justify-center space-x-2 mt-8'>
            <div className='w-2 h-2 bg-cipher-gold rounded-full animate-bounce' />
            <div className='w-2 h-2 bg-cipher-gold rounded-full animate-bounce delay-100' />
            <div className='w-2 h-2 bg-cipher-gold rounded-full animate-bounce delay-200' />
          </div>

          <div className='text-cipher-gold/60 font-mono text-sm mt-8'>
            Initializing Large Language Model...
            <br />
            This may take a few minutes on first load.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
