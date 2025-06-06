import { DollarSignIcon, BookOpenIcon, UsersIcon, BuildingIcon, FlaskConicalIcon, TrendingUpIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { ResearchImpact } from "@/lib/research-data"

interface ResearchMetricsProps {
  metrics: ResearchImpact
}

export function ResearchMetrics({ metrics }: ResearchMetricsProps) {
  const metricItems = [
    {
      icon: DollarSignIcon,
      label: "Total Funding",
      value: metrics.totalFunding,
      color: "text-academic-green",
      bgColor: "bg-academic-green/10",
      borderColor: "border-academic-green/20"
    },
    {
      icon: BookOpenIcon,
      label: "Publications",
      value: metrics.totalPublications.toString(),
      color: "text-primary-navy",
      bgColor: "bg-primary-navy/10",
      borderColor: "border-primary-navy/20"
    },
    {
      icon: UsersIcon,
      label: "Students Mentored",
      value: metrics.totalStudents.toString(),
      color: "text-accent-burgundy",
      bgColor: "bg-accent-burgundy/10",
      borderColor: "border-accent-burgundy/20"
    },
    {
      icon: BuildingIcon,
      label: "Collaborating Institutions",
      value: metrics.collaboratingInstitutions.toString(),
      color: "text-accent-gold",
      bgColor: "bg-accent-gold/10",
      borderColor: "border-accent-gold/20"
    },
    {
      icon: FlaskConicalIcon,
      label: "Active Projects",
      value: metrics.ongoingProjects.toString(),
      color: "text-academic-green",
      bgColor: "bg-academic-green/10",
      borderColor: "border-academic-green/20"
    },
    {
      icon: TrendingUpIcon,
      label: "Completed Projects",
      value: metrics.completedProjects.toString(),
      color: "text-primary-navy",
      bgColor: "bg-primary-navy/10",
      borderColor: "border-primary-navy/20"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {metricItems.map((item, index) => {
        const IconComponent = item.icon
        
        return (
          <Card 
            key={index} 
            className={`${item.bgColor} ${item.borderColor} border backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
          >
            <CardContent className="p-4 text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${item.bgColor} ${item.borderColor} border mb-3`}>
                <IconComponent className={`w-5 h-5 ${item.color}`} />
              </div>
              
              <div className="space-y-1">
                <p className={`text-2xl font-bold ${item.color} font-serif`}>
                  {item.value}
                </p>
                <p className="text-xs text-academic-slate-600 font-medium leading-tight">
                  {item.label}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 