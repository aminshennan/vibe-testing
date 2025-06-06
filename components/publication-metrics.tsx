import { BookOpenIcon, QuoteIcon, AwardIcon, TrendingUpIcon, UsersIcon, GlobeIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { PublicationMetrics } from "@/lib/publications-data"

interface PublicationMetricsProps {
  metrics: PublicationMetrics
}

export function PublicationMetrics({ metrics }: PublicationMetricsProps) {
  const metricItems = [
    {
      icon: BookOpenIcon,
      label: "Total Publications",
      value: metrics.totalPublications.toString(),
      color: "text-primary-navy",
      bgColor: "bg-primary-navy/10",
      borderColor: "border-primary-navy/20"
    },
    {
      icon: QuoteIcon,
      label: "Total Citations",
      value: metrics.totalCitations.toString(),
      color: "text-academic-green",
      bgColor: "bg-academic-green/10",
      borderColor: "border-academic-green/20"
    },
    {
      icon: AwardIcon,
      label: "h-Index",
      value: metrics.hIndex.toString(),
      color: "text-accent-burgundy",
      bgColor: "bg-accent-burgundy/10",
      borderColor: "border-accent-burgundy/20"
    },
    {
      icon: TrendingUpIcon,
      label: "i10-Index",
      value: metrics.i10Index.toString(),
      color: "text-accent-gold",
      bgColor: "bg-accent-gold/10",
      borderColor: "border-accent-gold/20"
    },
    {
      icon: UsersIcon,
      label: "Collaborative Papers",
      value: metrics.collaborativePublications.toString(),
      color: "text-primary-navy",
      bgColor: "bg-primary-navy/10",
      borderColor: "border-primary-navy/20"
    },
    {
      icon: GlobeIcon,
      label: "Open Access",
      value: metrics.openAccessPublications.toString(),
      color: "text-academic-green",
      bgColor: "bg-academic-green/10",
      borderColor: "border-academic-green/20"
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