import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Code, Brain, Smartphone, ChevronDown, ExternalLink, Download, Zap, Terminal, Cpu, Database } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState(false);
  const [matrixRain, setMatrixRain] = useState([]);
  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0ff';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = katakana[Math.floor(Math.random() * katakana.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 70);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 1000);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = [
    { name: 'Machine Learning', icon: Brain,  color: 'from-cyan-400 to-blue-500' },
    { name: 'Neural Networks', icon: Cpu,  color: 'from-pink-400 to-purple-500' },
    { name: 'Python', icon: Code, color: 'from-green-400 to-emerald-500' },
    { name: 'Android Development', icon: Smartphone,  color: 'from-yellow-400 to-orange-500' },
    { name: 'TensorFlow', icon: Database,  color: 'from-red-400 to-pink-500' },
    { name: 'Java', icon: Code,  color: 'from-blue-400 to-cyan-500' },
    { name: 'Kotlin', icon: Code,  color: 'from-purple-400 to-pink-500' },
    { name: 'C/C++', icon: Terminal,  color: 'from-orange-400 to-red-500' },
    { name: 'SQL', icon: Database,  color: 'from-teal-400 to-cyan-500' },
    { name: 'HTML/CSS', icon: Code,  color: 'from-indigo-400 to-purple-500' },
    { name: 'Jetpack Compose', icon: Smartphone,  color: 'from-emerald-400 to-green-500' },
    { name: 'Git/Github', icon: Code,  color: 'from-gray-400 to-slate-500' }
  ];

  const projects = [
    {
      title: 'CereBro',
      description: 'A cybernetic mobile application that harnesses lightweight AI models to screen for Autism, Dyslexia, and Dementia. Features quantum-inspired algorithms for real-time neural pattern analysis.',
      tags: ['Android', 'AI/ML', 'Quantum', 'Neural'],
      featured: true,
      glowColor: 'shadow-cyan-500/50',
      url: ''
    },
    {
      title: 'Autism Detection System',
      description: 'Advanced neural network architecture for predicting autism spectrum patterns using behavioral genomics and quantum computing principles for early intervention protocols.',
      tags: ['ML', 'Healthcare', 'Quantum', 'Genomics'],
      featured: true,
      glowColor: 'shadow-pink-500/50',
      url: 'https://github.com/violetm00n/Autism_detection'
    },
    {
      title: 'Leaf Disease Prediction',
      description: 'Deep convolutional networks enhanced with synthetic biology algorithms to identify crop diseases through advanced computer vision and agricultural cybernetics.',
      tags: ['Deep Learning', 'CV', 'Agriculture', 'Synthetic Bio'],
      featured: false,
      glowColor: 'shadow-green-500/50',
      url: 'https://github.com/violetm00n/Tomato_leaf_disease_prediction'
    },
    {
      title: 'Essay Grading System',
      description: 'Natural language processing system with transformer architecture for automated assessment, featuring semantic analysis and coherence evaluation algorithms.',
      tags: ['NLP', 'Transformers', 'Education', 'Semantic AI'],
      featured: false,
      glowColor: 'shadow-purple-500/50',
      url: 'https://github.com/violetm00n/FairShare'
    }
  ];

  const experiences = [
    {
      title: 'AI-ML internship',
      company: 'Amazon Web Services (AWS)',
      period: 'Jan 2024 – Mar 2024',
      description: 'Amazon Web Services (AWS) virtual internship',
      icon: '🤖'
    },
    {
      title: 'Android Developer',
      company: 'Google',
      period: 'Jul 2024 – Sep 2024',
      description: 'Worked on Android applications using Kotlin and Jetpack Compose.',
      icon: '📱'
    },
    {
      title: 'Embedded Systems devoloper',
      company: 'Microchip Technology',
      period: 'Apr 2024 – Jun 2024',
      description: 'Developed embedded systems and microcontroller programming for IoT networks.',
      icon: '⚡'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
      />
      
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Custom cursor */}
      <div 
        className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: 'all 0.1s ease'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-40 border-b-2 border-cyan-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent ${glitchText ? 'animate-pulse' : ''}`}>
              <span className="relative">
                {'< THRILOCHAN.EXE />'}
                {glitchText && (
                  <span className="absolute inset-0 text-red-500 opacity-70 animate-ping">
                    {'< THR1L0CH4N.3X3 />'}
                  </span>
                )}
              </span>
            </div>
            <div className="hidden md:flex space-x-6">
              {['home', 'about', 'education', 'skills', 'projects', 'experience', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative px-4 py-2 uppercase tracking-wider text-sm font-semibold transition-all duration-300 ${
                    activeSection === section 
                      ? 'text-cyan-400 shadow-lg shadow-cyan-500/50' 
                      : 'text-gray-300 hover:text-white hover:shadow-lg hover:shadow-pink-500/30'
                  }`}
                >
                  <span className="relative z-10">{section}</span>
                  {activeSection === section && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded border border-cyan-500/50 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <div className="w-40 h-40 mx-auto mb-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded-full animate-spin opacity-75" />
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center border-2 border-cyan-500/50">
                <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  -[:]-
                </span>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            </div>
          </div>
          
          <div className="relative">
            <h1 className={`text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent ${glitchText ? 'animate-pulse' : ''}`}>
              <div className="relative inline-block">
                THRILOCHAN REDDY
                {glitchText && (
                  <>
                    <div className="absolute inset-0 text-red-500 opacity-70 transform translate-x-1">THR1L0CH4N R3DDY</div>
                    <div className="absolute inset-0 text-blue-500 opacity-70 transform -translate-x-1">THRILOCHAN REDDY</div>
                  </>
                )}
              </div>
            </h1>
            <div className="text-2xl md:text-3xl mb-8 font-mono">
              <span className="text-cyan-400">&gt; </span>
              <span className="text-pink-400">NEURAL</span>
              <span className="text-white">_</span>
              <span className="text-purple-400">ARCHITECT</span>
              <span className="text-cyan-400"> &amp;&amp; </span>
              <span className="text-green-400">CYBER</span>
              <span className="text-white">_</span>
              <span className="text-orange-400">DEVELOPER</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>

          <p className="text-xl md:text-2xl mb-12 text-gray-300 font-mono max-w-3xl mx-auto">
            <span className="text-cyan-400">[INITIALIZING]</span> Electronics &amp; Computer Engineering Student 
            <span className="text-pink-400"> | </span>AI/ML Neural Network Specialist
            <span className="text-purple-400"> | </span>Android Quantum Developer
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <button  onClick={() => scrollToSection('about')}  className="group relative px-8 py-4 border-2 border-pink-500 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-pink-500/20 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">INITIATE_CONTACT</span>
              <Zap className="inline ml-2 text-pink-400" size={20} />
            </button>
          </div>

          <button 
            onClick={() => scrollToSection('about')} 
            className="animate-bounce hover:text-cyan-400 transition-colors duration-300"
          >
            <ChevronDown size={40} className="text-pink-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider">
            NEURAL_PROFILE.DATA
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-purple-500/10 p-8 rounded-xl border border-cyan-500/30 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-500 group">
                <p className="text-lg text-gray-300 mb-6 leading-relaxed font-mono">
                  <span className="text-cyan-400">[STATUS]:</span> Uploading portfolio to the sprawl — ready to jack in and work.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed font-mono">
                  <span className="text-purple-400">[MISSION]:</span> Engineering the future through healthcare applications, 
                  agricultural cybernetics, and educational neural networks. Every line of code is a step toward a more connected digital reality.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                    <MapPin size={24} className="text-pink-400" />
                    <span className="font-mono">[LOCATION]: Shadnagar, Hyderabad</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                    <Phone size={24} className="text-purple-400" />
                    <span className="font-mono">[COMM_LINK]: +91.9014620519</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                <Code className="text-cyan-400 mb-6 group-hover:animate-spin transition-all duration-500" size={40} />
                <h3 className="text-2xl font-bold mb-4 text-cyan-400 font-mono">DEVELOPMENT</h3>
                <p className="text-gray-300 font-mono text-sm">Full-stack web devolopment &amp; Android applications</p>
              </div>
              
              <div className="group bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-8 rounded-xl border border-pink-500/30 hover:border-pink-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
                <Brain className="text-pink-400 mb-6 group-hover:animate-pulse transition-all duration-500" size={40} />
                <h3 className="text-2xl font-bold mb-4 text-pink-400 font-mono">AI/ML</h3>
                <p className="text-gray-300 font-mono text-sm">Neural networks, AI agents, Machine learning &amp; deep learning cybernetics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider">
            EDUCATION_MATRIX.LOG
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "Electronics and Computer Engineering",
                institution: "Sreenidhi Institute of Science and Technology",
                period: "2021 – Present",
                grade: "CGPA: 8.8",
                color: "from-cyan-500 to-blue-600"
              },
              {
                title: "Class XI-XII [QUANTUM_PREP]",
                institution: "S.R Junior College",
                period: "2019 – 2021",
                grade: "95.8%",
                color: "from-pink-500 to-purple-600"
              },
              {
                title: "Class X [NEURAL_FOUNDATION]",
                institution: "RBVRR",
                period: "2018-2019",
                grade: "GPA: 10",
                color: "from-green-500 to-emerald-600"
              }
            ].map((edu, index) => (
              <div key={index} className={`group bg-gradient-to-r ${edu.color}/10 p-8 rounded-xl border border-current/30 hover:border-current/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-current/30`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 font-mono">{edu.title}</h3>
                    <p className={`bg-gradient-to-r ${edu.color} bg-clip-text text-transparent text-xl font-semibold`}>
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 font-mono mb-2">[{edu.period}]</p>
                    <p className={`bg-gradient-to-r ${edu.color} bg-clip-text text-transparent font-bold text-lg`}>
                      {edu.grade}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider">
            SKILL.EXE
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className={`group bg-gradient-to-br ${skill.color}/10 p-6 rounded-xl border border-current/30 hover:border-current/70 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-current/50 relative overflow-hidden`}>
                <div className="relative z-10">
                  <skill.icon className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent mb-4 group-hover:animate-pulse`} size={32} />
                  <h3 className="text-lg font-bold mb-4 font-mono text-white">{skill.name}</h3>
                  <div >
                    <div/>
                  </div>
                </div>
                <div  />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider">
            PROJECT_ARCHIVE.DB
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`group bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-xl border border-gray-700 hover:border-current transition-all duration-500 hover:scale-105 hover:shadow-2xl ${project.glowColor} relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-mono">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full animate-pulse">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed font-mono text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 text-cyan-300 rounded-full text-xs font-mono border border-cyan-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button  onClick={() => window.open(project.url, '_blank')} className="group/btn flex items-center gap-3 text-pink-400 hover:text-cyan-400 transition-colors font-mono font-semibold">
                    <ExternalLink size={18} className="group-hover/btn:animate-spin" />
                    [ACCESS_PROJECT]
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gradient-to-r from-black via-gray-900 to-black">
  <div className="max-w-6xl mx-auto px-4 relative z-10">
    <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider font-mono">
      EXPERIENCE_LOG.DB
    </h2>
    <div className="grid md:grid-cols-1 gap-8">
      {experiences.map((exp, index) => (
        <div key={index} className="group bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-xl border border-gray-700 hover:border-current transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-mono">
                  {exp.title}
                </h3>
                <p className="text-purple-400 text-lg font-mono">{exp.company}</p>
              </div>
              <p className="text-gray-300 font-mono">{exp.period}</p>
            </div>
            <p className="text-gray-300 leading-relaxed font-mono text-sm">{exp.description}</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-r from-black via-gray-900 to-black">
  <div className="max-w-6xl mx-auto px-4 relative z-10">
    <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider font-mono">
      CONTACT.DB
    </h2>
    <div className="text-center">
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-mono leading-relaxed">
        I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to chat about technology, feel free to reach out!
      </p>
      <div className="flex flex-wrap justify-center gap-6">
       <button
  onClick={() => {
    navigator.clipboard.writeText("echo.thrilochanvemula@gmail.com");
    alert("Email copied to clipboard!");
  }}
  className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg transition-colors text-lg font-mono text-white shadow-lg hover:scale-105"
>
  <Mail size={24} />
  Copy Email
</button>

<button
  onClick={() => {
    navigator.clipboard.writeText("+919014620519");
    alert("Phone number copied to clipboard!");
  }}
  className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 px-8 py-4 rounded-lg transition-colors text-lg font-mono text-white shadow-lg hover:scale-105"
>
  <Phone size={24} />
  Copy Phone
</button>

      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-black via-gray-900 to-black border-t border-white/10">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <p className="text-gray-500 text-sm font-mono tracking-wide">
      © 2025 Thrilochan Reddy Vemula. Built with React and deployed on GitHub Pages.
    </p>
  </div>
</footer>

    </div>
  );
};

export default Portfolio;