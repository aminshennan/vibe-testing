"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  WifiOffIcon, 
  RefreshCwIcon, 
  HomeIcon,
  BookOpenIcon,
  GraduationCapIcon,
  HeartIcon
} from 'lucide-react'

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academic-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Offline Status Card */}
        <Card className="text-center border-academic-burgundy/20">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-academic-burgundy/10 rounded-full flex items-center justify-center mb-4">
              <WifiOffIcon className="w-8 h-8 text-academic-burgundy" />
            </div>
            <CardTitle className="text-2xl font-bold text-academic-navy">
              You&apos;re Currently Offline
            </CardTitle>
            <CardDescription className="text-lg text-academic-slate-600">
              Don&apos;t worry! You can still access some content and features while you&apos;re offline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={handleRefresh}
              className="bg-academic-navy hover:bg-academic-navy/90 text-white px-6 py-2"
            >
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>

        {/* Available Offline Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-academic-navy flex items-center">
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Available Offline
            </CardTitle>
            <CardDescription>
              These sections are cached and available while offline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link 
                href="/"
                className="flex items-center p-4 border border-academic-slate-200 rounded-lg hover:bg-academic-slate-50 transition-colors"
              >
                <HomeIcon className="w-5 h-5 mr-3 text-academic-navy" />
                <div>
                  <h3 className="font-medium text-academic-navy">Home</h3>
                  <p className="text-sm text-academic-slate-600">Academic profile</p>
                </div>
              </Link>

              <Link 
                href="/cv"
                className="flex items-center p-4 border border-academic-slate-200 rounded-lg hover:bg-academic-slate-50 transition-colors"
              >
                <GraduationCapIcon className="w-5 h-5 mr-3 text-academic-navy" />
                <div>
                  <h3 className="font-medium text-academic-navy">CV</h3>
                  <p className="text-sm text-academic-slate-600">Academic credentials</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Academic Status */}
        <Card className="bg-academic-green/5 border-academic-green/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-academic-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                <HeartIcon className="w-4 h-4 text-academic-green" />
              </div>
              <div>
                <h3 className="font-semibold text-academic-green mb-2">Academic Excellence Continues</h3>
                <p className="text-academic-slate-700 text-sm leading-relaxed">
                  While you&apos;re offline, Dr. Sarah Mitchell&apos;s commitment to academic excellence remains unchanged. 
                  Her research in cognitive psychology continues to advance our understanding of learning and memory processes.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-academic-green/10 text-academic-green border-academic-green/20">
                    Psychology Research
                  </Badge>
                  <Badge variant="secondary" className="bg-academic-navy/10 text-academic-navy border-academic-navy/20">
                    UC Berkeley Faculty
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Quote */}
        <Card className="bg-gradient-to-r from-academic-navy/5 to-academic-green/5 border-academic-navy/20">
          <CardContent className="pt-6">
            <blockquote className="text-center">
              <p className="text-lg italic text-academic-slate-700 mb-4">
                &quot;The pursuit of knowledge knows no boundaries, whether online or offline.&quot;
              </p>
              <footer className="text-academic-navy font-medium">
                — Dr. Sarah Mitchell
              </footer>
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 