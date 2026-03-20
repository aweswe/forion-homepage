import { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'forion',
    number: '01 / 04',
    name: 'Forion',
    tagline: 'The orchestration core.',
    description:
      'The central nervous system of your AI stack. Forion routes intelligence across agents, models, and services — with stateful memory, edge-native execution, and zero-latency switching between providers.',
    pills: ['Multi-Agent Routing', 'State Management', 'Edge Runtime'],
    href: '#',
    sceneKey: 'forion',
  },
  {
    id: 'sparke',
    number: '02 / 04',
    name: 'Sparke',
    tagline: 'Inference at the speed of thought.',
    description:
      'A unified inference gateway that abstracts away model complexity. Sparke optimizes routing between LLM providers in real-time, balancing cost, latency, and capability with sub-millisecond decisions.',
    pills: ['Inference Gateway', 'Provider Abstraction', 'Cost Optimization'],
    href: '#',
    sceneKey: 'sparke',
  },
  {
    id: 'cloyde',
    number: '03 / 04',
    name: 'Cloyde',
    tagline: 'Memory that persists across the void.',
    description:
      'Long-term memory infrastructure for AI agents. Cloyde stores, indexes, and retrieves contextual knowledge at scale — enabling agents to learn, adapt, and recall across sessions and deployments.',
    pills: ['Vector Storage', 'Semantic Retrieval', 'Agent Memory'],
    href: '#',
    sceneKey: 'cloyde',
  },
  {
    id: 'orbit',
    number: '04 / 04',
    name: 'Orbit',
    tagline: 'Observability beyond the event horizon.',
    description:
      'Deep observability for AI systems. Orbit traces every agent decision, token, and tool call — giving you full visibility into what your AI is doing, why, and how to make it better.',
    pills: ['Agent Tracing', 'Token Analytics', 'Decision Logging'],
    href: '#',
    sceneKey: 'orbit',
  },
]
