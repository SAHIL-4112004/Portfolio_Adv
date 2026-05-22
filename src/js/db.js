// Database Abstraction Layer
// Uses Supabase with a LocalStorage fallback for maximum robustness.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error("Failed to initialize Supabase client:", e);
  }
} else {
  console.warn("Supabase credentials missing. Falling back to LocalStorage.");
}

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
    { id: 'experience', name: 'Experience', visible: true },
    { id: 'certificates', name: 'Certificates', visible: true },
    { id: 'badges', name: 'Badges', visible: true },
    { id: 'extracurricular', name: 'Extracurricular', visible: true },
    { id: 'contact', name: 'Contact Info', visible: true }
  ]
};

// ==========================================
// Centralized API Functions
// ==========================================

// Helper to migrate legacy data structures to current spec
function migratePortfolioData(data) {
  let migrated = false;
  if (!data) return { data, migrated };

  if (!data.sections) {
    data.sections = [
      { id: 'hero', name: 'Hero Section', visible: true },
      { id: 'stats', name: 'Stats Section', visible: true },
      { id: 'about', name: 'About Me', visible: true },
      { id: 'education', name: 'Education', visible: true },
      { id: 'skills', name: 'Skills', visible: true },
      { id: 'projects', name: 'Projects', visible: true },
      { id: 'experience', name: 'Experience', visible: true },
      { id: 'certificates', name: 'Certificates', visible: true },
      { id: 'badges', name: 'Badges', visible: true },
      { id: 'extracurricular', name: 'Extracurricular', visible: true },
      { id: 'contact', name: 'Contact Info', visible: true }
    ];
    migrated = true;
  }

  if (data.certificatesPerRow === undefined) {
    data.certificatesPerRow = 3;
    migrated = true;
  }

  if (data.badgesPerRow === undefined) {
    data.badgesPerRow = 3;
    migrated = true;
  }

  if (data.defaultTheme === undefined) {
    data.defaultTheme = 'dark';
    migrated = true;
  }

  if (data.defaultHighlightColor === undefined) {
    data.defaultHighlightColor = '#8750f7';
    migrated = true;
  }

  ['experience', 'certificates', 'badges', 'extracurricular'].forEach(collection => {
    if (data[collection]) {
      data[collection].forEach(item => {
        if (item.link === undefined) {
          item.link = '';
          migrated = true;
        }
      });
    }
  });

  if (data.projects) {
    data.projects.forEach(item => {
      if (item.liveLink === undefined) {
        item.liveLink = '';
        migrated = true;
      }
    });
  }

  return { data, migrated };
}

export async function getPortfolioData() {
  if (!supabase) {
    return getLocalPortfolioData();
  }

  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('data')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.warn("Supabase query error, falling back to LocalStorage:", error.message);
      return getLocalPortfolioData();
    }

    if (data && data.data) {
      const { data: migratedData, migrated } = migratePortfolioData(data.data);
      if (migrated) {
        await savePortfolioData(migratedData);
      }
      localStorage.setItem('portfolio_data_is_live', 'true');
      return migratedData;
    } else {
      // First run: data doesn't exist in Supabase yet.
      console.log("No data found in Supabase. Attempting automatic migration of LocalStorage data...");
      const localData = await getLocalPortfolioData();
      
      // Seed Supabase with local data
      try {
        const { error: upsertError } = await supabase
          .from('portfolio')
          .upsert({ id: 'default', data: localData });
        
        if (upsertError) {
          console.error("Failed to seed Supabase with local data:", upsertError.message);
        } else {
          console.log("Successfully seeded Supabase with local portfolio data.");
        }
      } catch (e) {
        console.error("Error auto-migrating to Supabase:", e);
      }

      return localData;
    }
  } catch (err) {
    console.error("Supabase failed, falling back to LocalStorage:", err);
    return getLocalPortfolioData();
  }
}

export async function savePortfolioData(data) {
  // Always save to LocalStorage as a fallback backup
  await saveLocalPortfolioData(data);

  if (!supabase) {
    return true;
  }

  try {
    const { error } = await supabase
      .from('portfolio')
      .upsert({ id: 'default', data: data });

    if (error) {
      console.error("Failed to save to Supabase:", error.message);
      return false;
    }
    localStorage.setItem('portfolio_data_is_live', 'true');
    return true;
  } catch (err) {
    console.error("Error saving to Supabase:", err);
    return false;
  }
}

// ==========================================
// LocalStorage Fallback Implementation
// ==========================================

export function getLocalPortfolioDataSync() {
  let data = localStorage.getItem('portfolio_data');
  if (!data) {
    // Migration check for legacy structure
    const legacyProjects = localStorage.getItem('portfolio_projects');
    const initial = { ...DEFAULT_PORTFOLIO_DATA };
    if (legacyProjects) {
      try {
        initial.projects = JSON.parse(legacyProjects);
      } catch (e) {
        console.error("Failed to parse legacy projects:", e);
      }
    }
    localStorage.setItem('portfolio_data', JSON.stringify(initial));
    data = JSON.stringify(initial);
  } else {
    try {
      let parsed = JSON.parse(data);
      const { data: migratedData, migrated } = migratePortfolioData(parsed);
      if (migrated) {
        localStorage.setItem('portfolio_data', JSON.stringify(migratedData));
      }
      data = JSON.stringify(migratedData);
    } catch (e) {
      console.error("Failed to parse cached portfolio data:", e);
      localStorage.setItem('portfolio_data', JSON.stringify(DEFAULT_PORTFOLIO_DATA));
      data = JSON.stringify(DEFAULT_PORTFOLIO_DATA);
    }
  }
  return JSON.parse(data);
}

