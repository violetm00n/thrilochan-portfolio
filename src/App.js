import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Code, Brain, Smartphone, ChevronDown, ExternalLink, Download, Zap, Terminal, Cpu, Database, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const canvasRef = useRef(null);

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Matrix rain effect (optimized for mobile)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const updateCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvas();
    window.addEventListener('resize', updateCanvas);
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = isMobile ? 12 : 16;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = isMobile ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.05)';
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
    
    const interval = setInterval(draw, isMobile ? 100 : 70);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateCanvas);
    };
  }, [isMobile]);

  // Mouse tracking (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Glitch effect (reduced frequency on mobile)
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), isMobile ? 500 : 1000);
    }, isMobile ? 5000 : 2500);
    return () => clearInterval(interval);
  }, [isMobile]);

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
    setMobileMenuOpen(false);
  };

  const skills = [
    { name: 'Machine Learning', icon: Brain, color: 'from-cyan-400 to-blue-500' },
    { name: 'Neural Networks', icon: Cpu, color: 'from-pink-400 to-purple-500' },
    { name: 'Python', icon: Code, color: 'from-green-400 to-emerald-500' },
    { name: 'Android Development', icon: Smartphone, color: 'from-yellow-400 to-orange-500' },
    { name: 'TensorFlow', icon: Database, color: 'from-red-400 to-pink-500' },
    { name: 'Java', icon: Code, color: 'from-blue-400 to-cyan-500' },
    { name: 'Kotlin', icon: Code, color: 'from-purple-400 to-pink-500' },
    { name: 'C/C++', icon: Terminal, color: 'from-orange-400 to-red-500' },
    { name: 'SQL', icon: Database, color: 'from-teal-400 to-cyan-500' },
    { name: 'HTML/CSS', icon: Code, color: 'from-indigo-400 to-purple-500' },
    { name: 'Jetpack Compose', icon: Smartphone, color: 'from-emerald-400 to-green-500' },
    { name: 'Git/Github', icon: Code, color: 'from-gray-400 to-slate-500' }
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
      title: 'Embedded Systems developer',
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
        className={`fixed inset-0 pointer-events-none z-0 ${isMobile ? 'opacity-10' : 'opacity-20'}`}
      />
      
      {/* Cyber Grid Background */}
      <div className={`fixed inset-0 z-0 ${isMobile ? 'opacity-5' : 'opacity-10'}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '30px 30px' : '50px 50px'
        }} />
      </div>

      {/* Custom cursor (desktop only) */}
      {!isMobile && (
        <div 
          className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
        />
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-40 border-b-2 border-cyan-500/30">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent ${glitchText ? 'animate-pulse' : ''}`}>
              <span className="relative font-mono">
                {isMobile ? '<TH.EXE/>' : '<THRILOCHAN.EXE/>'}
                {glitchText && (
                  <span className="absolute inset-0 text-red-500 opacity-70 animate-ping">
                    {isMobile ? '<TH.3X3/>' : '<THR1L0CH4N.3X3/>'}
                  </span>
                )}
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              {['home', 'about', 'education', 'skills', 'projects', 'experience', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative px-3 py-2 lg:px-4 uppercase tracking-wider text-xs lg:text-sm font-semibold transition-all duration-300 ${
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-cyan-400 hover:text-pink-400 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 py-4">
              <div className="flex flex-col space-y-2 px-4">
                {['home', 'about', 'education', 'skills', 'projects', 'experience', 'contact'].map(section => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-left py-3 px-4 uppercase tracking-wider text-sm font-semibold transition-all duration-300 rounded ${
                      activeSection === section 
                        ? 'text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400' 
                        : 'text-gray-300 hover:text-white hover:bg-pink-500/10'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20" />
        
        {/* Floating particles (reduced on mobile) */}
        <div className="absolute inset-0">
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400 rounded-full opacity-30 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <div className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32 sm:w-40 sm:h-40'} mx-auto mb-6 sm:mb-8 relative group`}>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded-full animate-spin opacity-75" />
              <div className="absolute inset-1 sm:inset-2 bg-black rounded-full flex items-center justify-center border-2 border-cyan-500/50">
                <span className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-4xl'} font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent`}>
                  -[:]-
                </span>
              </div>
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            </div>
          </div>
          
          <div className="relative">
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-6xl md:text-8xl'} font-black mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent ${glitchText ? 'animate-pulse' : ''}`}>
              <div className="relative inline-block">
                {isMobile ? 'THRILOCHAN' : 'THRILOCHAN REDDY'}
                {glitchText && (
                  <>
                    <div className="absolute inset-0 text-red-500 opacity-70 transform translate-x-1">
                      {isMobile ? 'THR1L0CH4N' : 'THR1L0CH4N R3DDY'}
                    </div>
                    <div className="absolute inset-0 text-blue-500 opacity-70 transform -translate-x-1">
                      {isMobile ? 'THRILOCHAN' : 'THRILOCHAN REDDY'}
                    </div>
                  </>
                )}
              </div>
            </h1>
            <div className={`${isMobile ? 'text-sm' : 'text-lg sm:text-2xl md:text-3xl'} mb-6 sm:mb-8 font-mono`}>
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

          <p className={`${isMobile ? 'text-sm' : 'text-lg sm:text-xl md:text-2xl'} mb-8 sm:mb-12 text-gray-300 font-mono max-w-3xl mx-auto leading-relaxed`}>
            <span className="text-cyan-400">[INITIALIZING]</span> Electronics &amp; Computer Engineering Student 
            <span className="text-pink-400"> | </span>AI/ML Neural Network Specialist
            <span className="text-purple-400"> | </span>Android Quantum Developer
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <button 
              onClick={() => scrollToSection('about')}  
              className="group relative px-6 py-3 sm:px-8 sm:py-4 border-2 border-pink-500 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-pink-500/20 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 text-sm sm:text-base"
            >
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {isMobile ? 'CONTACT' : 'INITIATE_CONTACT'}
              </span>
              <Zap className="inline ml-2 text-pink-400" size={isMobile ? 16 : 20} />
            </button>
          </div>

          <button 
            onClick={() => scrollToSection('about')} 
            className="animate-bounce hover:text-cyan-400 transition-colors duration-300"
          >
            <ChevronDown size={isMobile ? 30 : 40} className="text-pink-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider`}>
            NEURAL_PROFILE.DATA
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-purple-500/10 p-6 sm:p-8 rounded-xl border border-cyan-500/30 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-500 group">
                <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-300 mb-4 sm:mb-6 leading-relaxed font-mono`}>
                  <span className="text-cyan-400">[STATUS]:</span> Uploading portfolio to the sprawl — ready to jack in and work.
                </p>
                <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-300 mb-6 sm:mb-8 leading-relaxed font-mono`}>
                  <span className="text-purple-400">[MISSION]:</span> Engineering the future through healthcare applications, 
                  agricultural cybernetics, and educational neural networks. Every line of code is a step toward a more connected digital reality.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                    <MapPin size={isMobile ? 20 : 24} className="text-pink-400 flex-shrink-0" />
                    <span className={`font-mono ${isMobile ? 'text-sm' : 'text-base'}`}>[LOCATION]: Shadnagar, Hyderabad</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                    <Phone size={isMobile ? 20 : 24} className="text-purple-400 flex-shrink-0" />
                    <span className={`font-mono ${isMobile ? 'text-sm' : 'text-base'}`}>[COMM_LINK]: +91.9014620519</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="group bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-6 sm:p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                <Code className="text-cyan-400 mb-4 sm:mb-6 group-hover:animate-spin transition-all duration-500" size={isMobile ? 32 : 40} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-3 sm:mb-4 text-cyan-400 font-mono`}>DEVELOPMENT</h3>
                <p className={`text-gray-300 font-mono ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>Full-stack web development &amp; Android applications</p>
              </div>
              
              <div className="group bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-6 sm:p-8 rounded-xl border border-pink-500/30 hover:border-pink-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
                <Brain className="text-pink-400 mb-4 sm:mb-6 group-hover:animate-pulse transition-all duration-500" size={isMobile ? 32 : 40} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-3 sm:mb-4 text-pink-400 font-mono`}>AI/ML</h3>
                <p className={`text-gray-300 font-mono ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>Neural networks, AI agents, Machine learning &amp; deep learning cybernetics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-24 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider`}>
            EDUCATION_MATRIX.LOG
          </h2>
          <div className="space-y-6 sm:space-y-8">
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
              <div key={index} className={`group bg-gradient-to-r ${edu.color}/10 p-6 sm:p-8 rounded-xl border border-current/30 hover:border-current/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-current/30`}>
                <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-between items-start'} mb-4`}>
                  <div>
                    <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2 font-mono`}>{edu.title}</h3>
                    <p className={`bg-gradient-to-r ${edu.color} bg-clip-text text-transparent ${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>
                      {edu.institution}
                    </p>
                  </div>
                  <div className={`${isMobile ? 'text-left' : 'text-right'}`}>
                    <p className="text-gray-300 font-mono mb-2">[{edu.period}]</p>
                    <p className={`bg-gradient-to-r ${edu.color} bg-clip-text text-transparent font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>
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
      <section id="skills" className="py-16 sm:py-24 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider`}>
            SKILL.EXE
          </h2>
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 sm:gap-6 lg:gap-8`}>
            {skills.map((skill, index) => (
              <div key={index} className={`group bg-gradient-to-br ${skill.color}/10 p-4 sm:p-6 rounded-xl border border-current/30 hover:border-current/70 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-current/50 relative overflow-hidden`}>
                <div className="relative z-10">
                  <skill.icon className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:animate-pulse`} size={isMobile ? 24 : 32} />
                  <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold text-white font-mono group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${skill.color} group-hover:bg-clip-text transition-all duration-300`}>
                    {skill.name}
                  </h3>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider`}>
            PROJECT_ARCHIVES.DB
          </h2>
          <div className="grid gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`group relative bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 p-6 sm:p-8 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${project.glowColor} backdrop-blur-xl ${project.featured ? 'lg:col-span-2' : ''}`}>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6">
                    <div className="mb-4 sm:mb-0">
                      <h3 className={`${isMobile ? 'text-xl' : 'text-2xl lg:text-3xl'} font-bold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-mono`}>
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/50 rounded-full text-xs font-mono text-pink-400 uppercase tracking-wider mb-3 sm:mb-4">
                          FEATURED_PROJECT
                        </span>
                      )}
                    </div>
                    {project.url && (
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all duration-300 group text-sm font-mono"
                      >
                        <span>VIEW_CODE</span>
                        <ExternalLink size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                      </a>
                    )}
                  </div>
                  
                  <p className={`text-gray-300 mb-6 sm:mb-8 leading-relaxed font-mono ${isMobile ? 'text-sm' : 'text-base lg:text-lg'}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-xs sm:text-sm font-mono text-purple-400 uppercase tracking-wider hover:border-purple-400 transition-all duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-24 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider`}>
            EXPERIENCE_LOG.HIST
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="group bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-900/50 p-6 sm:p-8 rounded-xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 backdrop-blur-xl">
                <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'} mb-4 sm:mb-6`}>
                  <div className={`flex items-center gap-4 ${isMobile ? 'mb-2' : ''}`}>
                    <span className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} group-hover:animate-bounce`}>
                      {exp.icon}
                    </span>
                    <div>
                      <h3 className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-bold text-white font-mono group-hover:text-cyan-400 transition-colors duration-300`}>
                        {exp.title}
                      </h3>
                      <p className={`text-pink-400 font-mono ${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-semibold`}>
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <span className={`text-gray-400 font-mono ${isMobile ? 'text-sm' : 'text-base'} px-3 py-1 bg-gray-800/50 rounded-full border border-gray-600/50 group-hover:border-cyan-500/50 transition-all duration-300`}>
                    [{exp.period}]
                  </span>
                </div>
                <p className={`text-gray-300 font-mono leading-relaxed ${isMobile ? 'text-sm' : 'text-base'} group-hover:text-gray-200 transition-colors duration-300`}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider`}>
            ESTABLISH_CONNECTION.NET
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-purple-500/10 p-6 sm:p-8 rounded-xl border border-cyan-500/30 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-500">
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-mono`}>
                  READY TO CONNECT?
                </h3>
                <p className={`text-gray-300 mb-6 sm:mb-8 font-mono leading-relaxed ${isMobile ? 'text-sm' : 'text-base lg:text-lg'}`}>
                  <span className="text-cyan-400">[TRANSMISSION]:</span> Whether you're looking to collaborate on cutting-edge AI projects, 
                  develop the next breakthrough application, or discuss the future of technology, 
                  I'm always ready to connect and create something extraordinary.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  <a 
                    href="mailto:echo.thrilochanvemula@gmail.com"
                    className="group flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-lg hover:border-pink-400 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30"
                  >
                    <Mail className="text-pink-400 group-hover:animate-pulse flex-shrink-0" size={isMobile ? 20 : 24} />
                    <div>
                      <p className="text-pink-400 font-mono text-xs sm:text-sm uppercase tracking-wider">EMAIL_PROTOCOL</p>
                      <p className={`text-white font-mono ${isMobile ? 'text-sm' : 'text-base'} group-hover:text-pink-200 transition-colors`}>
                        echo.thrilochanvemula@gmail.com
                      </p>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+919014620519"
                    className="group flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg hover:border-cyan-400 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                  >
                    <Phone className="text-cyan-400 group-hover:animate-pulse flex-shrink-0" size={isMobile ? 20 : 24} />
                    <div>
                      <p className="text-cyan-400 font-mono text-xs sm:text-sm uppercase tracking-wider">VOICE_CHANNEL</p>
                      <p className={`text-white font-mono ${isMobile ? 'text-sm' : 'text-base'} group-hover:text-cyan-200 transition-colors`}>
                        +91 9014620519
                      </p>
                    </div>
                  </a>
                  
                  <div className="group flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
                    <MapPin className="text-purple-400 group-hover:animate-pulse flex-shrink-0" size={isMobile ? 20 : 24} />
                    <div>
                      <p className="text-purple-400 font-mono text-xs sm:text-sm uppercase tracking-wider">PHYSICAL_LOCATION</p>
                      <p className={`text-white font-mono ${isMobile ? 'text-sm' : 'text-base'}`}>
                        Shadnagar, Hyderabad, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 sm:p-8 rounded-xl border border-gray-700/50 backdrop-blur-xl">
                <div className="mb-6 sm:mb-8">
                  <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} mx-auto mb-4 sm:mb-6 relative group`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded-full animate-spin opacity-75" />
                    <div className="absolute inset-1 bg-gray-900 rounded-full flex items-center justify-center border border-cyan-500/50">
                      <Terminal className={`text-cyan-400 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className={`text-cyan-400 font-mono ${isMobile ? 'text-sm' : 'text-base'} mb-2`}>SYSTEM_STATUS:</p>
                    <p className={`text-green-400 font-mono font-bold ${isMobile ? 'text-lg' : 'text-xl'} animate-pulse`}>
                      ONLINE &amp; READY
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4 text-center">
                  <div className={`font-mono ${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>
                    <p>&gt; Available for freelance projects</p>
                    <p>&gt; Open to collaboration opportunities</p>
                    <p>&gt; Ready for full-time positions</p>
                  </div>
                  
                  <div className="pt-4 sm:pt-6">
                    <button className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:border-pink-400 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 text-sm sm:text-base">
                      <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        INITIALIZE_PROJECT
                      </span>
                      <Zap className="inline ml-2 text-pink-400 group-hover:animate-pulse" size={isMobile ? 16 : 20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-cyan-500/30 bg-black/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6 sm:mb-8">
            <div className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-mono mb-4`}>
              &lt;THRILOCHAN.EXE/&gt;
            </div>
            <p className={`text-gray-400 font-mono ${isMobile ? 'text-xs' : 'text-sm'} max-w-2xl mx-auto leading-relaxed`}>
              <span className="text-cyan-400"></span> 
              Ready to build the future, one neural network at a time.
              <span className="text-pink-400"> | </span>
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 sm:space-x-8 mb-6 sm:mb-8">
            <a 
               onClick={() => {
    navigator.clipboard.writeText("echo.thrilochanvemula@gmail.com");
    alert("Email copied to clipboard!");
  }}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <Mail size={isMobile ? 20 : 24} />
            </a>
            <a 
               onClick={() => {
    navigator.clipboard.writeText("+919014620519");
    alert("Phone number copied to clipboard!");
  }}
              className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
            >
              <Phone size={isMobile ? 20 : 24} />
            </a>
            <a 
              href="https://github.com/violetm00n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <Code size={isMobile ? 20 : 24} />
            </a>
          </div>
          
          <div className={`text-gray-500 font-mono ${isMobile ? 'text-xs' : 'text-sm'}`}>
            <p>&copy; 2024 Thrilochan Reddy.</p>
            <p className="mt-2">
              <span className="text-cyan-400">[COMPILED_WITH]:</span> React • Tailwind • 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Define the data arrays used in the component
