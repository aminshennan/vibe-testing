import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, DownloadIcon, QuoteIcon, CalendarIcon, UsersIcon, TagIcon, EyeIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import type { Publication, JournalArticle, BookChapter, ConferenceProceeding, WorkingPaper } from "@/lib/publications-data"
import { formatAPACitation, getPublicationTypeBadgeColor, getPublicationTypeLabel } from "@/lib/publications-data"

interface PublicationCardProps {
  publication: Publication
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const publicationType = getPublicationTypeLabel(publication)
  const typeColor = getPublicationTypeBadgeColor(publication)

  const renderPublicationSpecificInfo = () => {
    if ('journal' in publication) {
      const journalPub = publication as JournalArticle
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-primary-navy">{journalPub.journal}</span>
            <span className="text-academic-slate-500">•</span>
            <span className="text-academic-slate-600">
              Vol. {journalPub.volume}, Issue {journalPub.issue}, pp. {journalPub.pages}
            </span>
            <span className="text-academic-slate-500">•</span>
            <span className="text-academic-slate-600">{journalPub.year}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-primary-navy/10 border-primary-navy/20 text-primary-navy">
              Impact Factor: {journalPub.impactFactor}
            </Badge>
            <Badge variant="outline" className="text-xs bg-academic-green/10 border-academic-green/20 text-academic-green">
              {journalPub.quartile}
            </Badge>
            {journalPub.isOpenAccess && (
              <Badge variant="outline" className="text-xs bg-accent-gold/10 border-accent-gold/20 text-accent-gold">
                Open Access
              </Badge>
            )}
          </div>
        </div>
      )
    }

    if ('bookTitle' in publication) {
      const bookPub = publication as BookChapter
      return (
        <div className="space-y-3">
          <div className="text-sm">
            <p className="text-academic-slate-600">
              In: <span className="font-medium text-primary-navy">{bookPub.bookTitle}</span>
            </p>
            <p className="text-academic-slate-600">
              Editors: {bookPub.editors.join(", ")}
            </p>
            <p className="text-academic-slate-600">
              Publisher: {bookPub.publisher} • Pages: {bookPub.pages} • {publication.year}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-academic-green/10 border-academic-green/20 text-academic-green">
              Book Chapter
            </Badge>
            <Badge variant="outline" className="text-xs bg-academic-slate/10 border-academic-slate/20 text-academic-slate-700">
              ISBN: {bookPub.isbn}
            </Badge>
          </div>
        </div>
      )
    }

    if ('conference' in publication) {
      const confPub = publication as ConferenceProceeding
      return (
        <div className="space-y-3">
          <div className="text-sm">
            <p className="font-medium text-primary-navy">{confPub.conference}</p>
            <p className="text-academic-slate-600">
              {confPub.location} • {confPub.month} {publication.year}
            </p>
            <p className="text-academic-slate-600">
              Pages: {confPub.pages}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-accent-burgundy/10 border-accent-burgundy/20 text-accent-burgundy">
              {confPub.presentationType}
            </Badge>
          </div>
        </div>
      )
    }

    if ('institution' in publication) {
      const workingPub = publication as WorkingPaper
      return (
        <div className="space-y-3">
          <div className="text-sm">
            <p className="text-academic-slate-600">
              Institution: <span className="font-medium text-primary-navy">{workingPub.institution}</span>
            </p>
            <p className="text-academic-slate-600">
              Target Journal: {workingPub.targetJournal}
            </p>
            <p className="text-academic-slate-600">
              Last Updated: {new Date(workingPub.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={`text-xs ${
              workingPub.status === 'Under Review' 
                ? 'bg-accent-gold/10 border-accent-gold/20 text-accent-gold'
                : 'bg-academic-slate/10 border-academic-slate/20 text-academic-slate-700'
            }`}>
              {workingPub.status}
            </Badge>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <Card className="bg-white/95 border-academic-slate-200 backdrop-blur-sm shadow-academic hover:shadow-academic-professional transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge className={`text-xs ${typeColor}`}>
                {publicationType}
              </Badge>
              <div className="flex items-center text-xs text-academic-slate-500">
                <CalendarIcon className="w-3 h-3 mr-1" />
                {publication.year}
              </div>
              <div className="flex items-center text-xs text-academic-slate-500">
                <QuoteIcon className="w-3 h-3 mr-1" />
                {publication.citationCount} citations
              </div>
            </div>
            
            <Link href={`/publications/${publication.id}`}>
              <CardTitle className="text-lg font-serif text-primary-navy leading-tight mb-3 hover:text-primary-navy/80 transition-colors cursor-pointer">
                {publication.title}
              </CardTitle>
            </Link>

            <div className="flex items-center text-sm text-academic-slate-600 mb-3">
              <UsersIcon className="w-3 h-3 mr-1.5" />
              {publication.authors.join(", ")}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Publication-specific information */}
        {renderPublicationSpecificInfo()}

        <Separator />

        {/* Abstract */}
        <div>
          <h4 className="text-sm font-medium text-academic-slate-700 mb-2">Abstract</h4>
          <p className="text-sm text-academic-slate-600 leading-relaxed line-clamp-4">
            {publication.abstract}
          </p>
        </div>

        {/* Keywords */}
        <div>
          <h4 className="text-sm font-medium text-academic-slate-700 mb-2 flex items-center">
            <TagIcon className="w-3 h-3 mr-1" />
            Keywords
          </h4>
          <div className="flex flex-wrap gap-1">
            {publication.keywords.map((keyword, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-academic-slate-50 border-academic-slate-300 text-academic-slate-700"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Research Area */}
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="secondary" className="text-xs bg-primary-navy/10 text-primary-navy">
              {publication.researchArea}
            </Badge>
          </div>
          
          <div className="text-xs text-academic-slate-500">
            Published: {new Date(publication.publicationDate).toLocaleDateString()}
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button 
            asChild
            size="sm" 
            className="text-xs bg-primary-navy hover:bg-primary-navy-dark text-white"
          >
            <Link href={`/publications/${publication.id}`}>
              <EyeIcon className="w-3 h-3 mr-1" />
              View Details
            </Link>
          </Button>

          {('doi' in publication) && (
            <Button 
              asChild
              size="sm" 
              variant="outline"
              className="text-xs border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white"
            >
              <a href={`https://doi.org/${(publication as JournalArticle).doi}`} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="w-3 h-3 mr-1" />
                View DOI
              </a>
            </Button>
          )}
          
          {('pdfUrl' in publication) && (
            <Button 
              asChild
              size="sm" 
              variant="outline"
              className="text-xs border-academic-green text-academic-green hover:bg-academic-green hover:text-white"
            >
              <a href={(publication as JournalArticle).pdfUrl} target="_blank" rel="noopener noreferrer">
                <DownloadIcon className="w-3 h-3 mr-1" />
                Download PDF
              </a>
            </Button>
          )}
          
          <Button 
            size="sm" 
            variant="ghost"
            className="text-xs text-academic-slate-600 hover:text-primary-navy hover:bg-primary-navy/10"
          >
            <QuoteIcon className="w-3 h-3 mr-1" />
            Cite (APA)
          </Button>
        </div>

        {/* Citation Preview */}
        <div className="bg-academic-slate-50 p-3 rounded text-xs text-academic-slate-600 border-l-2 border-primary-navy/20">
          <strong>APA Citation:</strong>
          <p className="mt-1 italic">
            {formatAPACitation(publication)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 