async function getLocalPortfolioData() {
  return new Promise((resolve) => {
    resolve(getLocalPortfolioDataSync());
  });
}

async function saveLocalPortfolioData(data) {
  return new Promise((resolve) => {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
    localStorage.setItem('portfolio_projects', JSON.stringify(data.projects));
    resolve(true);
  });
}

// ==========================================
// Image Upload Implementation
// ==========================================

export async function uploadImage(file) {
  if (!supabase) {
    console.warn("Supabase not initialized. Reading image as Base64 Data URL...");
    return readAsDataURL(file);
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = fileName;

    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.warn("Supabase Storage upload failed, falling back to Base64:", error.message);
      return readAsDataURL(file);
    }

    const { data: publicUrlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.warn("Could not retrieve public URL for uploaded file, falling back to Base64");
      return readAsDataURL(file);
    }

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error during image upload to Supabase, falling back to Base64:", err);
    return readAsDataURL(file);
  }
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// ==========================================
// Backward Compatibility Wrappers
// ==========================================


export async function getProjects() {
  const data = await getPortfolioData();
  return data.projects || [];
}

export async function addProject(projectData) {
  const data = await getPortfolioData();
  const newProject = { id: Date.now().toString(), ...projectData };
  data.projects.push(newProject);
  await savePortfolioData(data);
  return newProject;
}

export async function deleteProject(id) {
  const data = await getPortfolioData();
  data.projects = data.projects.filter(p => p.id !== id);
  await savePortfolioData(data);
  return true;
}

// ==========================================
// Contact Messages Operations
// ==========================================

export async function sendContactMessage(messageData) {
  const id = `message_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const timestamp = new Date().toISOString();
  const payload = {
    ...messageData,
    timestamp,
    deleted: false
  };

  if (!supabase) {
    try {
      const localMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      localMessages.push({ id, ...payload });
      localStorage.setItem('portfolio_messages', JSON.stringify(localMessages));
      return true;
    } catch (e) {
      console.error("Failed to save contact message locally:", e);
      return false;
    }
  }

  try {
    const { error } = await supabase
      .from('portfolio')
      .insert({ id, data: payload });

    if (error) {
      console.error("Failed to save message to Supabase:", error.message);
      try {
        const localMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        localMessages.push({ id, ...payload });
        localStorage.setItem('portfolio_messages', JSON.stringify(localMessages));
      } catch (e) {
        console.error("Fallback to local storage failed:", e);
      }
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error saving message to Supabase:", err);
    return false;
  }
}

export async function getContactMessages() {
  if (!supabase) {
    try {
      const localMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      return localMessages
        .filter(m => m.deleted !== true)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (e) {
      console.error("Failed to get local contact messages:", e);
      return [];
    }
  }

  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('id, data')
      .like('id', 'message_%');

    if (error) {
      console.error("Failed to fetch messages from Supabase, returning local backup:", error.message);
      const localMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      return localMessages.filter(m => m.deleted !== true);
    }

    const messages = (data || [])
      .map(row => ({
        id: row.id,
        ...row.data
      }))
      .filter(m => m.deleted !== true)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return messages;
  } catch (err) {
    console.error("Error fetching messages from Supabase:", err);
    return [];
  }
}

export async function deleteContactMessage(id) {
  try {
    const localMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    const updated = localMessages.map(m => m.id === id ? { ...m, deleted: true } : m);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to delete local message:", e);
  }

  if (!supabase) {
    return true;
  }

  try {
    const { data: row, error: fetchError } = await supabase
      .from('portfolio')
      .select('data')
      .eq('id', id)
      .single();

    if (fetchError || !row) {
      console.error("Failed to fetch message for deletion:", fetchError?.message);
      return false;
    }

    const updatedData = { ...row.data, deleted: true };

    const { error: updateError } = await supabase
      .from('portfolio')
      .update({ data: updatedData })
      .eq('id', id);

    if (updateError) {
      console.error("Failed to update message row deletion status:", updateError.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error deleting message from Supabase:", err);
    return false;
  }
}

export function subscribeToPortfolioUpdates(callback) {
  // 1. Listen to local storage changes (for same-browser multiple tabs)
  const storageHandler = (e) => {
    if (e.key === 'portfolio_data') {
      try {
        const newData = JSON.parse(e.newValue);
        if (newData) {
          callback(newData);
        }
      } catch (err) {
        console.error("Failed to parse storage event data:", err);
      }
    }
  };
  window.addEventListener('storage', storageHandler);

  // 2. Listen to Supabase realtime changes (if Supabase is initialized)
  let channel = null;
  if (supabase) {
    try {
      channel = supabase
        .channel('portfolio-db-changes')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'portfolio', filter: 'id=eq.default' },
          (payload) => {
            if (payload.new && payload.new.data) {
              callback(payload.new.data);
            }
          }
        )
        .subscribe((status) => {
          console.log(`Supabase realtime subscription status: ${status}`);
        });
    } catch (err) {
      console.error("Failed to subscribe to Supabase Realtime changes:", err);
    }
  }

  // Return unsubscribe cleanup function
  return () => {
    window.removeEventListener('storage', storageHandler);
    if (supabase && channel) {
      supabase.removeChannel(channel);
    }
  };
}
