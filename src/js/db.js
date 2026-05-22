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
    imageUrl: "imgs/PP-1.jpeg",
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
      imageUrl: "imgs/CC-skill-test-1.png",
      link: "https://github.com/SAHIL-4112004/AppDost-Assignment",
      liveLink: "",
      description: "React Native mobile assignment showcasing Firebase integration and state management."
    },
    {
      id: "2",
      title: "Student Placement Management System",
      technologies: "Java, Spring Boot, MySQL",
      imageUrl: "imgs/TecgEXPO25.png",
      link: "https://github.com/SAHIL-4112004/Student-Placement-Management-System",
      liveLink: "",
      description: "A comprehensive backend system for placement tracking built with Java Spring Boot."
    }
  ],
  experience: [],
  certificates: [
    { id: "1", imageUrl: "imgs/CN&IP.png", title: "Computer Network & Internet Protocol", issuer: "Issued by NPTEL", link: "https://nptel.ac.in" },
    { id: "2", imageUrl: "imgs/JOBSIMULATOR.png", title: "Job Simulator", issuer: "Issued by Deloitte", link: "https://www.deloitte.com" },
    { id: "3", imageUrl: "imgs/VH_6.0.png", title: "Vadodara Hackathon 6.0", issuer: "Issued by PIERC", link: "https://hackathon.paruluniversity.ac.in" },
    { id: "4", imageUrl: "imgs/VH_5.0.jpg", title: "Vadodara Hackathon 5.0", issuer: "Issued by PIERC", link: "https://hackathon.paruluniversity.ac.in" },
    { id: "5", imageUrl: "imgs/DSA_APNACLG.png", title: "DSA with Java", issuer: "Issued by Apna College", link: "https://apnacollege.in" },
    { id: "6", imageUrl: "imgs/AWS_Cloud_1.png", title: "AWS Academy Graduate - Cloud Foundations", issuer: "Issued by AWS Academy", link: "https://aws.amazon.com/training/awsacademy/" },
    { id: "7", imageUrl: "imgs/AI_Fundamental.png", title: "IBM AI Fundamentals", issuer: "Issued by IBM", link: "https://www.credly.com" },
    { id: "8", imageUrl: "imgs/Hashgraph.png", title: "Hedera Hashgraph", issuer: "Issued by Hedera", link: "https://hedera.com" },
    { id: "9", imageUrl: "imgs/GDG_CSC.png", title: "GDG DevFest Vadodara", issuer: "Issued by Google Developer Groups", link: "https://gdg.community.dev" }
  ],
  badges: [
    { id: "1", imageUrl: "imgs/50D_LC_25.png", title: "LeetCode 50 Days 2025", link: "https://leetcode.com" },
    { id: "2", imageUrl: "imgs/100D_LC_25.png", title: "LeetCode 100 Days 2025", link: "https://leetcode.com" },
    { id: "3", imageUrl: "imgs/50D_LC_26.png", title: "LeetCode 50 Days 2026", link: "https://leetcode.com" },
    { id: "4", imageUrl: "imgs/100D_LC_26.png", title: "LeetCode 100 Days 2026", link: "https://leetcode.com" },
    { id: "5", imageUrl: "imgs/CodeChefBadge.png", title: "CodeChef Badge", link: "https://www.codechef.com" },
    { id: "6", imageUrl: "imgs/Smart_Coder.png", title: "Smart Coder Badge", link: "https://example.com" },
    { id: "7", imageUrl: "imgs/AWS_CF_B.png", title: "AWS Cloud Foundations", link: "https://example.com" },
    { id: "8", imageUrl: "imgs/AI_F_B.png", title: "AI Fundamentals Badge", link: "https://example.com" },
    { id: "9", imageUrl: "imgs/GDG_CSC.png", title: "GDG Cloud Student Club Badge", link: "https://gdg.community.dev" }
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
    { id: 'experience', name: 'Experience', visible: false },
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
