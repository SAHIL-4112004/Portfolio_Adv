// scripts/migrate-to-supabase.js
import dotenv from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environmental variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULT_PORTFOLIO_DATA = {
  hero: {
    greeting: "Hi, I'm MD Sahil Khan",
    name: "Computer Science &\nEngineering Student",
    bio: "Hello! I'm MD Sahil Khan, a dedicated Computer Science & Engineering student passionate about coding, problem solving, and building innovative software solutions. I transform ideas into functional applications that impact users positively.",
    cvLink: "https://drive.google.com/drive/folders/1zZK5nKXhSSaYwZX2ELFWuimHo0HtAEzG?usp=drive_link",
    codolioLink: "https://codolio.com/profile/SAHIL_4112004",
    linkedinLink: "https://www.linkedin.com/in/md-sahil-khan-15b719299/",
    githubLink: "https://github.com/SAHIL-4112004",
    imageUrl: "imgs/PP-1.jpeg"
  },
  stats: [
    { id: "1", number: "3+", text: "Projects\nCompleted" },
    { id: "2", number: "5+", text: "Technical\nCertificates" },
    { id: "3", number: "2+", text: "Hackathons\nAttended" },
    { id: "4", number: "1", text: "Job\nSimulator" }
  ],
  about: {
    imageUrl: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=600&q=80",
    title: "About Me",
    subtitle: "I'm a Passionate Web Developer who loves crafting beautiful digital experiences.",
    par1: "I have always been fascinated by how technology shapes our world. My journey into programming started with a simple curiosity and quickly evolved into a passion. I specialize in building robust web applications that not only solve real-world problems but also provide an intuitive and engaging user experience.",
    par2: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or learning about software architecture. I'm always looking for opportunities to grow and collaborate with like-minded individuals.",
    name: "MD Sahil Khan",
    email: "sahil4112004khan@mail.com",
    location: "Vadodara, Gujarat",
    availability: "Open for work"
  },
  education: [
    { id: "1", date: "Present", title: "B.Tech Computer Science & Engineering", subtitle: "Parul University, Vadodara, Gujarat" },
    { id: "2", date: "Past", title: "Higher Secondary Education", subtitle: "Kendriya Vidyalaya SPM, Narmadapuram, Madhya Pradesh" }
  ],
  skills: [
    { id: "1", icon: "fa-brands fa-html5", name: "HTML & CSS" },
    { id: "2", icon: "fa-brands fa-js", name: "JavaScript" },
    { id: "3", icon: "fa-brands fa-java", name: "Java" },
    { id: "4", icon: "fa-solid fa-database", name: "MySQL" },
    { id: "5", icon: "fa-solid fa-database", name: "MongoDB" },
    { id: "6", icon: "fa-brands fa-git-alt", name: "Git & GitHub" },
    { id: "7", icon: "fa-brands fa-linux", name: "Linux" }
  ],
  projects: [
    {
      id: "1",
      title: "AppDost",
      technologies: "React Native, Firebase, Context API",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      link: "https://github.com/SAHIL-4112004/AppDost-Assignment",
      liveLink: "",
      description: "React Native mobile assignment showcasing Firebase integration and state management."
    },
    {
      id: "2",
      title: "Student Placement Management System",
      technologies: "Java, Spring Boot, MySQL",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
      link: "https://github.com/SAHIL-4112004/Student-Placement-Management-System",
      liveLink: "",
      description: "A comprehensive backend system for placement tracking built with Java Spring Boot."
    }
  ],
  experience: [
    {
      id: "1",
      date: "2025 - Present",
      title: "Software Engineering Intern",
      subtitle: "Tech Innovators Inc.",
      description: "Working on building scalable backend services using Java and Spring Boot. Integrated MySQL databases to optimize data retrieval speeds.",
      link: "https://example.com"
    },
    {
      id: "2",
      date: "Summer 2024",
      title: "Frontend Developer Intern",
      subtitle: "Creative Digital Agency",
      description: "Developed responsive web interfaces using HTML, CSS, and JavaScript. Improved overall site performance and accessibility.",
      link: "https://example.com"
    },
    {
      id: "3",
      date: "2023 - 2024",
      title: "Web Design Freelancer",
      subtitle: "Self-Employed",
      description: "Designed and delivered custom websites for small local businesses. Managed client communication and project timelines.",
      link: "https://example.com"
    },
    {
      id: "4",
      date: "Fall 2023",
      title: "UI/UX Research Assistant",
      subtitle: "University Lab",
      description: "Conducted user testing sessions and gathered feedback to improve the university's student portal design.",
      link: "https://example.com"
    }
  ],
  certificates: [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80", title: "Computer Network & Internet Protocol", issuer: "Issued by NPTEL", link: "https://nptel.ac.in" },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", title: "Job Simulator", issuer: "Issued by Deloitte", link: "https://www.deloitte.com" },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80", title: "Vadodara Hackathon 6.0", issuer: "Issued by PIERC", link: "https://hackathon.paruluniversity.ac.in" },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80", title: "DSA with Java", issuer: "Issued by Apna College", link: "https://apnacollege.in" },
    { id: "5", imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80", title: "Frontend Web Development", issuer: "Issued by FreeCodeCamp", link: "https://freecodecamp.org" },
    { id: "6", imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80", title: "Introduction to Cybersecurity", issuer: "Issued by Cisco", link: "https://netacad.com" },
    { id: "7", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", title: "React Basics", issuer: "Issued by Coursera", link: "https://coursera.org" },
    { id: "8", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80", title: "Advanced CSS and Sass", issuer: "Issued by Udemy", link: "https://udemy.com" },
    { id: "9", imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=600&q=80", title: "Agile Development", issuer: "Issued by LinkedIn Learning", link: "https://linkedin.com/learning" }
  ],
  badges: [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=150&q=80", title: "Top Performer", link: "https://example.com" },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=150&q=80", title: "Problem Solver", link: "https://example.com" },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=150&q=80", title: "Innovator", link: "https://example.com" },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80", title: "Team Player", link: "https://example.com" },
    { id: "5", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=150&q=80", title: "Fast Learner", link: "https://example.com" },
    { id: "6", imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80", title: "Tech Enthusiast", link: "https://example.com" },
    { id: "7", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=150&q=80", title: "Clean Coder", link: "https://example.com" },
    { id: "8", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80", title: "Data Master", link: "https://example.com" },
    { id: "9", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80", title: "UX Advocate", link: "https://example.com" }
  ],
  extracurricular: [
    { id: "1", date: "2024 - Present", title: "Tech Club Core Member", subtitle: "Organizing hackathons and coding workshops for university students.", link: "https://example.com" },
    { id: "2", date: "2023 - 2024", title: "Volunteer at Local NGO", subtitle: "Teaching basic computer skills to underprivileged children.", link: "https://example.com" },
    { id: "3", date: "2022 - 2023", title: "Google Developer Student Club", subtitle: "Active participant in study jams and peer learning sessions.", link: "https://example.com" },
    { id: "4", date: "2021 - 2022", title: "Debate Society", subtitle: "Participated in national level inter-university debate competitions.", link: "https://example.com" },
    { id: "5", date: "2022 - Present", title: "Open Source Contributor", subtitle: "Contributing to various beginner-friendly repositories on GitHub.", link: "https://example.com" },
    { id: "6", date: "2021", title: "Science Fair Finalist", subtitle: "Presented a project on smart waste management using IoT.", link: "https://example.com" }
  ],
  contact: {
    phone: "+01 123 654 8096",
    email: "sahil@mail.com",
    address: "Warne Park Street Pine, FL 33157, New York"
  }
};

async function migrate() {
  console.log("🔄 Connecting to Supabase...");
  
  // Check if data already exists
  const { data: existingData, error: fetchError } = await supabase
    .from('portfolio')
    .select('data')
    .eq('id', 'default')
    .maybeSingle();

  if (fetchError) {
    console.error("❌ Error querying database. Have you created the 'portfolio' table in Supabase?", fetchError.message);
    process.exit(1);
  }

  if (existingData) {
    console.log("ℹ️ Portfolio data already exists in Supabase. Upserting default data to ensure it is fully seeded...");
  } else {
    console.log("🌱 No existing portfolio data found. Seeding database with default data...");
  }

  const { error: upsertError } = await supabase
    .from('portfolio')
    .upsert({ id: 'default', data: DEFAULT_PORTFOLIO_DATA });

  if (upsertError) {
    console.error("❌ Error upserting portfolio data to Supabase:", upsertError.message);
    process.exit(1);
  }

  console.log("✨ Migration completed successfully! Portfolio data is now in Supabase.");
}

migrate();
