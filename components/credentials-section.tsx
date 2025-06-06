import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award, Shield, Users } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { getCredentialsInfo } from "@/lib/data"

export function CredentialsSection() {
  const credentialsInfo = getCredentialsInfo()

  return (
    <div className="bg-gradient-to-r from-academic-slate-50 to-white rounded-2xl p-8 shadow-academic border border-academic-slate-200">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary-navy/10 p-3 rounded-xl mr-4">
            <Award className="w-8 h-8 text-primary-navy" />
          </div>
          <h3 className="text-3xl font-bold text-primary-navy">Academic Credentials</h3>
        </div>
        <p className="text-lg text-academic-slate-600 max-w-2xl mx-auto">
          Professional qualifications, educational background, and academic achievements
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column - Education & Certifications */}
        <div className="space-y-8">
          {/* Education */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-white rounded-xl p-6 border border-academic-green/20 hover:border-academic-green/30 transition-all duration-300">
              <h4 className="text-xl font-bold text-academic-green mb-6 flex items-center">
                <div className="bg-academic-green/10 p-2 rounded-lg mr-3">
                  <GraduationCap className="w-5 h-5 text-academic-green" />
                </div>
                Education
              </h4>
              <div className="space-y-4">
                {credentialsInfo.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-academic-green/30 pl-4 py-2">
                    <h5 className="font-bold text-academic-green text-lg">{edu.degree}</h5>
                    <p className="text-academic-slate-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-academic-slate-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Professional Licenses */}
          {credentialsInfo.licenses && credentialsInfo.licenses.length > 0 && (
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-white rounded-xl p-6 border border-accent-gold/20 hover:border-accent-gold/30 transition-all duration-300">
                <h4 className="text-xl font-bold text-accent-gold mb-6 flex items-center">
                  <div className="bg-accent-gold/10 p-2 rounded-lg mr-3">
                    <Shield className="w-5 h-5 text-accent-gold" />
                  </div>
                  Professional Licenses
                </h4>
                <div className="space-y-4">
                  {credentialsInfo.licenses.map((license, index) => (
                    <div key={index} className="border-l-4 border-accent-gold/30 pl-4 py-2">
                      <h5 className="font-bold text-accent-gold text-lg">{license.name}</h5>
                      <p className="text-academic-slate-600">{license.state} • License #{license.number}</p>
                      <p className="text-sm text-academic-slate-500">
                        Issued: {license.issued} • Expires: {license.expires}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>

        {/* Right Column - Awards & Recognition */}
        <div className="space-y-8">
          {/* Awards & Honors */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="bg-white rounded-xl p-6 border border-primary-navy/20 hover:border-primary-navy/30 transition-all duration-300">
              <h4 className="text-xl font-bold text-primary-navy mb-6 flex items-center">
                <div className="bg-primary-navy/10 p-2 rounded-lg mr-3">
                  <Award className="w-5 h-5 text-primary-navy" />
                </div>
                Awards & Honors
              </h4>
              <div className="space-y-4">
                {credentialsInfo.awards.map((award, index) => (
                  <div key={index} className="border-l-4 border-primary-navy/30 pl-4 py-2">
                    <h5 className="font-bold text-primary-navy text-lg">{award.name}</h5>
                    <p className="text-academic-slate-600 font-medium">{award.issuer}</p>
                    <p className="text-sm text-academic-slate-500">{award.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Professional Memberships */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="bg-white rounded-xl p-6 border border-accent-burgundy/20 hover:border-accent-burgundy/30 transition-all duration-300">
              <h4 className="text-xl font-bold text-accent-burgundy mb-6 flex items-center">
                <div className="bg-accent-burgundy/10 p-2 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-accent-burgundy" />
                </div>
                Professional Memberships
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {credentialsInfo.memberships.map((membership, index) => (
                  <div key={index} className="bg-accent-burgundy/5 border border-accent-burgundy/10 p-3 rounded-lg text-center hover:bg-accent-burgundy/10 transition-colors">
                    <span className="font-medium text-accent-burgundy">{membership}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