const skills = [
  { name: 'Machine Learning', icon: Brain, color: 'from-cyan-400 to-blue-500' },
  { name: 'Neural Networks', icon: Cpu, color: 'from-pink-400 to-purple-500' },
  { name: 'Python', icon: Code, color: 'from-green-400 to-emerald-500' },
  { name: 'Android Development', icon: Smartphone, color: 'from-yellow-400 to-orange-500' },
  { name: 'TensorFlow', icon: Database, color: 'from-red-400 to-pink-500' },
  { name: 'Java', icon: Code, color: 'from-blue-400 to-cyan-500' },
  { name: 'Kotlin', icon: Code, color: 'from-purple-400 to-pink-500' },
  { name: 'C/C++', icon: Terminal, color: 'from-orange-400 to-red-500' },
  { name: 'SQL', icon: Database, color: 'from-teal-400 to-cyan-500' },
  { name: 'HTML/CSS', icon: Code, color: 'from-indigo-400 to-purple-500' },
  { name: 'Jetpack Compose', icon: Smartphone, color: 'from-emerald-400 to-green-500' },
  { name: 'Git/Github', icon: Code, color: 'from-gray-400 to-slate-500' }
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
    title: 'Embedded Systems developer',
    company: 'Microchip Technology',
    period: 'Apr 2024 – Jun 2024',
    description: 'Developed embedded systems and microcontroller programming for IoT networks.',
    icon: '⚡'
  }
];

export default Portfolio;