import type { ResumeData } from '@/stores/resumeStore'

interface TechDevProps {
  data: ResumeData
}

export function TechDev({ data }: TechDevProps) {
  const { personal, summary, experience, education, skills, projects } = data

  return (
    <div className="bg-slate-900 text-slate-100 p-8 font-sans min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 -mx-8 -mt-8 px-8 py-10 mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{personal.name}</h1>
          <p className="text-xl text-blue-100 mb-4">{personal.title}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-slate-800/50 px-3 py-1 rounded-full">{personal.email}</span>
            <span className="bg-slate-800/50 px-3 py-1 rounded-full">{personal.phone}</span>
            <span className="bg-slate-800/50 px-3 py-1 rounded-full">{personal.location}</span>
          </div>
          <div className="flex gap-4 mt-4">
            {personal.linkedin && (
              <a
                href={personal.linkedin}
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                LinkedIn →
              </a>
            )}
            {personal.github && (
              <a
                href={personal.github}
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-400 uppercase tracking-wider mb-3 border-b border-slate-700 pb-2">
              About
            </h2>
            <p className="text-slate-300 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-400 uppercase tracking-wider mb-3 border-b border-slate-700 pb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-slate-800 text-blue-300 px-3 py-1 rounded-full text-sm border border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-400 uppercase tracking-wider mb-3 border-b border-slate-700 pb-2">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-semibold text-slate-200">{edu.institution}</h3>
                      <p className="text-sm text-slate-400">{edu.degree}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {edu.startDate} – {edu.endDate}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-blue-400 mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-400 uppercase tracking-wider mb-3 border-b border-slate-700 pb-2">
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-blue-500">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-slate-200">{exp.position}</h3>
                        <span className="text-xs text-slate-500">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm text-blue-400 mb-2">{exp.company}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-400 uppercase tracking-wider mb-3 border-b border-slate-700 pb-2">
                  Projects
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-200">{proj.name}</h3>
                        {proj.url && (
                          <a
                            href={proj.url}
                            className="text-sm text-blue-400 hover:text-blue-300"
                          >
                            View →
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{proj.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
