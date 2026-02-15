import type { ResumeData } from '@/stores/resumeStore'

interface MinimalProfessionalProps {
  data: ResumeData
}

export function MinimalProfessional({ data }: MinimalProfessionalProps) {
  const { personal, summary, experience, education, skills, projects } = data

  return (
    <div className="bg-white p-8 text-gray-900 font-sans">
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personal.name}</h1>
        <p className="text-lg text-gray-700 mb-3">{personal.title}</p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span>{personal.email}</span>
          <span>•</span>
          <span>{personal.phone}</span>
          <span>•</span>
          <span>{personal.location}</span>
          {personal.linkedin && (
            <>
              <span>•</span>
              <a href={personal.linkedin} className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </>
          )}
          {personal.github && (
            <>
              <span>•</span>
              <a href={personal.github} className="text-blue-600 hover:underline">
                GitHub
              </a>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">{exp.company}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                    <p className="text-sm text-gray-700">{edu.degree}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2">
            Skills
          </h2>
          <p className="text-sm text-gray-700">{skills.join(' • ')}</p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  {proj.url && (
                    <a
                      href={proj.url}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-1">{proj.description}</p>
                <p className="text-sm text-gray-600">
                  Technologies: {proj.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
