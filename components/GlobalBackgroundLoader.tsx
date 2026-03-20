'use client'

import dynamic from 'next/dynamic'

// Dynamic import with ssr:false must live in a 'use client' file
const GlobalBackground = dynamic(() => import('./GlobalBackground'), { 
  ssr: false,
  loading: () => <div style={{ background: '#000', width: '100%', height: '100%' }} />
})

export default function GlobalBackgroundLoader() {
  return <GlobalBackground />
}
