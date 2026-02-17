import React, { createContext, useContext, useState, useCallback } from 'react'

export type VisitState = 'discovery' | 'pre-visit' | 'in-park' | 'post-visit'
export type GroupType = 'solo' | 'couple' | 'family' | 'group' | null

export interface FamilyMember {
  name: string
  age: number
  relationship: string
}

export interface UserProfile {
  name: string
  avatar: string
  memberSince: string
  groupType: GroupType
  familyMembers: FamilyMember[]
  interests: string[]
  accessibility: string[]
  visits: number
  animalsSeen: number
  distanceWalked: number
}

export interface PlanStop {
  id: string
  name: string
  emoji: string
  time: string
  duration: string
  insight: string
  completed: boolean
}

export interface ActivePlan {
  date: string
  stops: PlanStop[]
  totalDuration: string
  distance: string
}

export interface VisitedExhibit {
  id: string
  visitedAt: string
  dwellMinutes: number
}

interface AppState {
  onboarded: boolean
  visitState: VisitState
  user: UserProfile
  currentZoo: string
  activePlan: ActivePlan | null
  audioPlaying: boolean
  audioPaused: boolean
  audioTitle: string
  audioExpanded: boolean
  audioDepth: 'quick' | 'standard' | 'deep'
  audioAutoPlay: boolean
  assistantOpen: boolean
  selectedExhibit: string | null
  savedAnimals: string[]
  wanderMode: boolean
  visitedExhibits: VisitedExhibit[]
  sensorySensitivity: boolean
  simplifiedMode: boolean
  collectedStamps: number

  setOnboarded: (v: boolean) => void
  setVisitState: (v: VisitState) => void
  setUser: (u: Partial<UserProfile>) => void
  setActivePlan: (p: ActivePlan | null) => void
  setAudioPlaying: (playing: boolean, title?: string) => void
  setAudioPaused: (v: boolean) => void
  setAudioExpanded: (v: boolean) => void
  setAudioDepth: (v: 'quick' | 'standard' | 'deep') => void
  setAudioAutoPlay: (v: boolean) => void
  setAssistantOpen: (v: boolean) => void
  setSelectedExhibit: (id: string | null) => void
  toggleSavedAnimal: (id: string) => void
  cycleVisitState: () => void
  setWanderMode: (v: boolean) => void
  markExhibitVisited: (id: string, dwellMinutes: number) => void
  setSensorySensitivity: (v: boolean) => void
  setSimplifiedMode: (v: boolean) => void
}

const defaultUser: UserProfile = {
  name: 'Alex',
  avatar: '🦁',
  memberSince: 'Jan 2025',
  groupType: 'family',
  familyMembers: [
    { name: 'Jordan', age: 35, relationship: 'Partner' },
    { name: 'Ella', age: 7, relationship: 'Child' },
    { name: 'Kai', age: 4, relationship: 'Child' },
  ],
  interests: ['Big Cats', 'Elephants', 'Marine Life', 'Conservation'],
  accessibility: ['Stroller required'],
  visits: 3,
  animalsSeen: 47,
  distanceWalked: 14.2,
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [onboarded, setOnboarded] = useState(false)
  const [visitState, setVisitState] = useState<VisitState>('discovery')
  const [user, setUserState] = useState<UserProfile>(defaultUser)
  const [currentZoo] = useState('San Diego Zoo')
  const [activePlan, setActivePlan] = useState<ActivePlan | null>(null)
  const [audioPlaying, setAudioPlayingState] = useState(false)
  const [audioPaused, setAudioPaused] = useState(false)
  const [audioTitle, setAudioTitle] = useState('')
  const [audioExpanded, setAudioExpanded] = useState(false)
  const [audioDepth, setAudioDepth] = useState<'quick' | 'standard' | 'deep'>('standard')
  const [audioAutoPlay, setAudioAutoPlay] = useState(true)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [selectedExhibit, setSelectedExhibit] = useState<string | null>(null)
  const [savedAnimals, setSavedAnimals] = useState<string[]>(['lion', 'penguin'])
  const [wanderMode, setWanderMode] = useState(false)
  const [sensorySensitivity, setSensorySensitivity] = useState(false)
  const [simplifiedMode, setSimplifiedMode] = useState(false)
  const [visitedExhibits, setVisitedExhibits] = useState<VisitedExhibit[]>([
    { id: 'lion', visitedAt: '9:15 AM', dwellMinutes: 12 },
    { id: 'giraffe', visitedAt: '9:45 AM', dwellMinutes: 8 },
  ])

  const setUser = useCallback((partial: Partial<UserProfile>) => {
    setUserState(prev => ({ ...prev, ...partial }))
  }, [])

  const setAudioPlaying = useCallback((playing: boolean, title?: string) => {
    setAudioPlayingState(playing)
    if (title) setAudioTitle(title)
    if (playing) setAudioPaused(false)
    if (!playing) setAudioExpanded(false)
  }, [])

  const toggleSavedAnimal = useCallback((id: string) => {
    setSavedAnimals(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }, [])

  const cycleVisitState = useCallback(() => {
    setVisitState(prev => {
      const states: VisitState[] = ['discovery', 'pre-visit', 'in-park', 'post-visit']
      const idx = states.indexOf(prev)
      return states[(idx + 1) % states.length]
    })
  }, [])

  const markExhibitVisited = useCallback((id: string, dwellMinutes: number) => {
    setVisitedExhibits(prev => {
      if (prev.some(e => e.id === id)) return prev
      return [...prev, { id, visitedAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), dwellMinutes }]
    })
  }, [])

  const collectedStamps = visitedExhibits.length

  return (
    <AppContext.Provider
      value={{
        onboarded, visitState, user, currentZoo, activePlan,
        audioPlaying, audioPaused, audioTitle, audioExpanded, audioDepth, audioAutoPlay,
        assistantOpen, selectedExhibit, savedAnimals,
        wanderMode, visitedExhibits,
        sensorySensitivity, simplifiedMode, collectedStamps,
        setOnboarded, setVisitState, setUser, setActivePlan,
        setAudioPlaying, setAudioPaused, setAudioExpanded, setAudioDepth, setAudioAutoPlay,
        setAssistantOpen, setSelectedExhibit,
        toggleSavedAnimal, cycleVisitState,
        setWanderMode, markExhibitVisited,
        setSensorySensitivity, setSimplifiedMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
