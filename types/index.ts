export interface MoonConfig {
  r: number
  dist: number
  angle: number
  color: string
}

export interface SceneConfig {
  bg: string
  primaryColor: [number, number, number]
  planetSize: number
  planetX: number
  planetY: number
  rings: boolean
  ringColor: string
  glowColor: string
  moons: MoonConfig[]
  satelliteColor: string
}

export interface Product {
  id: string
  number: string
  name: string
  tagline: string
  description: string
  pills: string[]
  href: string
  sceneKey: string
}

export interface ParallaxValues {
  scrollY: number
  mouseX: number
  mouseY: number
}

export interface GyroscopeValues {
  beta: number
  gamma: number
}
