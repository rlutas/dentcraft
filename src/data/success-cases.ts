export type CategoryKey =
  | 'aesthetic'
  | 'implantology'
  | 'prosthetics'
  | 'periodontology'
  | 'pediatric'
  | 'treatment'

export type SuccessCase = {
  id: string
  titleNum: number
  categoryKey: CategoryKey
  image: string
  altKey: string
}

export const successCases: SuccessCase[] = [
  { id: 'case-01', titleNum: 1, categoryKey: 'aesthetic', image: '/images/results/case-01.jpeg', altKey: 'aestheticCase' },
  { id: 'case-02', titleNum: 2, categoryKey: 'aesthetic', image: '/images/results/case-02.jpeg', altKey: 'aestheticCase' },
  { id: 'case-03', titleNum: 3, categoryKey: 'aesthetic', image: '/images/results/case-03.jpeg', altKey: 'aestheticCase' },
  { id: 'case-04', titleNum: 4, categoryKey: 'aesthetic', image: '/images/results/case-04.jpeg', altKey: 'aestheticCase' },
]
