export interface ProjectType {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
  slug?: string
}

export interface BlogPostType {
  slug: string
  title: string
  excerpt: string
  content?: string
  date: string
  readingTime: number
  coverImage?: string
  tags: string[]
  author: {
    name: string
    title: string
    avatar?: string
  }
}

export interface SkillType {
  name: string
  level: number
  category: string
}

export interface ProfileType {
  name: string
  title: string
  bio: string
  avatar: string
  email: string
  phone: string
  location: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface ExperienceType {
  company: string
  position: string
  description: string
  startDate: string
  endDate: string | null
  current: boolean
}

export interface EducationType {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string | null
  current: boolean
}

export interface HeadingType {
  id: string
  text: string
  level: number
}
