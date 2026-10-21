// Single Source of Truth for macOS Desktop Portfolio
// Verbatim data from CV. Do not invent or alter facts, numbers, dates, or issuers.

// TODO confirm: 201126 or 201226 (CV lists Dhiraj201126 while repositories live under Dhiraj201226)
export const GITHUB_PROFILE = 'https://github.com/Dhiraj201126';

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  period: string;
  degree?: string;
  gpaOrGrade?: string;
  coursework?: string[];
  entranceResults?: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  technologies: string[];
  period: string;
  repoUrl: string;
  liveUrl?: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface AwardEntry {
  id: string;
  title: string;
  issuer: string;
  description: string;
  repoUrl?: string;
}

export interface CertificateEntry {
  id: string;
  title: string;
  issuer: string;
  organization: string;
  category: 'Publication' | 'Internship' | 'Coursework';
  date: string;
  credentialId?: string;
  grade?: string;
  image: string;
  skills: string[];
  verificationBadges: string[];
  description: string;
  relatedProject?: string;
  paperTitle?: string;
  doi?: string;
}

export interface LeadershipEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  url: string; // TODO real URL
  summary: string;
  isPlaceholder?: boolean;
}

export interface UsabilityTask {
  id: string;
  name: string;
  description: string;
  targetWindow: string;
}

export interface SUSQuestion {
  id: number;
  text: string;
}

export interface ProfileData {
  personal: {
    name: string;
    phone: string;
    email: string;
    linkedIn: string;
    github: string;
    menuBarStatus: string;
    aboutSummary: string;
    interests: string[];
    role: string;
  };
  education: EducationEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  awards: AwardEntry[];
  certifications: CertificateEntry[];
  leadership: LeadershipEntry[];
  posts: BlogPost[];
  evaluation: {
    tasks: UsabilityTask[];
    susQuestions: SUSQuestion[];
  };
}

