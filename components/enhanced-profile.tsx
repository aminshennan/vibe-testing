"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SocialLinks } from "@/components/social-links"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, Mail, Phone, Languages, Clock, GraduationCap, Building } from "lucide-react"
import { getPersonalInfo, getAboutInfo } from "@/lib/data"

export function EnhancedProfile() {
  const [activeTab, setActiveTab] = useState("about")

  const personalInfo = getPersonalInfo()
  const aboutInfo = getAboutInfo()

  return (
    <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic col-span-1 flex flex-col">
      <CardContent className="p-0">
        {/* Academic Profile Header */}
        <div className="bg-gradient-to-r from-primary-navy/5 to-academic-green/5 p-4 sm:p-6 flex flex-col items-center border-b border-academic-slate-200">
          <div className="flex flex-col sm:flex-col items-center w-full">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-3 border-primary-navy/20 ring-4 ring-primary-navy/10">
              <Image
                src={personalInfo.avatar || "/placeholder.svg"}
                alt={personalInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-navy font-serif">{personalInfo.name}</h2>
              <p className="text-sm text-academic-green font-medium mb-1">{personalInfo.title}</p>
              <div className="flex items-center justify-center text-xs text-academic-slate-600 mb-2">
                <Building className="w-3 h-3 mr-1" />
                <span>{personalInfo.institution}</span>
              </div>
              <div className="flex items-center justify-center text-xs text-academic-slate-500 mb-3">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {personalInfo.credentials.map((credential, index) => (
              <Badge key={index} variant="outline" className="bg-primary-navy/10 border-primary-navy/20 text-primary-navy hover:bg-primary-navy/20">
                {credential}
              </Badge>
            ))}
          </div>

          <SocialLinks socialLinks={personalInfo.social} />
        </div>

        {/* Academic Tabbed Content */}
        <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b border-academic-slate-200">
            <TabsList className="w-full bg-transparent border-b border-academic-slate-200 rounded-none h-auto p-0">
              <TabsTrigger
                value="about"
                className={`flex-1 rounded-none border-b-2 px-2 sm:px-4 py-2 text-xs sm:text-sm ${
                  activeTab === "about" ? "border-primary-navy text-primary-navy" : "border-transparent text-academic-slate-600"
                }`}
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className={`flex-1 rounded-none border-b-2 px-2 sm:px-4 py-2 text-xs sm:text-sm ${
                  activeTab === "contact" ? "border-primary-navy text-primary-navy" : "border-transparent text-academic-slate-600"
                }`}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about" className="p-4 sm:p-6 space-y-4 sm:space-y-6 focus:outline-none">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-academic-slate-600 flex items-center uppercase tracking-wide">
                <User className="w-4 h-4 mr-2 text-primary-navy" />
                About
              </h3>
              <p className="text-sm text-academic-slate-700 leading-relaxed">{aboutInfo.bio}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-academic-slate-600 flex items-center uppercase tracking-wide">
                <GraduationCap className="w-4 h-4 mr-2 text-primary-navy" />
                Academic Focus
              </h3>
              <div className="space-y-2">
                {aboutInfo.academicFocus.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-primary-navy mr-2 font-bold">•</span>
                    <p className="text-sm text-academic-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-academic-slate-600 flex items-center uppercase tracking-wide">
                <Languages className="w-4 h-4 mr-2 text-primary-navy" />
                Languages
              </h3>
              <div className="space-y-3">
                {aboutInfo.languages.map((language, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-academic-slate-700">{language.name}</span>
                      <span className="text-xs text-academic-slate-500">{language.proficiency}</span>
                    </div>
                    <div className="h-1.5 bg-academic-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-navy to-academic-green rounded-full"
                        style={{ width: `${language.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="p-4 sm:p-6 space-y-4 focus:outline-none">
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-primary-navy mt-0.5" />
                <div>
                  <h4 className="font-medium text-academic-slate-700">Email</h4>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm text-academic-slate-600 hover:text-primary-navy transition-colors break-all"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-primary-navy mt-0.5" />
                <div>
                  <h4 className="font-medium text-academic-slate-700">Phone</h4>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-sm text-academic-slate-600 hover:text-primary-navy transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Building className="w-5 h-5 mr-3 text-primary-navy mt-0.5" />
                <div>
                  <h4 className="font-medium text-academic-slate-700">Office</h4>
                  <p className="text-sm text-academic-slate-600">{personalInfo.office}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-primary-navy mt-0.5" />
                <div>
                  <h4 className="font-medium text-academic-slate-700">Office Hours</h4>
                  <p className="text-sm text-academic-slate-600">{personalInfo.officeHours}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Academic Availability Status */}
        <div className="p-3 sm:p-4 border-t border-academic-slate-200 flex items-center justify-center bg-academic-slate-50/50">
          <div className="flex items-center">
            <span
              className={`w-2 h-2 ${personalInfo.availableForCollaboration ? "bg-academic-green" : "bg-accent-burgundy"} rounded-full mr-2`}
            ></span>
            <span className="text-xs text-academic-slate-600">
              {personalInfo.availableForCollaboration ? "Available for collaboration" : "Not available for collaboration"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
