'use client'

import { useEffect, useState } from 'react'
import type { GyroscopeValues } from '@/types'

export function useGyroscope(): GyroscopeValues {
  const [values, setValues] = useState<GyroscopeValues>({ beta: 0, gamma: 0 })

  useEffect(() => {
    const requestAndListen = async () => {
      // iOS 13+ requires permission
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const permission = await (DeviceOrientationEvent as any).requestPermission()
          if (permission !== 'granted') return
        } catch {
          return
        }
      }

      const handler = (e: DeviceOrientationEvent) => {
        const beta = e.beta != null ? Math.max(-90, Math.min(90, e.beta)) / 90 : 0
        const gamma = e.gamma != null ? Math.max(-90, Math.min(90, e.gamma)) / 90 : 0
        setValues({ beta, gamma })
      }

      window.addEventListener('deviceorientation', handler)
      return () => window.removeEventListener('deviceorientation', handler)
    }

    requestAndListen()
  }, [])

  return values
}
