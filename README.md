# JSON Prompt Generator

A comprehensive React-based tool for creating structured prompts for various AI tasks across multiple domains including image generation, content creation, code review, SEO, and business strategy.

## Features

### 🎯 Template Management System
- **Pre-built Templates**: 10+ professionally crafted templates covering:
  - AI Image Generation
  - Video Content Creation
  - Code Review & Bug Detection
  - Lead Generation Strategy
  - SEO Content Optimization
  - Data Analysis & Insights
  - Learning Curriculum Design
  - Social Media Strategy
  - Business Strategy Planning
  - Content Repurposing Strategy

- **Template Categories**: Organized by domain (Content Creation, Technical, Marketing, Business, Learning)
- **Template Search & Filter**: Find templates quickly with search and category filtering
- **Example Loading**: Load pre-built examples with one click

### 🔧 Dynamic Form Generation
- **Smart Form Fields**: Automatically generates appropriate input types:
  - Text inputs for strings
  - Dropdowns for predefined options
  - Arrays for multiple selections
  - Number inputs for quantities
  - Boolean toggles for flags
  - Textarea for long text
- **Field Validation**: Real-time validation with helpful error messages
- **Interactive Arrays**: Add/remove items dynamically for array fields
- **Tooltips**: Helpful descriptions for each field

### 📋 JSON Editor & Preview
- **Live JSON Preview**: Real-time JSON output as users fill the form
- **Syntax Highlighting**: Color-coded JSON display with Prism.js
- **Copy to Clipboard**: One-click JSON copying
- **Format Toggle**: Switch between minified and formatted JSON
- **Download**: Export JSON as a file
- **Theme Toggle**: Light/dark syntax highlighting themes

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Automatic theme detection and manual toggle
- **Clean Interface**: Intuitive workflow with visual feedback
- **Accessibility**: WCAG compliant design

## Tech Stack

- **Frontend**: React 18 + JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Syntax Highlighting**: React Syntax Highlighter (Prism.js)
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd json-prompt-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Select a Template**: Browse through categories or search for a specific template
2. **Fill the Form**: Complete the dynamically generated form fields
3. **Preview JSON**: See the real-time JSON output in the preview panel
4. **Copy or Download**: Use the generated JSON in your AI tools

### Example Workflow

1. Select "AI Image Generation" template
2. Fill in details like:
   - Task: "Generate a realistic portrait"
   - Style: "photo-realistic"
   - Subject: "A professional businesswoman"
   - Lighting: "soft studio lighting"
3. Copy the generated JSON and use it with DALL-E, Midjourney, or Stable Diffusion

## Template Structure

Each template follows this structure:

```javascript
{
  id: 'unique-id',
  name: 'Template Name',
  category: 'Category',
  description: 'Template description',
  fields: [
    {
      key: 'field_name',
      label: 'Field Label',
      type: 'text|select|array|number|boolean|textarea',
      required: true|false,
      description: 'Field description',
      options: ['option1', 'option2'], // for select/array fields
      placeholder: 'Placeholder text',
      defaultValue: 'default'
    }
  ],
  example: {
    // Example data for the template
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Adding New Templates

To add a new template:

1. Open `src/data/templates.js`
2. Add your template object to the `templates` array
3. Follow the existing template structure
4. Test your template in the application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using React and Vite
