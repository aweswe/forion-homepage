'use client'

import { useCallback, useRef, useState } from 'react'

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)

  const start = useCallback(() => {
    const ctx = new AudioContext()
    ctxRef.current = ctx

    const bufferSize = ctx.sampleRate * 4
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.04
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 400

    const gain = ctx.createGain()
    gain.gain.value = 0.15
    gainRef.current = gain

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start()
    sourceRef.current = source
  }, [])

  const stop = useCallback(() => {
    if (gainRef.current) {
      gainRef.current.gain.setTargetAtTime(0, ctxRef.current!.currentTime, 0.5)
    }
    setTimeout(() => {
      sourceRef.current?.stop()
      ctxRef.current?.close()
    }, 1000)
  }, [])

  const toggle = () => {
    if (enabled) {
      stop()
    } else {
      start()
    }
    setEnabled((v) => !v)
  }

  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        bottom: 32,
        left: 32,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: enabled ? '#888' : '#333',
        background: 'transparent',
        border: '1px solid',
        borderColor: enabled ? '#333' : '#1a1a1a',
        padding: '6px 10px',
        zIndex: 100,
        transition: 'color 0.3s, border-color 0.3s',
      }}
    >
      {enabled ? '◉ ambient on' : '○ ambient off'}
    </button>
  )
}
