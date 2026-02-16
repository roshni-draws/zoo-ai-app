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

interface AppState {
  onboarded: boolean
  visitState: VisitState
  user: UserProfile
  currentZoo: string
  activePlan: ActivePlan | null
  audioPlaying: boolean
  audioTitle: string
  assistantOpen: boolean
  selectedExhibit: string | null
  savedAnimals: string[]

  setOnboarded: (v: boolean) => void
  setVisitState: (v: VisitState) => void
  setUser: (u: Partial<UserProfile>) => void
  setActivePlan: (p: ActivePlan | null) => void
  setAudioPlaying: (playing: boolean, title?: string) => void
  setAssistantOpen: (v: boolean) => void
  setSelectedExhibit: (id: string | null) => void
  toggleSavedAnimal: (id: string) => void
  cycleVisitState: () => void
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
  const [audioTitle, setAudioTitle] = useState('')
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [selectedExhibit, setSelectedExhibit] = useState<string | null>(null)
  const [savedAnimals, setSavedAnimals] = useState<string[]>(['lion', 'penguin'])

  const setUser = useCallback((partial: Partial<UserProfile>) => {
    setUserState(prev => ({ ...prev, ...partial }))
  }, [])

  const setAudioPlaying = useCallback((playing: boolean, title?: string) => {
    setAudioPlayingState(playing)
    if (title) setAudioTitle(title)
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

  return (
    <AppContext.Provider
      value={{
        onboarded, visitState, user, currentZoo, activePlan,
        audioPlaying, audioTitle, assistantOpen, selectedExhibit, savedAnimals,
        setOnboarded, setVisitState, setUser, setActivePlan,
        setAudioPlaying, setAssistantOpen, setSelectedExhibit,
        toggleSavedAnimal, cycleVisitState,
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
