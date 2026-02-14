import type { ResumeData } from '~/types/resume'

export function createMinimalProfessionalTemplate(data: ResumeData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.name} - Resume</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
        }
        .name {
            font-size: 28px;
            font-weight: bold;
            margin: 0;
        }
        .title {
            font-size: 16px;
            color: #666;
            margin: 5px 0;
        }
        .contact-info {
            font-size: 12px;
            color: #666;
            margin: 10px 0;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .experience-item, .education-item, .project-item {
            margin-bottom: 15px;
        }
        .item-header {
            font-weight: bold;
            margin-bottom: 3px;
        }
        .item-subheader {
            font-style: italic;
            color: #666;
            margin-bottom: 5px;
        }
        .item-description {
            font-size: 13px;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .skill {
            background: #f5f5f5;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 12px;
        }
        .summary {
            margin-bottom: 20px;
            text-align: justify;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${data.personal.name}</h1>
        <div class="title">${data.personal.title}</div>
        <div class="contact-info">
            ${data.personal.email} | ${data.personal.phone} | ${data.personal.location}
            ${data.personal.linkedin ? ` | LinkedIn: ${data.personal.linkedin}` : ''}
            ${data.personal.github ? ` | GitHub: ${data.personal.github}` : ''}
        </div>
    </div>

    <div class="section">
        <div class="section-title">Summary</div>
        <div class="summary">${data.summary}</div>
    </div>

    <div class="section">
        <div class="section-title">Experience</div>
        ${data.experience.map(exp => `
            <div class="experience-item">
                <div class="item-header">${exp.position}</div>
                <div class="item-subheader">${exp.company} | ${exp.startDate} - ${exp.endDate}</div>
                <div class="item-description">${exp.description}</div>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        ${data.education.map(edu => `
            <div class="education-item">
                <div class="item-header">${edu.degree}</div>
                <div class="item-subheader">${edu.institution} | ${edu.startDate} - ${edu.endDate}</div>
                ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
            ${data.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
        </div>
    </div>

    ${data.projects && data.projects.length > 0 ? `
    <div class="section">
        <div class="section-title">Projects</div>
        ${data.projects.map(project => `
            <div class="project-item">
                <div class="item-header">${project.name}</div>
                <div class="item-description">${project.description}</div>
                <div class="skills">
                    ${project.technologies.map(tech => `<span class="skill">${tech}</span>`).join('')}
                </div>
                ${project.url ? `<div class="item-description">URL: ${project.url}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}
</body>
</html>
  `.trim()
}

export function createTechDevTemplate(data: ResumeData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.name} - Resume</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #fafafa;
        }
        .header {
            background: #2d3748;
            color: white;
            padding: 30px;
            margin: -20px -20px 30px -20px;
        }
        .name {
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            color: #68d391;
        }
        .title {
            font-size: 18px;
            color: #a0aec0;
            margin: 10px 0;
        }
        .contact-info {
            font-size: 14px;
            color: #e2e8f0;
            margin: 15px 0;
        }
        .content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 30px;
        }
        .main-content {
            grid-column: 1;
        }
        .sidebar {
            grid-column: 2;
        }
        .section {
            margin-bottom: 30px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #2d3748;
            border-bottom: 2px solid #68d391;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .experience-item, .project-item {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e2e8f0;
        }
        .experience-item:last-child, .project-item:last-child {
            border-bottom: none;
        }
        .item-header {
            font-weight: bold;
            font-size: 16px;
            color: #2d3748;
            margin-bottom: 5px;
        }
        .item-subheader {
            font-style: italic;
            color: #718096;
            margin-bottom: 10px;
        }
        .item-description {
            font-size: 14px;
            line-height: 1.6;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .skill-category {
            margin-bottom: 15px;
        }
        .skill-category-title {
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 8px;
        }
        .skill-item {
            background: #edf2f7;
            padding: 4px 8px;
            margin: 2px 0;
            border-radius: 4px;
            font-size: 13px;
        }
        .education-item {
            margin-bottom: 15px;
        }
        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 10px;
        }
        .tech-badge {
            background: #68d391;
            color: #2d3748;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: bold;
        }
        .summary {
            text-align: justify;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${data.personal.name}</h1>
        <div class="title">${data.personal.title}</div>
        <div class="contact-info">
            📧 ${data.personal.email} | 📱 ${data.personal.phone} | 📍 ${data.personal.location}
            ${data.personal.github ? ` | 🐙 ${data.personal.github}` : ''}
            ${data.personal.linkedin ? ` | 💼 ${data.personal.linkedin}` : ''}
        </div>
    </div>

    <div class="content">
        <div class="main-content">
            <div class="section">
                <div class="section-title">👨‍💻 Summary</div>
                <div class="summary">${data.summary}</div>
            </div>

            <div class="section">
                <div class="section-title">💼 Experience</div>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <div class="item-header">${exp.position}</div>
                        <div class="item-subheader">${exp.company} | ${exp.startDate} - ${exp.endDate}</div>
                        <div class="item-description">${exp.description}</div>
                    </div>
                `).join('')}
            </div>

            ${data.projects && data.projects.length > 0 ? `
            <div class="section">
                <div class="section-title">🚀 Projects</div>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <div class="item-header">${project.name}</div>
                        <div class="item-description">${project.description}</div>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                        ${project.url ? `<div class="item-description">🔗 ${project.url}</div>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>

        <div class="sidebar">
            <div class="section">
                <div class="section-title">🎓 Education</div>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="item-header">${edu.degree}</div>
                        <div class="item-subheader">${edu.institution}</div>
                        <div class="item-subheader">${edu.startDate} - ${edu.endDate}</div>
                        ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <div class="section-title">⚡ Skills</div>
                <div class="skills-grid">
                    <div class="skill-category">
                        <div class="skill-category-title">Languages</div>
                        ${data.skills.filter((_, i) => i % 2 === 0).map(skill => `
                            <div class="skill-item">${skill}</div>
                        `).join('')}
                    </div>
                    <div class="skill-category">
                        <div class="skill-category-title">Technologies</div>
                        ${data.skills.filter((_, i) => i % 2 === 1).map(skill => `
                            <div class="skill-item">${skill}</div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `.trim()
}