export const PROFILE_DATA: ProfileData = {
  personal: {
    name: 'Dhiraj Shirse',
    phone: '+91 9373336927',
    email: 'dhirajshirse2006@gmail.com',
    linkedIn: 'https://linkedin.com/in/dhiraj-shirse-645445328/',
    github: GITHUB_PROFILE,
    menuBarStatus: 'Dhiraj Shirse | B.Tech Computer Engineering, VJTI | Open to internships',
    aboutSummary:
      "I'm a computer engineering student at Veermata Jijabai Technological Institute (VJTI), Mumbai, with experience developing AI-powered systems including FinIntel, Fake My Voice, and NeuralEye. Active on campus as a Project X core member, Class Representative for Computer Engineering, and Department Head in the Technical Committee of Technovanza 2025–26. Open to internships. Interests: fintech, edtech, developer tools.",
    interests: ['fintech', 'edtech', 'developer tools'],
    role: 'B.Tech Computer Engineering, VJTI'
  },
  education: [
    {
      id: 'vjti',
      institution: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
      location: 'Mumbai',
      period: 'Sep 24 - Present',
      degree: 'B.Tech in Computer Engineering',
      gpaOrGrade: 'CGPA: 8.75',
      coursework: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'Database Management Systems',
        'Object Oriented Programming',
        'Software Engineering',
        'Automata Theory'
      ]
    },
    {
      id: 'yashwantrao',
      institution: 'Late Yashwantrao Chavan Junior College, Latur',
      location: 'Latur',
      period: 'Aug 22 - Mar 24',
      entranceResults: [
        'JEE Advanced: AIR 11461',
        'MHT-CET: 99.93% (Rank 179)',
        'JEE Main: 97.8%',
        'HSC: 85.5%'
      ]
    }
  ],
  projects: [
    {
      id: 'finintel',
      title: 'FinIntel – AI Financial Stock Advisor',
      technologies: ['React', 'FastAPI', 'ChromaDB'],
      period: 'May 26 – Jun 26',
      repoUrl: 'https://github.com/Dhiraj201226/Fin-Intel.git',
      bullets: [
        'Built a RAG-powered financial advisory platform using React, FastAPI, ChromaDB, and multiple LLMs to generate explainable investment insights from financial statements and company documents.',
        'Designed a two-tier retrieval architecture that first searches embedded financial documents from ChromaDB, then falls back to fundamental company data retrieval through y-finance, implemented caching to reduce redundant API calls.',
        'Developed a deterministic recommendation engine that evaluates companies across Growth, Profitability, and Financial Health dimensions and computes confidence-based BUY/HOLD/SELL recommendations, integrated with a multi-LLM routing layer supporting Gemini, OpenAI and Ollama.'
      ]
    },
    {
      id: 'fake-my-voice',
      title: 'Fake My Voice – Neural Voice Cloning System',
      technologies: ['PyTorch', 'Librosa', 'Torchaudio'],
      period: 'Jul 25 - Oct 25',
      repoUrl: 'https://github.com/nihira20/Fake_My_Voice',
      bullets: [
        'Built a multi-speaker voice cloning pipeline using Tacotron2 for text-to-mel synthesis, WaveGlow for high-fidelity speech generation, and a GE2E speaker encoder with 100+ speakers to learn discriminative speaker embeddings.',
        'Trained deep learning models on the 24-hour LJSpeech dataset and multi-speaker datasets including VCTK, achieving 92% speaker verification accuracy.',
        'Implemented text-to-phoneme conversion, mel-spectrogram generation, silence trimming, and audio denoising to improve speech naturalness and output quality. Cloned the voice with just 5 sec audio input and text.'
      ]
    },
    {
      id: 'neuraleye',
      title: 'NeuralEye – AI-Generated Content Detection Platform',
      technologies: ['Python', 'PyTorch', 'React', 'FastAPI', 'OpenCV'],
      period: 'Mar 26 - Apr 26',
      repoUrl: 'https://github.com/Dhiraj201226/neuraleye-ai-detection',
      bullets: [
        'Built and deployed an AI-generated content detection platform using React, FastAPI, PyTorch for real-time image and video authenticity analysis.',
        'Trained and evaluated a ResNet50-based classifier on the 120K-image CIFAKE dataset, achieving 98% classification accuracy while supporting real-time predictions with confidence scoring.',
        'Implemented a video-analysis pipeline that extracts frames at 4-second intervals, performs frame-level inference, and aggregates prediction scores to generate a final authenticity assessment.'
      ]
    }
  ],
  skills: [
    {
      category: 'Languages',
      items: ['C++', 'Python', 'JavaScript', 'HTML', 'CSS']
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'PyTorch', 'FastAPI', 'NumPy']
    },
    {
      category: 'Tools & Databases',
      items: ['Git', 'GitHub', 'VS Code', 'Linux', 'SQLite']
    },
    {
      category: 'Concepts',
      items: ['RAG', 'Machine Learning', 'Neural Networks', 'Computer Vision', 'NLP']
    }
  ],
  awards: [
    {
      id: 'sih-2025',
      title: 'Reached the Pre-Final Stage of SIH 2025',
      issuer: 'Smart India Hackathon 2025',
      description:
        'Reached the Pre-Final Stage of SIH 2025 by developing a full-stack application that enabled ASHA health workers to record, manage, and synchronize healthcare data efficiently in low-connectivity regions.',
      repoUrl: 'https://github.com/hellokitty09/builder-vortex-garden.git'
    },
    {
      id: 'hacktoberfest-2025',
      title: 'Completed Hacktoberfest 2025',
      issuer: 'Hacktoberfest 2025',
      description: 'Completed Hacktoberfest 2025 with 6 pull requests merged into open-source repositories.'
    },
    {
      id: 'technovanza-vrc',
      title: "Led Red Phoenix to overall victory in Technovanza's inter-group competition",
      issuer: 'Technovanza, VJTI',
      description:
        "Led Red Phoenix to overall victory in Technovanza's inter-group competition by winning VRC – the highest point-weighted technical event."
    }
  ],
  certifications: [
    {
      id: 'ijert-fakemyvoice',
      title: 'Certificate of Publication – Research Paper',
      paperTitle:
        'FakeMyVoice: A Hybrid Multi-Stage Deep Learning Pipeline for Low-Resource Speaker-Conditioned Voice Cloning with Adversarial Robustness and Ethical Safeguards',
      issuer: 'International Journal of Engineering Research & Technology (IJERT)',
      organization: 'IJERT (ISSN: 2278-0181) | Peer-Reviewed Journal',
      category: 'Publication',
      date: 'June 2026 (Published: 22-06-2026)',
      credentialId: 'IJERTV15IS060623',
      doi: '10.17577',
      image: '/certificates/ijert-fakemyvoice-publication.png',
      skills: ['Deep Learning', 'PyTorch', 'Voice Cloning', 'Adversarial Robustness', 'Speech Synthesis', 'Ethical Safeguards'],
      verificationBadges: ['Peer-Reviewed Journal', 'UGC Compliant 2025', 'ISO 9001:2015', 'Open Access', 'Crossref DOI: 10.17577', 'Zenodo'],
      description:
        "Has published a research paper entitled 'FakeMyVoice: A Hybrid Multi-Stage Deep Learning Pipeline for Low-Resource Speaker-Conditioned Voice Cloning with Adversarial Robustness and Ethical Safeguards' in IJERT, Volume 15, Issue 06, June - 2026.",
      relatedProject: 'Fake My Voice – Neural Voice Cloning System'
    },
    {
      id: 'lenovo-aicte-internship',
      title: 'Certificate of Completion – 6-Week AICTE Internship',
      issuer: 'Lenovo LEAP NextGen Scholar Program',
      organization: 'Lenovo CSR Initiative in association with AICTE, implemented by BharatCares',
      category: 'Internship',
      date: 'June - July 2026 (Issued: 30/07/26)',
      credentialId: '4710019',
      image: '/certificates/lenovo-aicte-genai-internship.png',
      skills: ['Generative AI', 'Agentic Systems Engineering', 'LLM Architectures', 'AI Agents', 'Applied AI Systems'],
      verificationBadges: ['AICTE Recognized', 'Lenovo LEAP Scholar', 'BharatCares (SMEC Trust)', '6-Week Internship'],
      description:
        'Successfully completed 6-week AICTE internship on "Generative AI & Agentic Systems Engineering", under the Lenovo LEAP NextGen Scholar Program, conducted during June–July 2026 in association with All India Council for Technical Education (AICTE).'
    },
    {
      id: 'lenovo-skill-india-ai',
      title: 'Certificate of Completion – Artificial Intelligence (Grade B)',
      issuer: 'Lenovo LEAP NextGen Scholar Program & Skill India',
      organization: 'Skill India (कौशल भारत - कुशल भारत) | BharatCares | Navriti Empowering Lives',
      category: 'Coursework',
      date: '15-07-2026',
      credentialId: 'NTPL/BC/Lenovo/2026/1093',
      grade: 'Grade B',
      image: '/certificates/lenovo-skill-india-ai.png',
      skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Data Science', 'Neural Networks'],
      verificationBadges: ['Skill India Certified', 'Grade B Awarded', '60+ Hours Learning', 'Lenovo LEAP Scholar'],
      description:
        'Successfully completed 60+ hours of learning in Artificial Intelligence under the Lenovo LEAP NextGen Scholar Program, demonstrated active involvement, dedication, and commitment throughout the program, awarded Grade B.'
    }
  ],
  leadership: [
    {
      id: 'project-x',
      role: 'Core Member',
      organization: 'Project X (VJTI)',
      period: 'Jul 25 – Present',
      bullets: [
        'Member of ProjectX, a student-led technical club at VJTI focused on peer learning and mentorship.',
        'Conducted workshops and contributed to a structured mentorship program to teach and guide junior students.'
      ]
    },
    {
      id: 'class-rep',
      role: 'Class Representative',
      organization: 'SY B.Tech Computer Engineering, VJTI Mumbai',
      period: 'Jul 25 – Present',
      bullets: [
        'Represent 80+ students to faculty and administration; coordinate scheduling, communications, and event logistics.',
        'Collected student feedback and coordinated with faculty on academic and administrative matters, while managing class-wide communication of important updates and deadlines.'
      ]
    },
    {
      id: 'technovanza-tech',
      role: 'Department Head – Technical Committee',
      organization: 'Technovanza 2025-26',
      period: 'Sep 25 – Apr 26',
      bullets: [
        'Served as Department Head in the Technical Committee of Technovanza 2025–26, coordinating volunteers and event operations for a technology festival attended by 10,000+ visitors and industry exhibitors.'
      ]
    }
  ],
  posts: [
    {
      id: 'dev-post-1',
      title: 'Building Intelligent Systems & Side Hustle with Open AI',
      date: 'Oct 2026',
      url: 'https://dev.to/dhiraj201226/hacktoberfest-side-hustle', // TODO real URL
      summary:
        'A comprehensive walkthrough of designing full-stack AI workflows, RAG pipelines, and open-source models for real-world impact.',
      isPlaceholder: true
    }
  ],
  evaluation: {
    tasks: [
      {
        id: 'task-1',
        name: 'Find the NeuralEye project',
        description: 'Locate NeuralEye in Xcode or Finder and review its CV bullets & repository link.',
        targetWindow: 'xcode'
      },
      {
        id: 'task-2',
        name: 'Download the CV',
        description: 'Open the PDF viewer window and click Download to fetch Dhiraj_Resume_FINAL.pdf.',
        targetWindow: 'pdf'
      },
      {
        id: 'task-3',
        name: 'Find the contact email',
        description: 'Locate Dhiraj Shirse\'s contact email in Contacts or compose in Mail.',
        targetWindow: 'contacts'
      }
    ],
    susQuestions: [
      { id: 1, text: 'I think that I would like to use this system frequently.' },
      { id: 2, text: 'I found the system unnecessarily complex.' },
      { id: 3, text: 'I thought the system was easy to use.' },
      { id: 4, text: 'I think that I would need the support of a technical person to be able to use this system.' },
      { id: 5, text: 'I found the various functions in this system were well integrated.' },
      { id: 6, text: 'I thought there was too much inconsistency in this system.' },
      { id: 7, text: 'I would imagine that most people would learn to use this system very quickly.' },
      { id: 8, text: 'I found the system very cumbersome to use.' },
      { id: 9, text: 'I felt very confident using the system.' },
      { id: 10, text: 'I needed to learn a lot of things before I could get going with this system.' }
    ]
  }
};
