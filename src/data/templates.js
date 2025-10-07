export const TEMPLATE_CATEGORIES = {
  CONTENT_CREATION: 'Content Creation',
  TECHNICAL: 'Technical',
  MARKETING: 'Marketing',
  BUSINESS: 'Business',
  LEARNING: 'Learning'
}

export const templates = [
  {
    id: 'ai-image-generation',
    name: 'AI Image Generation',
    category: TEMPLATE_CATEGORIES.CONTENT_CREATION,
    description: 'Generate detailed prompts for AI image creation tools like DALL-E, Midjourney, or Stable Diffusion',
    fields: [
      {
        key: 'task',
        label: 'Task Description',
        type: 'text',
        required: true,
        description: 'Main task or objective for the image generation',
        placeholder: 'Create a realistic portrait of...',
        defaultValue: 'Generate an image'
      },
      {
        key: 'style',
        label: 'Art Style',
        type: 'select',
        required: false,
        description: 'Choose the artistic style for the image',
        options: [
          'photo-realistic',
          'artistic',
          'anime',
          'cartoon',
          'oil painting',
          'watercolor',
          'digital art',
          'sketch',
          'abstract'
        ],
        defaultValue: 'photo-realistic'
      },
      {
        key: 'subject',
        label: 'Subject',
        type: 'text',
        required: true,
        description: 'Main subject or focus of the image',
        placeholder: 'A majestic mountain landscape...'
      },
      {
        key: 'lighting',
        label: 'Lighting',
        type: 'text',
        required: false,
        description: 'Lighting conditions and mood',
        placeholder: 'golden hour, soft natural lighting'
      },
      {
        key: 'composition',
        label: 'Composition',
        type: 'text',
        required: false,
        description: 'Camera angle, framing, and composition details',
        placeholder: 'wide angle, rule of thirds, centered'
      },
      {
        key: 'quality',
        label: 'Quality Settings',
        type: 'text',
        required: false,
        description: 'Quality and resolution specifications',
        placeholder: 'high resolution, 4K, detailed'
      },
      {
        key: 'additional_details',
        label: 'Additional Details',
        type: 'textarea',
        required: false,
        description: 'Any additional specifications or details',
        placeholder: 'Include specific colors, textures, or other elements...'
      },
      {
        key: 'negative_prompt',
        label: 'Negative Prompt',
        type: 'textarea',
        required: false,
        description: 'Elements to avoid in the generated image',
        placeholder: 'blurry, low quality, distorted...'
      }
    ],
    example: {
      task: 'Generate a realistic portrait',
      style: 'photo-realistic',
      subject: 'A professional businesswoman in her 30s',
      lighting: 'soft studio lighting',
      composition: 'headshot, centered, professional',
      quality: 'high resolution, sharp focus',
      additional_details: 'Wearing a navy blue blazer, confident expression',
      negative_prompt: 'blurry, low quality, amateur'
    }
  },
  {
    id: 'video-content-creation',
    name: 'Video Content Creation',
    category: TEMPLATE_CATEGORIES.CONTENT_CREATION,
    description: 'Create prompts for video content planning and script generation',
    fields: [
      {
        key: 'task',
        label: 'Video Task',
        type: 'text',
        required: true,
        description: 'Main objective for the video content',
        placeholder: 'Create a tutorial video about...'
      },
      {
        key: 'video_type',
        label: 'Video Type',
        type: 'select',
        required: true,
        description: 'Type of video content',
        options: [
          'tutorial',
          'explainer',
          'promotional',
          'educational',
          'entertainment',
          'documentary',
          'review',
          'interview'
        ]
      },
      {
        key: 'target_audience',
        label: 'Target Audience',
        type: 'text',
        required: true,
        description: 'Who is the intended audience?',
        placeholder: 'Beginners in web development...'
      },
      {
        key: 'duration',
        label: 'Duration',
        type: 'select',
        required: false,
        description: 'Approximate video length',
        options: [
          '30 seconds',
          '1-2 minutes',
          '3-5 minutes',
          '5-10 minutes',
          '10-15 minutes',
          '15+ minutes'
        ]
      },
      {
        key: 'tone',
        label: 'Tone',
        type: 'select',
        required: false,
        description: 'Overall tone and style',
        options: [
          'professional',
          'casual',
          'friendly',
          'authoritative',
          'humorous',
          'inspiring',
          'educational'
        ]
      },
      {
        key: 'key_points',
        label: 'Key Points',
        type: 'textarea',
        required: true,
        description: 'Main points to cover in the video',
        placeholder: '1. Introduction to the topic\n2. Main concepts\n3. Practical examples...'
      }
    ],
    example: {
      task: 'Create a tutorial video about React hooks',
      video_type: 'tutorial',
      target_audience: 'Intermediate React developers',
      duration: '10-15 minutes',
      tone: 'educational',
      key_points: '1. Introduction to hooks\n2. useState hook\n3. useEffect hook\n4. Custom hooks\n5. Best practices'
    }
  },
  {
    id: 'code-review',
    name: 'Code Review & Bug Detection',
    category: TEMPLATE_CATEGORIES.TECHNICAL,
    description: 'Generate prompts for code review, bug detection, and code improvement suggestions',
    fields: [
      {
        key: 'task',
        label: 'Review Task',
        type: 'text',
        required: true,
        description: 'Specific code review objective',
        defaultValue: 'Review the following code for bugs and improvements'
      },
      {
        key: 'programming_language',
        label: 'Programming Language',
        type: 'select',
        required: true,
        description: 'Primary programming language',
        options: [
          'JavaScript',
          'Python',
          'Java',
          'C++',
          'C#',
          'Go',
          'Rust',
          'TypeScript',
          'PHP',
          'Ruby',
          'Swift',
          'Kotlin'
        ]
      },
      {
        key: 'code_subject',
        label: 'Code to Review',
        type: 'textarea',
        required: true,
        description: 'Paste the code that needs review',
        placeholder: 'function example() {\n  // Your code here\n}'
      },
      {
        key: 'focus_areas',
        label: 'Focus Areas',
        type: 'array',
        required: false,
        description: 'Specific areas to focus on during review',
        options: [
          'Security vulnerabilities',
          'Performance optimization',
          'Code readability',
          'Best practices',
          'Error handling',
          'Memory leaks',
          'Logic errors',
          'Code structure',
          'Documentation'
        ]
      },
      {
        key: 'suggestions',
        label: 'Include Suggestions',
        type: 'boolean',
        required: false,
        description: 'Include improvement suggestions in the review',
        defaultValue: true
      },
      {
        key: 'explanation',
        label: 'Include Explanations',
        type: 'boolean',
        required: false,
        description: 'Include detailed explanations for issues found',
        defaultValue: true
      }
    ],
    example: {
      task: 'Review the following React component for bugs and improvements',
      programming_language: 'JavaScript',
      code_subject: 'function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  \n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, []);\n  \n  return <div>{user.name}</div>;\n}',
      focus_areas: ['Error handling', 'Best practices', 'Performance optimization'],
      suggestions: true,
      explanation: true
    }
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation Strategy',
    category: TEMPLATE_CATEGORIES.MARKETING,
    description: 'Create prompts for developing lead generation strategies and campaigns',
    fields: [
      {
        key: 'task',
        label: 'Lead Generation Task',
        type: 'text',
        required: true,
        description: 'Main objective for lead generation',
        defaultValue: 'Develop a lead generation strategy'
      },
      {
        key: 'business_type',
        label: 'Business Type',
        type: 'select',
        required: true,
        description: 'Type of business or industry',
        options: [
          'SaaS',
          'E-commerce',
          'Consulting',
          'Real Estate',
          'Healthcare',
          'Education',
          'Manufacturing',
          'Financial Services',
          'Technology',
          'Other'
        ]
      },
      {
        key: 'target_market',
        label: 'Target Market',
        type: 'text',
        required: true,
        description: 'Description of your ideal customer',
        placeholder: 'Small to medium businesses in the healthcare sector...'
      },
      {
        key: 'budget_range',
        label: 'Budget Range',
        type: 'select',
        required: false,
        description: 'Available budget for lead generation',
        options: [
          'Under $1,000',
          '$1,000 - $5,000',
          '$5,000 - $10,000',
          '$10,000 - $25,000',
          '$25,000+'
        ]
      },
      {
        key: 'channels',
        label: 'Preferred Channels',
        type: 'array',
        required: false,
        description: 'Marketing channels to focus on',
        options: [
          'Social Media',
          'Email Marketing',
          'Content Marketing',
          'SEO',
          'PPC Advertising',
          'Webinars',
          'Events',
          'Cold Outreach',
          'Referrals'
        ]
      },
      {
        key: 'goals',
        label: 'Goals',
        type: 'textarea',
        required: true,
        description: 'Specific goals and KPIs for lead generation',
        placeholder: 'Generate 100 qualified leads per month...'
      }
    ],
    example: {
      task: 'Develop a lead generation strategy for a SaaS startup',
      business_type: 'SaaS',
      target_market: 'Small to medium businesses looking for project management solutions',
      budget_range: '$5,000 - $10,000',
      channels: ['Content Marketing', 'SEO', 'Social Media', 'Email Marketing'],
      goals: 'Generate 50 qualified leads per month with a conversion rate of 10%'
    }
  },
  {
    id: 'seo-optimization',
    name: 'SEO Content Optimization',
    category: TEMPLATE_CATEGORIES.MARKETING,
    description: 'Generate prompts for SEO content creation and optimization',
    fields: [
      {
        key: 'task',
        label: 'SEO Task',
        type: 'text',
        required: true,
        description: 'Main SEO objective',
        defaultValue: 'Optimize content for search engines'
      },
      {
        key: 'target_keyword',
        label: 'Target Keyword',
        type: 'text',
        required: true,
        description: 'Primary keyword to optimize for',
        placeholder: 'best project management software'
      },
      {
        key: 'secondary_keywords',
        label: 'Secondary Keywords',
        type: 'textarea',
        required: false,
        description: 'Additional keywords to include (one per line)',
        placeholder: 'project management tools\nteam collaboration software\nproductivity apps'
      },
      {
        key: 'content_type',
        label: 'Content Type',
        type: 'select',
        required: true,
        description: 'Type of content to optimize',
        options: [
          'Blog Post',
          'Landing Page',
          'Product Page',
          'Category Page',
          'About Page',
          'FAQ Page',
          'Guide/Tutorial'
        ]
      },
      {
        key: 'target_audience',
        label: 'Target Audience',
        type: 'text',
        required: true,
        description: 'Who is the content for?',
        placeholder: 'Small business owners looking for project management solutions'
      },
      {
        key: 'word_count',
        label: 'Target Word Count',
        type: 'select',
        required: false,
        description: 'Desired length of the content',
        options: [
          '300-500 words',
          '500-800 words',
          '800-1200 words',
          '1200-1500 words',
          '1500+ words'
        ]
      },
      {
        key: 'search_intent',
        label: 'Search Intent',
        type: 'select',
        required: false,
        description: 'What is the user looking for?',
        options: [
          'Informational',
          'Commercial',
          'Transactional',
          'Navigational'
        ]
      }
    ],
    example: {
      task: 'Create SEO-optimized blog post about project management software',
      target_keyword: 'best project management software',
      secondary_keywords: 'project management tools\nteam collaboration software\nproductivity apps',
      content_type: 'Blog Post',
      target_audience: 'Small business owners and team leaders',
      word_count: '1200-1500 words',
      search_intent: 'Commercial'
    }
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis & Insights',
    category: TEMPLATE_CATEGORIES.TECHNICAL,
    description: 'Generate prompts for data analysis, interpretation, and insight generation',
    fields: [
      {
        key: 'task',
        label: 'Analysis Task',
        type: 'text',
        required: true,
        description: 'Main data analysis objective',
        defaultValue: 'Analyze the provided data and generate insights'
      },
      {
        key: 'data_type',
        label: 'Data Type',
        type: 'select',
        required: true,
        description: 'Type of data to analyze',
        options: [
          'Sales Data',
          'Customer Data',
          'Website Analytics',
          'Survey Results',
          'Financial Data',
          'Marketing Metrics',
          'Operational Data',
          'Social Media Data'
        ]
      },
      {
        key: 'analysis_focus',
        label: 'Analysis Focus',
        type: 'array',
        required: false,
        description: 'Specific areas to focus on',
        options: [
          'Trends',
          'Patterns',
          'Correlations',
          'Anomalies',
          'Forecasting',
          'Segmentation',
          'Performance Metrics',
          'Comparative Analysis'
        ]
      },
      {
        key: 'time_period',
        label: 'Time Period',
        type: 'text',
        required: false,
        description: 'Time range for the analysis',
        placeholder: 'Last 6 months, Q1 2024, etc.'
      },
      {
        key: 'questions',
        label: 'Key Questions',
        type: 'textarea',
        required: true,
        description: 'Specific questions you want answered',
        placeholder: '1. What are the top performing products?\n2. Which customer segments are most valuable?\n3. What trends can we identify?'
      },
      {
        key: 'output_format',
        label: 'Output Format',
        type: 'select',
        required: false,
        description: 'Preferred format for results',
        options: [
          'Executive Summary',
          'Detailed Report',
          'Key Insights Only',
          'Charts and Graphs',
          'Recommendations'
        ]
      }
    ],
    example: {
      task: 'Analyze e-commerce sales data to identify growth opportunities',
      data_type: 'Sales Data',
      analysis_focus: ['Trends', 'Patterns', 'Segmentation'],
      time_period: 'Last 12 months',
      questions: '1. Which products have the highest growth rate?\n2. What are the seasonal trends?\n3. Which customer segments drive the most revenue?',
      output_format: 'Executive Summary'
    }
  },
  {
    id: 'learning-curriculum',
    name: 'Learning Curriculum Design',
    category: TEMPLATE_CATEGORIES.LEARNING,
    description: 'Create structured learning paths and educational content',
    fields: [
      {
        key: 'task',
        label: 'Learning Task',
        type: 'text',
        required: true,
        description: 'Main learning objective',
        defaultValue: 'Design a comprehensive learning curriculum'
      },
      {
        key: 'subject',
        label: 'Subject/Topic',
        type: 'text',
        required: true,
        description: 'What subject or skill to learn',
        placeholder: 'Web Development, Data Science, Digital Marketing...'
      },
      {
        key: 'skill_level',
        label: 'Skill Level',
        type: 'select',
        required: true,
        description: 'Current skill level of learners',
        options: [
          'Complete Beginner',
          'Beginner',
          'Intermediate',
          'Advanced',
          'Mixed Levels'
        ]
      },
      {
        key: 'duration',
        label: 'Duration',
        type: 'select',
        required: false,
        description: 'How long should the curriculum take?',
        options: [
          '1 week',
          '2-4 weeks',
          '1-2 months',
          '3-6 months',
          '6+ months'
        ]
      },
      {
        key: 'learning_style',
        label: 'Learning Style',
        type: 'array',
        required: false,
        description: 'Preferred learning methods',
        options: [
          'Video Tutorials',
          'Written Content',
          'Hands-on Projects',
          'Interactive Exercises',
          'Group Discussions',
          'Case Studies',
          'Quizzes/Tests'
        ]
      },
      {
        key: 'goals',
        label: 'Learning Goals',
        type: 'textarea',
        required: true,
        description: 'What should learners achieve by the end?',
        placeholder: 'By the end of this curriculum, learners will be able to...'
      }
    ],
    example: {
      task: 'Design a web development curriculum for beginners',
      subject: 'Full Stack Web Development',
      skill_level: 'Complete Beginner',
      duration: '3-6 months',
      learning_style: ['Video Tutorials', 'Hands-on Projects', 'Interactive Exercises'],
      goals: 'By the end of this curriculum, learners will be able to build and deploy full-stack web applications using HTML, CSS, JavaScript, React, and Node.js'
    }
  },
  {
    id: 'exam-prep-planner',
    name: 'Exam Preparation Planner',
    category: TEMPLATE_CATEGORIES.LEARNING,
    description: 'Create a structured plan to prepare for an academic or certification exam with schedule and milestones',
    fields: [
      { key: 'task', label: 'Preparation Task', type: 'text', required: true, description: 'Main exam preparation objective', defaultValue: 'Prepare a focused exam study plan' },
      { key: 'exam_name', label: 'Exam Name', type: 'text', required: true, description: 'Name of the exam or certification', placeholder: 'IELTS, SAT, AWS SAA-C03, etc.' },
      { key: 'target_score', label: 'Target Score/Outcome', type: 'text', required: true, description: 'Desired score or outcome', placeholder: 'Band 7.5, 1500+, Pass with 80%+' },
      { key: 'current_level', label: 'Current Level', type: 'select', required: true, description: 'Your current level of readiness', options: ['Beginner', 'Intermediate', 'Advanced'] },
      { key: 'timeframe', label: 'Timeframe', type: 'select', required: true, description: 'Total time available to prepare', options: ['2 weeks', '1 month', '6 weeks', '2-3 months', '3-6 months'] },
      { key: 'strong_areas', label: 'Strong Areas', type: 'array', required: false, description: 'Topics you are already comfortable with' },
      { key: 'weak_areas', label: 'Weak Areas', type: 'array', required: true, description: 'Topics you struggle with and want to focus on' },
      { key: 'daily_availability', label: 'Daily Study Time', type: 'select', required: true, description: 'Average time available per day', options: ['30-45 mins', '1 hour', '2 hours', '3-4 hours', '4+ hours'] },
      { key: 'resources', label: 'Preferred Resources', type: 'array', required: false, description: 'Books, courses, channels or websites to use' },
      { key: 'assessment_method', label: 'Assessment Method', type: 'select', required: false, description: 'How to track progress', options: ['Weekly Mock Tests', 'Topic Quizzes', 'Flashcards', 'Peer Review'] }
    ],
    example: {
      task: 'Prepare for the IELTS Academic exam',
      exam_name: 'IELTS Academic',
      target_score: 'Band 7.5+',
      current_level: 'Intermediate',
      timeframe: '6 weeks',
      strong_areas: ['Listening', 'Speaking'],
      weak_areas: ['Reading time management', 'Writing Task 2 structure'],
      daily_availability: '2 hours',
      resources: ['Cambridge IELTS books', 'E2 IELTS YouTube', 'Official practice tests'],
      assessment_method: 'Weekly Mock Tests'
    }
  },
  {
    id: 'language-learning-plan',
    name: 'Language Learning Plan',
    category: TEMPLATE_CATEGORIES.LEARNING,
    description: 'Design a practical plan to learn a new language with skills split (listening/speaking/reading/writing)',
    fields: [
      { key: 'task', label: 'Learning Task', type: 'text', required: true, description: 'Language learning objective', defaultValue: 'Create a language learning plan' },
      { key: 'language', label: 'Target Language', type: 'text', required: true, description: 'Which language to learn?', placeholder: 'Spanish, Japanese, French...' },
      { key: 'current_level', label: 'Current Level (CEFR)', type: 'select', required: true, description: 'Your current proficiency level', options: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
      { key: 'target_level', label: 'Target Level (CEFR)', type: 'select', required: true, description: 'Desired proficiency level', options: ['A2', 'B1', 'B2', 'C1'] },
      { key: 'timeframe', label: 'Timeframe', type: 'select', required: true, description: 'How long to reach the target', options: ['1 month', '2-3 months', '4-6 months', '6-12 months'] },
      { key: 'skills_focus', label: 'Skills Focus', type: 'array', required: true, description: 'Which skills to prioritize', options: ['Listening', 'Speaking', 'Reading', 'Writing', 'Pronunciation', 'Grammar', 'Vocabulary'] },
      { key: 'practice_frequency', label: 'Practice Frequency', type: 'select', required: true, description: 'How often to practice', options: ['Daily', '5x/week', '3x/week'] },
      { key: 'contexts', label: 'Usage Contexts', type: 'array', required: false, description: 'Situations to practice', options: ['Travel', 'Business', 'Casual conversation', 'Academic', 'Online communities'] },
      { key: 'resources', label: 'Resources', type: 'array', required: false, description: 'Apps, books, channels, tutors' }
    ],
    example: {
      task: 'Create a plan to reach B2 in Spanish',
      language: 'Spanish',
      current_level: 'A2',
      target_level: 'B2',
      timeframe: '4-6 months',
      skills_focus: ['Speaking', 'Listening', 'Vocabulary', 'Grammar'],
      practice_frequency: '5x/week',
      contexts: ['Business', 'Casual conversation'],
      resources: ['Duolingo', 'Coffee Break Spanish podcast', 'italki tutor weekly']
    }
  },
  {
    id: 'interview-preparation',
    name: 'Interview Preparation Plan',
    category: TEMPLATE_CATEGORIES.LEARNING,
    description: 'Generate a focused plan to prepare for interviews with question banks and practice routines',
    fields: [
      { key: 'task', label: 'Preparation Task', type: 'text', required: true, description: 'Interview preparation objective', defaultValue: 'Prepare for upcoming interviews' },
      { key: 'role', label: 'Role/Title', type: 'text', required: true, description: 'Target job role', placeholder: 'Frontend Engineer, Data Analyst, PM' },
      { key: 'experience_level', label: 'Experience Level', type: 'select', required: true, description: 'Your seniority', options: ['Entry', 'Junior', 'Mid', 'Senior'] },
      { key: 'interview_types', label: 'Interview Types', type: 'array', required: true, description: 'Types of interviews to prepare for', options: ['Behavioral', 'Technical Coding', 'System Design', 'Case Study', 'Take-home'] },
      { key: 'timeframe', label: 'Timeframe', type: 'select', required: true, description: 'Preparation period', options: ['2 weeks', '1 month', '6 weeks', '2-3 months'] },
      { key: 'weak_areas', label: 'Weak Areas', type: 'array', required: false, description: 'Topics to strengthen' },
      { key: 'daily_availability', label: 'Daily Availability', type: 'select', required: true, description: 'Study time per day', options: ['30 mins', '1 hour', '2 hours', '3+ hours'] },
      { key: 'practice_sources', label: 'Practice Sources', type: 'array', required: false, description: 'Question banks or platforms', options: ['LeetCode', 'HackerRank', 'Exercism', 'Pramp', 'Grokking'] }
    ],
    example: {
      task: 'Prepare for Frontend Engineer interviews',
      role: 'Frontend Engineer',
      experience_level: 'Mid',
      interview_types: ['Behavioral', 'Technical Coding', 'System Design'],
      timeframe: '1 month',
      weak_areas: ['Dynamic programming', 'Accessibility', 'System design tradeoffs'],
      daily_availability: '2 hours',
      practice_sources: ['LeetCode', 'Pramp', 'System Design Primer']
    }
  },
  {
    id: 'skill-mastery-roadmap',
    name: 'Skill Mastery Roadmap',
    category: TEMPLATE_CATEGORIES.LEARNING,
    description: 'Create a milestone-based plan to master a specific skill with projects and checkpoints',
    fields: [
      { key: 'task', label: 'Skill Task', type: 'text', required: true, description: 'Skill to master', defaultValue: 'Build a roadmap to master a skill' },
      { key: 'skill', label: 'Skill', type: 'text', required: true, description: 'Which skill?', placeholder: 'Data Visualization, Public Speaking, Prompt Engineering' },
      { key: 'current_level', label: 'Current Level', type: 'select', required: true, description: 'Starting proficiency', options: ['Beginner', 'Intermediate', 'Advanced'] },
      { key: 'target_outcome', label: 'Target Outcome', type: 'text', required: true, description: 'Clear measurable outcome', placeholder: 'Deliver a conference talk, publish a dashboard portfolio' },
      { key: 'timeframe', label: 'Timeframe', type: 'select', required: true, description: 'Overall time', options: ['4 weeks', '8 weeks', '12 weeks', '6 months'] },
      { key: 'projects', label: 'Project Ideas', type: 'array', required: false, description: 'Capstone or practice projects' },
      { key: 'checkpoints', label: 'Checkpoints', type: 'array', required: false, description: 'Milestones to validate progress' },
      { key: 'accountability', label: 'Accountability', type: 'select', required: false, description: 'How you will stay on track', options: ['Peer group', 'Mentor', 'Public updates', 'Habit tracker'] }
    ],
    example: {
      task: 'Master data visualization for analytics roles',
      skill: 'Data Visualization',
      current_level: 'Beginner',
      target_outcome: 'Build a portfolio of 5 quality dashboards and present insights',
      timeframe: '12 weeks',
      projects: ['Sales KPI dashboard in Tableau', 'Cohort analysis in Power BI', 'D3.js interactive chart'],
      checkpoints: ['Finish 2 dashboards by week 4', 'Publish a portfolio site by week 8', 'Present findings to peers by week 12'],
      accountability: 'Peer group'
    }
  },
  {
    id: 'microlearning-module',
    name: 'Microlearning Module Builder',
    category: TEMPLATE_CATEGORIES.LEARNING,
    description: 'Design bite-sized learning modules with objectives, activities, and quick assessments',
    fields: [
      { key: 'task', label: 'Module Task', type: 'text', required: true, description: 'Module objective', defaultValue: 'Create a microlearning module' },
      { key: 'topic', label: 'Topic', type: 'text', required: true, description: 'Module topic', placeholder: 'Git basics, SQL joins, Sales objections' },
      { key: 'audience', label: 'Audience', type: 'text', required: true, description: 'Who is this for?', placeholder: 'New hires, junior devs, sales trainees' },
      { key: 'duration', label: 'Module Duration', type: 'select', required: true, description: 'Module length', options: ['5 min', '10 min', '15 min', '20 min'] },
      { key: 'learning_objectives', label: 'Learning Objectives', type: 'array', required: true, description: 'Specific outcomes learners should achieve' },
      { key: 'activities', label: 'Activities', type: 'array', required: true, description: 'Short activities or exercises' },
      { key: 'assessment', label: 'Assessment', type: 'select', required: false, description: 'How to evaluate understanding', options: ['3-question quiz', 'Flashcards', 'Mini project', 'Peer review'] },
      { key: 'resources', label: 'Resources', type: 'array', required: false, description: 'Links, PDFs, or references' }
    ],
    example: {
      task: 'Create a 10-minute module on SQL JOINs',
      topic: 'SQL JOIN fundamentals',
      audience: 'Junior data analysts',
      duration: '10 min',
      learning_objectives: ['Differentiate INNER vs LEFT joins', 'Write a basic JOIN query', 'Identify common pitfalls'],
      activities: ['Watch 3-min explainer', 'Try 2 practice queries', 'Review cheat sheet'],
      assessment: '3-question quiz',
      resources: ['Mode SQL tutorials', 'SQLBolt lesson 6']
    }
  },
  {
    id: 'social-media-strategy',
    name: 'Social Media Strategy',
    category: TEMPLATE_CATEGORIES.MARKETING,
    description: 'Develop comprehensive social media marketing strategies',
    fields: [
      {
        key: 'task',
        label: 'Strategy Task',
        type: 'text',
        required: true,
        description: 'Main social media objective',
        defaultValue: 'Develop a comprehensive social media strategy'
      },
      {
        key: 'business_type',
        label: 'Business Type',
        type: 'text',
        required: true,
        description: 'What type of business or brand?',
        placeholder: 'SaaS startup, local restaurant, personal brand...'
      },
      {
        key: 'platforms',
        label: 'Target Platforms',
        type: 'array',
        required: true,
        description: 'Which social media platforms to focus on?',
        options: [
          'Instagram',
          'Facebook',
          'Twitter/X',
          'LinkedIn',
          'TikTok',
          'YouTube',
          'Pinterest',
          'Snapchat',
          'Reddit'
        ]
      },
      {
        key: 'target_audience',
        label: 'Target Audience',
        type: 'text',
        required: true,
        description: 'Who is your ideal audience?',
        placeholder: 'Young professionals aged 25-35 interested in productivity...'
      },
      {
        key: 'content_types',
        label: 'Content Types',
        type: 'array',
        required: false,
        description: 'What types of content to create?',
        options: [
          'Educational Posts',
          'Behind-the-Scenes',
          'User-Generated Content',
          'Product Showcases',
          'Industry News',
          'Inspirational Quotes',
          'Video Content',
          'Stories/Reels',
          'Live Streams'
        ]
      },
      {
        key: 'posting_frequency',
        label: 'Posting Frequency',
        type: 'select',
        required: false,
        description: 'How often to post on each platform?',
        options: [
          'Daily',
          '3-4 times per week',
          '2-3 times per week',
          'Weekly',
          'Bi-weekly'
        ]
      },
      {
        key: 'goals',
        label: 'Goals & KPIs',
        type: 'textarea',
        required: true,
        description: 'What do you want to achieve?',
        placeholder: 'Increase brand awareness, drive website traffic, generate leads...'
      }
    ],
    example: {
      task: 'Develop a social media strategy for a productivity app',
      business_type: 'SaaS productivity app',
      platforms: ['Instagram', 'LinkedIn', 'Twitter/X'],
      target_audience: 'Young professionals and entrepreneurs aged 25-40',
      content_types: ['Educational Posts', 'Product Showcases', 'User-Generated Content'],
      posting_frequency: '3-4 times per week',
      goals: 'Increase brand awareness by 50%, drive 1000 monthly app downloads, build a community of 10k followers'
    }
  },
  {
    id: 'business-strategy',
    name: 'Business Strategy Planning',
    category: TEMPLATE_CATEGORIES.BUSINESS,
    description: 'Create comprehensive business strategy and planning prompts',
    fields: [
      {
        key: 'task',
        label: 'Strategy Task',
        type: 'text',
        required: true,
        description: 'Main business strategy objective',
        defaultValue: 'Develop a comprehensive business strategy'
      },
      {
        key: 'business_stage',
        label: 'Business Stage',
        type: 'select',
        required: true,
        description: 'Current stage of the business',
        options: [
          'Idea Stage',
          'Startup',
          'Early Stage',
          'Growth Stage',
          'Mature Business',
          'Expansion/Scale'
        ]
      },
      {
        key: 'industry',
        label: 'Industry',
        type: 'text',
        required: true,
        description: 'What industry or market?',
        placeholder: 'Technology, Healthcare, E-commerce, Consulting...'
      },
      {
        key: 'time_horizon',
        label: 'Time Horizon',
        type: 'select',
        required: false,
        description: 'Strategic planning timeframe',
        options: [
          '6 months',
          '1 year',
          '2-3 years',
          '5 years',
          '10+ years'
        ]
      },
      {
        key: 'focus_areas',
        label: 'Focus Areas',
        type: 'array',
        required: false,
        description: 'Key areas to address in the strategy',
        options: [
          'Market Analysis',
          'Competitive Positioning',
          'Revenue Growth',
          'Cost Optimization',
          'Product Development',
          'Customer Acquisition',
          'Operations',
          'Team Building',
          'Funding/Investment'
        ]
      },
      {
        key: 'challenges',
        label: 'Current Challenges',
        type: 'textarea',
        required: false,
        description: 'What challenges is the business facing?',
        placeholder: 'Low customer retention, high competition, limited resources...'
      },
      {
        key: 'objectives',
        label: 'Strategic Objectives',
        type: 'textarea',
        required: true,
        description: 'What do you want to achieve?',
        placeholder: 'Increase revenue by 50%, expand to new markets, improve profitability...'
      }
    ],
    example: {
      task: 'Develop a growth strategy for an e-commerce startup',
      business_stage: 'Early Stage',
      industry: 'E-commerce Fashion',
      time_horizon: '2-3 years',
      focus_areas: ['Revenue Growth', 'Customer Acquisition', 'Market Analysis'],
      challenges: 'High customer acquisition costs, intense competition, limited brand recognition',
      objectives: 'Achieve $1M ARR, expand to 3 new markets, build a recognizable brand'
    }
  },
  {
    id: 'content-repurposing',
    name: 'Content Repurposing Strategy',
    category: TEMPLATE_CATEGORIES.CONTENT_CREATION,
    description: 'Transform existing content into multiple formats and platforms',
    fields: [
      {
        key: 'task',
        label: 'Repurposing Task',
        type: 'text',
        required: true,
        description: 'Main content repurposing objective',
        defaultValue: 'Repurpose existing content for multiple platforms'
      },
      {
        key: 'original_content',
        label: 'Original Content',
        type: 'textarea',
        required: true,
        description: 'Describe or paste the original content',
        placeholder: 'Blog post about "10 Tips for Remote Work Productivity"...'
      },
      {
        key: 'original_format',
        label: 'Original Format',
        type: 'select',
        required: true,
        description: 'Current format of the content',
        options: [
          'Blog Post',
          'Video',
          'Podcast',
          'Webinar',
          'Presentation',
          'Whitepaper',
          'Case Study',
          'Social Media Post'
        ]
      },
      {
        key: 'target_formats',
        label: 'Target Formats',
        type: 'array',
        required: true,
        description: 'What formats to repurpose into?',
        options: [
          'Social Media Posts',
          'Email Newsletter',
          'Video Script',
          'Podcast Episode',
          'Infographic',
          'Slide Deck',
          'Short-form Videos',
          'LinkedIn Articles',
          'Twitter Threads'
        ]
      },
      {
        key: 'target_platforms',
        label: 'Target Platforms',
        type: 'array',
        required: false,
        description: 'Which platforms to distribute on?',
        options: [
          'Instagram',
          'LinkedIn',
          'Twitter/X',
          'Facebook',
          'TikTok',
          'YouTube',
          'Email',
          'Blog',
          'Medium'
        ]
      },
      {
        key: 'audience_adaptation',
        label: 'Audience Adaptation',
        type: 'text',
        required: false,
        description: 'How should the content be adapted for different audiences?',
        placeholder: 'Make it more casual for social media, more professional for LinkedIn...'
      }
    ],
    example: {
      task: 'Repurpose a blog post about remote work productivity',
      original_content: 'A 2000-word blog post titled "10 Essential Tips for Remote Work Productivity" covering workspace setup, time management, communication, and work-life balance',
      original_format: 'Blog Post',
      target_formats: ['Social Media Posts', 'Video Script', 'Email Newsletter', 'Infographic'],
      target_platforms: ['LinkedIn', 'Instagram', 'Twitter/X', 'YouTube'],
      audience_adaptation: 'Make LinkedIn version more professional and detailed, Instagram version more visual and casual, Twitter version concise with key takeaways'
    }
  }
]

export default templates
