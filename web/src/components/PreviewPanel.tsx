import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useResumeStore, type TemplateType } from '@/stores/resumeStore'
import { MinimalProfessional } from '@/templates/MinimalProfessional'
import { TechDev } from '@/templates/TechDev'

const templates: Array<{ id: TemplateType; name: string; description: string }> = [
  {
    id: 'minimal-professional',
    name: 'Minimal Professional',
    description: 'Clean, classic design perfect for any industry',
  },
  {
    id: 'tech-dev',
    name: 'Tech Developer',
    description: 'Modern dark theme ideal for developers',
  },
]

export function PreviewPanel() {
  const { data, selectedTemplate, setTemplate } = useResumeStore()

  const TemplateComponent = selectedTemplate === 'tech-dev' ? TechDev : MinimalProfessional

  return (
    <div className="space-y-4">
      {/* Template Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setTemplate(template.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold">{template.name}</p>
                <p className="text-sm text-gray-600">{template.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <div className="max-h-[800px] overflow-y-auto">
              <TemplateComponent data={data} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
