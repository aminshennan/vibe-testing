import portfolioData from "@/data/portfolio-data.json"

// Export the portfolio data
export const data = portfolioData

// Type definitions for the portfolio data
export type PortfolioData = typeof portfolioData

// Helper function to get navigation items
export function getNavItems() {
  return data.navigation
}

// Helper function to get personal information
export function getPersonalInfo() {
  return data.personal
}

// Helper function to get about information
export function getAboutInfo() {
  return data.about
}

// Helper function to get experience information
export function getExperienceInfo() {
  return data.experience
}

// Helper function to get credentials information
export function getCredentialsInfo() {
  return data.credentials
}

// Helper function to get technical skills information
export function getTechnicalSkillsInfo() {
  return data.technicalSkills
}

// Helper function to get skills information (alias for technical skills)
export function getSkillsInfo() {
  return data.technicalSkills
}

// Helper function to get meta information
export function getMetaInfo() {
  return data.meta
}

// Missing functions that are used in pages but not exported
export function getPortfolioData() {
  return data
}

export function getExperienceData() {
  return data.experience
}

export function getEducationData() {
  return data.about.degrees
}
