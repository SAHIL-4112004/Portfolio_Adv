// scripts/seed-real-data.js
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environmental variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// MIME type helper
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.pdf': return 'application/pdf';
    default: return 'application/octet-stream';
  }
}

// Function to upload a file to Supabase Storage
async function uploadToStorage(localFileName) {
  const localPath = path.join(process.cwd(), 'imgs', localFileName);
  
  if (!fs.existsSync(localPath)) {
    console.warn(`⚠️ Warning: Local file ${localPath} does not exist.`);
    return null;
  }

  console.log(`📤 Uploading ${localFileName} to Supabase Storage...`);
  const fileBuffer = fs.readFileSync(localPath);
  const mimeType = getMimeType(localPath);

  try {
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(localFileName, fileBuffer, {
        contentType: mimeType,
        upsert: true
      });

    if (error) {
      console.error(`❌ Failed to upload ${localFileName}:`, error.message);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(localFileName);

    if (publicUrlData && publicUrlData.publicUrl) {
      console.log(`✅ Uploaded ${localFileName} -> ${publicUrlData.publicUrl}`);
      return publicUrlData.publicUrl;
    }
  } catch (err) {
    console.error(`❌ Error uploading ${localFileName}:`, err);
  }
  return null;
}

async function main() {
  console.log("🚀 Starting database seeding with real portfolio data...");

  // 1. Upload all required files
  const filesToUpload = [
    'PP-1.jpeg',
    'CN&IP.png',
    'JOBSIMULATOR.png',
    'VH_6.0.png',
    'VH_5.0.jpg',
    'DSA_APNACLG.png',
    'GDG_CSC.png',
    'AWS_Cloud_1.png',
    'AI_Fundamental.png',
    'Hashgraph.png',
    '50D_LC_25.png',
    '100D_LC_25.png',
    '50D_LC_26.png',
    '100D_LC_26.png',
    'CodeChefBadge.png',
    'Smart_Coder.png',
    'AWS_CF_B.png',
    'AI_F_B.png',
    'CC-skill-test-1.png',
    'TecgEXPO25.png'
  ];

  const urls = {};
  for (const file of filesToUpload) {
    const publicUrl = await uploadToStorage(file);
    if (publicUrl) {
      urls[file] = publicUrl;
    } else {
      // Fallback to local path or placeholder if upload fails
      urls[file] = `imgs/${file}`;
    }
  }

  // Define the real portfolio data object using the uploaded storage URLs
  const REAL_PORTFOLIO_DATA = {
    hero: {
      greeting: "Hi, I'm MD Sahil Khan",
      name: "Computer Science &\nEngineering Student",
      bio: "Hello! I'm MD Sahil Khan, a dedicated Computer Science & Engineering student passionate about coding, problem solving, and building innovative software solutions. I transform ideas into functional applications that impact users positively.",
      cvLink: "https://drive.google.com/drive/folders/1zZK5nKXhSSaYwZX2ELFWuimHo0HtAEzG?usp=drive_link",
      codolioLink: "https://codolio.com/profile/SAHIL_4112004",
      linkedinLink: "https://www.linkedin.com/in/md-sahil-khan-15b719299/",
      githubLink: "https://github.com/SAHIL-4112004",
      imageUrl: urls['PP-1.jpeg']
    },
    stats: [
      { id: "1", number: "3+", text: "Projects\nCompleted" },
      { id: "2", number: "5+", text: "Technical\nCertificates" },
      { id: "3", number: "2+", text: "Hackathons\nAttended" },
      { id: "4", number: "1", text: "Job\nSimulator" }
    ],
    about: {
      imageUrl: urls['PP-1.jpeg'],
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
        imageUrl: urls['CC-skill-test-1.png'],
        link: "https://github.com/SAHIL-4112004/AppDost-Assignment",
        liveLink: "",
        description: "React Native mobile assignment showcasing Firebase integration and state management."
      },
      {
        id: "2",
        title: "Student Placement Management System",
        technologies: "Java, Spring Boot, MySQL",
        imageUrl: urls['TecgEXPO25.png'],
        link: "https://github.com/SAHIL-4112004/Student-Placement-Management-System",
        liveLink: "",
        description: "A comprehensive backend system for placement tracking built with Java Spring Boot."
      }
    ],
    experience: [],
    certificates: [
      { id: "1", imageUrl: urls['CN&IP.png'], title: "Computer Network & Internet Protocol", issuer: "Issued by NPTEL", link: "https://nptel.ac.in" },
      { id: "2", imageUrl: urls['JOBSIMULATOR.png'], title: "Job Simulator", issuer: "Issued by Deloitte", link: "https://www.deloitte.com" },
      { id: "3", imageUrl: urls['VH_6.0.png'], title: "Vadodara Hackathon 6.0", issuer: "Issued by PIERC", link: "https://hackathon.paruluniversity.ac.in" },
      { id: "4", imageUrl: urls['VH_5.0.jpg'], title: "Vadodara Hackathon 5.0", issuer: "Issued by PIERC", link: "https://hackathon.paruluniversity.ac.in" },
      { id: "5", imageUrl: urls['DSA_APNACLG.png'], title: "DSA with Java", issuer: "Issued by Apna College", link: "https://apnacollege.in" },
      { id: "6", imageUrl: urls['AWS_Cloud_1.png'], title: "AWS Academy Graduate - Cloud Foundations", issuer: "Issued by AWS Academy", link: "https://aws.amazon.com/training/awsacademy/" },
      { id: "7", imageUrl: urls['AI_Fundamental.png'], title: "IBM AI Fundamentals", issuer: "Issued by IBM", link: "https://www.credly.com" },
      { id: "8", imageUrl: urls['Hashgraph.png'], title: "Hedera Hashgraph", issuer: "Issued by Hedera", link: "https://hedera.com" },
      { id: "9", imageUrl: urls['GDG_CSC.png'], title: "GDG DevFest Vadodara", issuer: "Issued by Google Developer Groups", link: "https://gdg.community.dev" }
    ],
    badges: [
      { id: "1", imageUrl: urls['50D_LC_25.png'], title: "LeetCode 50 Days 2025", link: "https://leetcode.com" },
      { id: "2", imageUrl: urls['100D_LC_25.png'], title: "LeetCode 100 Days 2025", link: "https://leetcode.com" },
      { id: "3", imageUrl: urls['50D_LC_26.png'], title: "LeetCode 50 Days 2026", link: "https://leetcode.com" },
      { id: "4", imageUrl: urls['100D_LC_26.png'], title: "LeetCode 100 Days 2026", link: "https://leetcode.com" },
      { id: "5", imageUrl: urls['CodeChefBadge.png'], title: "CodeChef Badge", link: "https://www.codechef.com" },
      { id: "6", imageUrl: urls['Smart_Coder.png'], title: "Smart Coder Badge", link: "https://example.com" },
      { id: "7", imageUrl: urls['AWS_CF_B.png'], title: "AWS Cloud Foundations", link: "https://example.com" },
      { id: "8", imageUrl: urls['AI_F_B.png'], title: "AI Fundamentals Badge", link: "https://example.com" },
      { id: "9", imageUrl: urls['GDG_CSC.png'], title: "GDG Cloud Student Club Badge", link: "https://gdg.community.dev" }
    ],
    extracurricular: [],
    contact: {
      phone: "",
      email: "sahil4112004khan@mail.com",
      address: "Vadodara, Gujarat"
    },
    certificatesPerRow: 3,
    badgesPerRow: 3,
    defaultTheme: 'dark',
    defaultHighlightColor: '#8750f7',
    sections: [
      { id: 'hero', name: 'Hero Section', visible: true },
      { id: 'stats', name: 'Stats Section', visible: true },
      { id: 'about', name: 'About Me', visible: true },
      { id: 'education', name: 'Education', visible: true },
      { id: 'skills', name: 'Skills', visible: true },
      { id: 'projects', name: 'Projects', visible: true },
      { id: 'experience', name: 'Experience', visible: false }, // Set experience to false by default as requested in database schema or previous setups
      { id: 'certificates', name: 'Certificates', visible: true },
      { id: 'badges', name: 'Badges', visible: true },
      { id: 'extracurricular', name: 'Extracurricular', visible: true },
      { id: 'contact', name: 'Contact Info', visible: true }
    ]
  };

  console.log("🔄 Upserting real portfolio data to Supabase...");
  const { error: upsertError } = await supabase
    .from('portfolio')
    .upsert({ id: 'default', data: REAL_PORTFOLIO_DATA });

  if (upsertError) {
    console.error("❌ Error upserting to Supabase:", upsertError.message);
    process.exit(1);
  }

  console.log("✨ Seeding completed successfully! Supabase now has real portfolio data.");
}

main();
