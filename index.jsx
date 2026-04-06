import React, { useState, useEffect, useRef, useCallback } from 'react';

const HomePage = () => {
  // Sidebar state
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  
  // Carousel state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = 3;
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Philippines time state
  const [phTime, setPhTime] = useState('Loading...');

  // Slides data
  const slides = [
    'https://i.imgur.com/7bIi2JC.png',
    'https://i.imgur.com/v0cr5ke.png',
    'https://i.imgur.com/mUmjEFy.png'
  ];

  // Updates data
  const updates = [
    {
      image: 'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/662501722_122130405357056291_3930169972231630432_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=5gIGeHQ6WOwQ7kNvwG8tes3&_nc_oc=Adr3bRNCIEb-0RddxbKaBxbe2ecVHysCPJcDHZrHuwkVE-k_jO2cvUHeMNw5IBIpypI&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=D6MuwlcsAefihc5kpKILNA&_nc_ss=7a3a8&oh=00_Af12DM_yQA92QRTvqQmjLUJbDOnwF4r8Jz70FFTPxDUz0Q&oe=69D87223',
      date: 'April 05, 2026',
      title: 'New Organization Logo Released',
      description: 'With the change of command and the Boy Scouts of the Philippines Organization progressing, a new logo to serve as the face of the organization is born! Though the organization bears different colors and a new shape, but we will always retain our same duties, goal, and values.'
    },
    {
      image: 'https://scontent.fmnl13-3.fna.fbcdn.net/v/t1.15752-9/652680904_26129777930024984_6170840475357646257_n.jpg?stp=dst-jpg_s2048x2048_tt6&_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE_j1pg2oKUb7pSJWOZbABKUjLVfxUV6F9SMtV_FRXoX8LwaiX11Gh2njPLU4pD6b__UDwk42jRO3WGfLX9geoz&_nc_ohc=u04mKnjQcS4Q7kNvwEXt70a&_nc_oc=Ado-xycPXyVTgJgm3kC_K8l3mY4mfuOw_mN65HULhm7P7l47SgqxPzsTS_2BC36RUIU&_nc_zt=23&_nc_ht=scontent.fmnl13-3.fna&_nc_ss=7a32e&oh=03_Q7cD4wHMHEqLb1jfutFa20umH5p0Pwpu8jsygWXnU85c3GweMw&oe=69F059CC',
      date: 'March 26, 2026',
      title: 'BSP awarded as an Outstanding Organization',
      description: 'On the 26th of March 2026, the Masbate National Comprehensive High School Boy Scouts of the Philippines Organization was awarded the "Oustanding Organization Award" along with other school organizations and clubs for their excellent performance throughout the school year.'
    },
    {
      image: 'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/647609050_122126665347056291_4472907002722928719_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=NCuORfF_gp0Q7kNvwELBT8b&_nc_oc=AdoDy_o7pCFR2NkF_qbXIzpTYtxVBPVKTlnkwHTUU4e03CNlQphnMOa4kixAbxe3gK0&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=n3JQ3c3mIHQ_zhh5nzjsfw&_nc_ss=7a3a8&oh=00_Af2mKnS-Jz4DkLxN7GLYtQ5yZMdmorJDkhmjqd9Kf64KCw&oe=69D8FA64',
      date: 'March 05, 2026',
      title: 'MNCHS Senior Scouts host Flag Disposal Ceremony',
      description: 'At 4:15 PM on March 5, 2026, the Masbate National Comprehensive High School Senior Scouts successfully executed a flag disposal ceremony to retire six of the school\'s worn-out national flags.'
    }
  ];

  // Philippines time updater
  useEffect(() => {
    const updatePhilippinesTime = () => {
      const now = new Date();
      const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
      const timeString = phTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setPhTime(timeString);
    };

    updatePhilippinesTime();
    const interval = setInterval(updatePhilippinesTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Touch handlers for carousel
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  }, []);

  const handleSwipe = () => {
    const threshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
      } else {
        // Swipe right - previous slide
        setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // Close sidebar
  const closeSidebar = () => {
    setSidebarActive(false);
  };

  // Set active nav (simplified for React SPA)
  const navItems = [
    { href: '#home', label: 'Home', page: 'home' },
    { href: '#about', label: 'About Us', page: 'about' },
    { href: '#resources', label: 'Resources', page: 'resources' },
    { href: '#leadership', label: 'Leadership', page: 'leadership' },
    { href: '#history', label: 'History', page: 'history' },
    { href: '#shop', label: 'Shop', page: 'shop' }
  ];

  return (
    <div 
      style={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: "'Arial', sans-serif",
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
      }}
    >
      {/* Sidebar */}
      <div 
        className="sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: sidebarActive ? 0 : -300,
          width: '280px',
          height: '100vh',
          backgroundColor: 'white',
          padding: '80px 0px 0px',
          transition: 'left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: 999,
          boxShadow: '2px 0 20px rgba(0,0,0,0.3)'
        }}
      >
        <nav 
          className="sidebar-nav"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}
        >
          {[
            { href: '#home', label: 'Home', page: 'home' },
            { href: '#about', label: 'About Us', page: 'about' },
            { href: '#resources', label: 'Resources', page: 'resources' },
            { href: '#leadership', label: 'Leadership', page: 'leadership' },
            { href: '#history', label: 'History', page: 'history' },
            { href: '#shop', label: 'Shop' }
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              style={{
                color: 'rgb(0, 0, 0)',
                backgroundColor: '#ececec',
                textDecoration: 'none',
                padding: '15px 20px',
                fontWeight: 700,
                width: '100%',
                fontSize: '16px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative'
              }}
              className={activeNav === item.page ? 'active' : ''}
              onClick={closeSidebar}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      <div 
        className={`overlay ${sidebarActive ? 'active' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          opacity: sidebarActive ? 1 : 0,
          visibility: sidebarActive ? 'visible' : 'hidden',
          transition: 'all 0.4s ease',
          zIndex: 998
        }}
        onClick={closeSidebar}
      />

      {/* White Header */}
      <header 
        className="header-white"
        style={{
          backgroundColor: 'white',
          height: '50px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000
        }}
      >
        <div 
          className="header-white-content"
          style={{
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div 
            className="left-section"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              flex: 1
            }}
          >
            <div 
              className="hamburger"
              style={{
                display: 'none',
                flexDirection: 'column',
                cursor: 'pointer',
                padding: '5px',
                gap: '3px',
                zIndex: 1001
              }}
              onClick={toggleSidebar}
            >
              <span 
                style={{
                  width: '25px',
                  height: '3px',
                  backgroundColor: '#333',
                  borderRadius: '3px',
                  transition: 'all 0.3s ease',
                  transform: sidebarActive ? 'rotate(45deg) translate(6px, 6px)' : 'none'
                }}
              />
              <span 
                style={{
                  width: '25px',
                  height: '3px',
                  backgroundColor: '#333',
                  borderRadius: '3px',
                  transition: 'all 0.3s ease',
                  opacity: sidebarActive ? 0 : 1
                }}
              />
              <span 
                style={{
                  width: '25px',
                  height: '3px',
                  backgroundColor: '#333',
                  borderRadius: '3px',
                  transition: 'all 0.3s ease',
                  transform: sidebarActive ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
                }}
              />
            </div>
            <div className="white-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img 
                src="https://i.imgur.com/75Gavv9.png" 
                alt="Masbate National Comprehensive High School Logo"
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
              />
            </div>
            <div className="nav-section" style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1 }}>
              <nav className="nav-buttons" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`nav-btn ${activeNav === item.page ? 'active' : ''}`}
                    style={{
                      background: 'none',
                      padding: '18px 19px',
                      height: '50px',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#333',
                      whiteSpace: 'nowrap',
                      position: 'relative'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav(item.page);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="login-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '100%' }}>
            <a href="#login" className="login-btn" style={{
              backgroundColor: 'white',
              height: '50px',
              color: 'rgb(0, 0, 0)',
              border: 'none',
              padding: '18px 19px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}>
              Login
            </a>
            <a href="#register" className="login-btn" style={{
              backgroundColor: 'white',
              height: '50px',
              color: 'rgb(0, 0, 0)',
              border: 'none',
              padding: '18px 19px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}>
              Register
            </a>
          </div>
        </div>
      </header>

      {/* Blue Header */}
      <header 
        className="header-blue"
        style={{
          backgroundColor: '#04278e',
          color: 'white',
          padding: '20px 20px',
          paddingTop: '64px'
        }}
      >
        <div 
          className="header-blue-content"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div className="blue-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img 
              src="https://i.imgur.com/wQ4sCYd.png" 
              alt="Masbate Council Logo"
              style={{ width: '50px', height: '50px' }}
            />
            <img 
              src="https://i.imgur.com/GIXi6UL.png" 
              alt="Outfit 002"
              style={{ width: '50px', height: '50px' }}
            />
            <div className="blue-text">
              <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'white' }}>
                MNCHS Senior Scouts
              </h3>
              <div className="outfit-id" style={{ fontSize: '16px', opacity: 0.9 }}>
                Masbate Council - Outfit 002
              </div>
            </div>
          </div>
          <div className="emailphone" style={{ textAlign: 'right', lineHeight: '25px' }}>
            <p>scoutsmnchs@gmail.com</p>
            <p>+63 975 626 9838</p>
          </div>
        </div>
      </header>

      {/* On My Honor Header */}
      <header className="onmyhonor" style={{
        backgroundColor: '#010160',
        color: 'white',
        padding: '10px 10px',
        paddingTop: '10px',
        alignItems: 'center'
      }}>
        <div 
          className="onmyhonor-content"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            alignItems: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
            letterSpacing: '2px'
          }}
        >
          <p>"On my honor, I will do my best."</p>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="main-content"
        style={{
          flex: 1,
          padding: '120px 40px 40px',
          paddingTop: '10px',
          maxWidth: '1700px',
          margin: '0 auto'
        }}
      >
        {/* Carousel */}
        <div className="carousel-wrapper" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 60px' }}>
          <div 
            className="carousel-container"
            style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '2px' }}
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="carousel-images"
              style={{
                display: 'flex',
                transition: 'transform 0.6s ease-in-out',
                width: '300%',
                transform: `translateX(-${currentSlideIndex * 33.333}%)`
              }}
            >
              {slides.map((src, index) => (
                <div 
                  key={index}
                  className="carousel-image"
                  style={{ width: '33.333%', height: 'auto', flexShrink: 0, display: 'block' }}
                >
                  <img 
                    src={src} 
                    alt={`Scouting Image ${index + 1}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-dots" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            {Array.from({ length: totalSlides }, (_, index) => (
              <span
                key={index}
                className={`dot ${currentSlideIndex === index ? 'active' : ''}`}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: currentSlideIndex === index ? '#1976D2' : '#ddd',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: currentSlideIndex === index ? 'scale(1.2)' : 'none'
                }}
                onClick={() => setCurrentSlideIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Updates Header */}
        <div className="updates-header" style={{
          backgroundColor: '#010160',
          padding: 0,
          width: '100%',
          height: '45px',
          display: 'flex',
          alignItems: 'stretch',
          overflow: 'hidden'
        }}>
          <h2 style={{
            fontSize: '19px',
            paddingLeft: '15px',
            paddingTop: '13px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '2px',
            margin: 0,
            position: 'relative'
          }}>
            Scouting Updates
            <div style={{
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(135deg, #1976D2, #0D47A1)',
              borderRadius: '2px'
            }} />
          </h2>
        </div>

        {/* Updates Row */}
        <section className="updates-row" style={{
          display: 'flex',
          gap: '20px',
          maxWidth: '1502px',
          width: '80%',
          margin: '0px auto',
          marginLeft: '0px'
        }}>
          {/* Left Side Container */}
          <div className="side-container left-side" style={{
            flex: '0 0 250px',
            background: '#e8e8e8',
            padding: '25px',
            height: 'fit-content',
            marginTop: '21px'
          }}>
            <div className="side-content">
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 700, 
                color: '#101776', 
                marginBottom: '20px', 
                paddingBottom: '10px', 
                borderBottom: '2px solid #070366' 
              }}>
                Quick Links
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '2px' }}>
                  <a href="#regisportal" style={{
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    display: 'block',
                    padding: '12px 0',
                    backgroundColor: 'white',
                    borderLeft: '5px solid #013272',
                    marginBottom: '12px',
                    paddingLeft: '15px'
                  }}>
                    Register
                  </a>
                </li>
                <li style={{ marginBottom: '2px' }}>
                  <a href="#resources" style={{
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    display: 'block',
                    padding: '12px 0',
                    backgroundColor: 'white',
                    borderLeft: '5px solid #013272',
                    marginBottom: '12px',
                    paddingLeft: '15px'
                  }}>
                    Advancement Information
                  </a>
                </li>
                <li style={{ marginBottom: '2px' }}>
                  <a href="#resources" style={{
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    display: 'block',
                    padding: '12px 0',
                    backgroundColor: 'white',
                    borderLeft: '5px solid #013272',
                    marginBottom: '12px',
                    paddingLeft: '15px'
                  }}>
                    Merit Badge Guide
                  </a>
                </li>
                <li style={{ marginBottom: '2px' }}>
                  <a href="#about" style={{
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    display: 'block',
                    padding: '12px 0',
                    backgroundColor: 'white',
                    borderLeft: '5px solid #013272',
                    marginBottom: '12px',
                    paddingLeft: '15px'
                  }}>
                    BSP Mission & Vision
                  </a>
                </li>
              </ul>
            </div>
            <div 
              className="side-contentscouts"
              style={{
                textAlign: 'center',
                padding: '25px',
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                marginLeft: '-25px',
                width: 'calc(100% + 50px)',
                marginBottom: '-25px'
              }}
            >
              <a href="https://scouts.gov.ph" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/0/0c/Boy_Scouts_of_the_Philippines.svg" 
                  alt="Visit Scouts.gov.ph"
                  style={{
                    width: '100%',
                    maxWidth: '100px',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    cursor: 'pointer',
                    margin: '0 auto',
                    transition: 'all 0.3s ease'
                  }}
                />
              </a>
            </div>
          </div>

          {/* Updates Section */}
          <section className="updates-section" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'center',
            padding: '0px 0px',
            maxWidth: '1920px',
            width: '80%',
            margin: '20px auto'
          }}>
            <div className="updates-grid" style={{
              width: '1250px',
              maxWidth: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center'
            }}>
              {updates.map((update, index) => (
                <div 
                  key={index}
                  className="update-item"
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: 0,
                    width: '100%',
                    height: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px',
                    alignItems: 'stretch',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={update.image}
                    alt={`Update ${index + 1}`}
                    className="update-image"
                    style={{
                      width: '180px',
                      height: '100%',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <div className="update-content" style={{
                    marginTop: '14px',
                    marginRight: '15px',
                    marginBottom: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    flex: 1
                  }}>
                    <div className="update-date" style={{ fontSize: '14px', color: '#666', textAlign: 'left' }}>
                      {update.date}
                    </div>
                    <div className="update-title" style={{ 
                      fontSize: '25px', 
                      fontWeight: 700, 
                      color: '#101776', 
                      lineHeight: 1.2, 
                      textAlign: 'left' 
                    }}>
                      {update.title}
                    </div>
                    <div 
                      className="update-description"
                      style={{
                        fontSize: '17px',
                        color: '#555',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textAlign: 'left'
                      }}
                    >
                      {update.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Side Container */}
          <div className="side-container right-side" style={{
            flex: '0 0 250px',
            background: '#e8e8e8',
            padding: '25px',
            height: 'fit-content',
            marginTop: '21px'
          }}>
            <div className="side-content">
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 700, 
                color: '#101776', 
                marginBottom: '20px', 
                paddingBottom: '10px', 
                borderBottom: '2px solid #070366' 
              }}>
                Upcoming Events
              </h3>
              <div 
                className="event-item"
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '20px',
                  padding: '15px',
                  background: 'white',
                  borderLeft: '4px solid #03157d',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="event-date" style={{ 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  color: '#01095c', 
                  minWidth: '45px' 
                }}>
                  Apr 10
                </div>
                <div className="event-title" style={{ 
                  fontSize: '15px', 
                  fontWeight: 600, 
                  color: '#333', 
                  lineHeight: 1.4 
                }}>
                  Rodeo Service Week
                </div>
              </div>
            </div>
            <div className="side-content">
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 700, 
                color: '#101776', 
                marginBottom: '20px', 
                paddingBottom: '10px', 
                borderBottom: '2px solid #070366' 
              }}>
                Statistics
              </h3>
              <div 
                className="event-item"
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '20px',
                  padding: '15px',
                  background: 'white',
                  borderLeft: '4px solid #03157d',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="event-date" style={{ 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  color: '#01095c', 
                  minWidth: '45px' 
                }}>
                  66
                </div>
                <div className="event-title" style={{ 
                  fontSize: '15px', 
                  fontWeight: 600, 
                  color: '#333', 
                  lineHeight: 1.4 
                }}>
                  Registered Scouts
                </div>
              </div>
              <div 
                className="ph-time-container"
                style={{
                  background: 'white',
                  color: 'white',
                  padding: '10px 15px',
                  textAlign: 'center',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  maxWidth: '300px',
                  margin: '1px auto',
                  borderLeft: '4px solid #03157d'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/1280px-Flag_of_the_Philippines.svg.png" 
                    alt="Philippines Flag"
                    className="ph-flag"
                    style={{ width: '64px', height: '40px', marginTop: '12px' }}
                  />
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', opacity: 0.9 }}>
                    Current Time
                  </h3>
                </div>
                <div className="ph-time" style={{ fontSize: '1.4rem', fontWeight: 300, color: '#010160' }}>
                  {phTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updates Header 2 */}
        <div className="updates-header2" style={{
          backgroundColor: '#010160',
          padding: 0,
          width: '66%',
          margin: '0 auto',
          marginBottom: '14px',
          height: '4px',
          display: 'flex',
          gap: '30px',
          alignItems: 'stretch',
          overflow: 'hidden'
        }}>
          <h2>Scouting Updates</h2>
        </div>

        {/* Scouts Section Header */}
        <div className="scouts-section-header" style={{
          backgroundColor: '#010160',
          color: 'white',
          padding: '12px',
          alignItems: 'center',
          maxWidth: '1920px',
          height: '45px',
          width: '80%',
          margin: '0 auto',
          fontWeight: 700,
          fontSize: '19px',
          letterSpacing: '2px',
          marginBottom: '15px'
        }}>
          Join Us Today!
        </div>

        {/* Counter Container */}
        <div className="counter-container" style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'stretch',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '1920px',
          width: '80%',
          margin: '60px auto',
          padding: '0 20px',
          backgroundColor: '#f5f5f5',
          marginTop: '5px'
        }}>
          <section className="scouts-section" style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'center',
            padding: '50px 40px',
            background: 'transparent',
            flex: '0 0 420px',
            transition: 'all 0.3s ease'
          }}>
            <img 
              src="https://i.imgur.com/SVw9xv4.png" 
              alt="Scouts Icon" 
              className="scouts-image"
              style={{ width: '120px', height: '120px', objectFit: 'contain' }}
            />
            <div className="scouts-info" style={{ marginLeft: '15px' }}>
              <div className="scouts-count" style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'left',
                color: '#1976D2',
                fontSize: '64px',
                fontWeight: 900,
                lineHeight: 1.2
              }}>
                66
              </div>
              <div className="scouts-label" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'left',
                color: '#181818',
                fontSize: '25px',
                fontWeight: 700,
                letterSpacing: '1px'
              }}>
                Registered Scouts
              </div>
            </div>
          </section>
          <section className="join-section" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
            textAlign: 'left',
            padding: '45px 40px',
            background: '#fbfbfb',
            color: 'rgb(0, 0, 0)',
            flex: 1,
            minWidth: '250px',
            marginLeft: '-60px',
            maxWidth: '420px',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="join-title" style={{ 
              fontSize: '31px', 
              fontWeight: 750, 
              letterSpacing: '1px', 
              marginBottom: '2px', 
              color: '#101776' 
            }}>
              WANT TO JOIN?
            </div>
            <div className="join-text" style={{ 
              fontSize: '22px', 
              lineHeight: 1.4, 
              opacity: 0.95, 
              fontWeight: 500 
            }}>
              Contact any Outfit Officer or head over to your campus recruitment booth for to acquire your organization membership form, medical history form, and medical certificate form!
            </div>
          </section>
          <section className="req-section" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
            textAlign: 'left',
            padding: '45px 40px',
            background: '#fbfbfb',
            color: 'rgb(0, 0, 0)',
            flex: 1,
            minWidth: '250px',
            marginLeft: '-60px',
            maxWidth: '420px',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="req-title" style={{ 
              fontSize: '31px', 
              fontWeight: 750, 
              letterSpacing: '1px', 
              marginBottom: '2px', 
              color: '#101776' 
            }}>
              REQUIREMENTS
            </div>
            <div className="req-text" style={{ 
              fontSize: '22px', 
              lineHeight: 1.4, 
              opacity: 0.95, 
              fontWeight: 500 
            }}>
              Secure your <strong>ORGANIZATION MEMBERSHIP FORM (RF-1)</strong> along with your <strong>MEDICAL CERTIFICATE FORM (RF-2A) and MEDICAL HISTORY FORM (RF-2B)</strong>
            </div>
          </section>
        </div>

        {/* Register Section */}
        <section className="registersec" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '100%',
          padding: '40px 20px',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div 
            className="propaganda"
            style={{
              backgroundColor: '#010160',
              backgroundImage: 'url(https://i.imgur.com/3gSpjay.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              maxWidth: '890px',
              aspectRatio: '16/11',
              position: 'relative',
              overflow: 'hidden'
            }}
          />
          <a 
            href="#regisportal"
            className="registerbtn"
            style={{
              backgroundColor: '#010160',
              width: '90%',
              maxWidth: '400px',
              height: '60px',
              paddingTop: '8px',
              textAlign: 'center',
              color: 'white',
              textDecoration: 'none',
              fontSize: '32px',
              lineHeight: '40px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'block'
            }}
          >
            Register Now
          </a>
        </section>

        {/* Duties Section */}
        <section className="duties-section" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          textAlign: 'center',
          padding: '60px 20px',
          maxWidth: '1920px',
          width: '100%',
          margin: '80px 0',
          marginBottom: '-40px',
          marginTop: '-20px'
        }}>
          <div className="duties-grid" style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <img 
              src="https://i.imgur.com/jFA2Pgf.png" 
              alt="Duty 1" 
              className="duty-image"
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
            />
            <img 
              src="https://i.imgur.com/SPw1UMz.png" 
              alt="Duty 2" 
              className="duty-image"
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
            />
            <img 
              src="https://i.imgur.com/GhMIF0U.png" 
              alt="Duty 3" 
              className="duty-image"
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" style={{
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        padding: '20px',
        color: '#666',
        borderTop: '1px solid #eee',
        marginTop: 'auto',
        width: '100%'
      }}>
        <p>&copy; 2026 Masbate National Comprehensive High School - Senior Scouting Outfit 002. All rights reserved.</p>
      </footer>

      <style jsx>{`
        @media (max-width: 1200px) {
          .counter-container {
            gap: 30px;
                       max-width: 1100px;
          }
          .join-section,
          .req-section {
            min-width: 340px;
            max-width: 420px;
            padding: 40px 35px;
          }
          .scouts-section {
            flex: 0 0 380px;
            padding: 45px 35px;
          }
        }

        @media (max-width: 768px) {
          .hamburger {
            display: flex !important;
          }
          .nav-buttons {
            display: none !important;
          }
          .header-white-content {
            padding: 0 15px;
            justify-content: space-between;
          }
          .left-section {
            gap: 10px;
          }
          .login-container {
            gap: 5px;
          }
          .login-btn {
            font-size: 13px !important;
            padding: 18px 15px !important;
          }
          .header-blue {
            padding: 20px 15px !important;
            padding-top: 64px !important;
          }
          .header-blue-content {
            flex-direction: column !important;
            align-items: center !important;
            gap: 15px !important;
            text-align: center;
          }
          .blue-logo {
            gap: 12px !important;
          }
          .blue-logo img {
            width: 42px !important;
            height: 42px !important;
          }
          .blue-text h3 {
            font-size: 18px !important;
            margin: 0 0 2px 0 !important;
          }
          .blue-text .outfit-id {
            font-size: 14px !important;
          }
          .emailphone {
            display: none !important;
          }
          .main-content {
            padding: 120px 15px 40px !important;
          }
          .counter-container {
            flex-direction: column !important;
            align-items: center !important;
            gap: 25px !important;
            width: 100% !important;
            padding: 30px 20px !important;
            margin: 40px auto 20px !important;
          }
          .scouts-section,
          .join-section,
          .req-section {
            max-width: 100% !important;
            min-width: 0 !important;
            width: 100% !important;
            padding: 35px 25px !important;
            margin: 0 !important;
            margin-left: 0 !important;
          }
          .scouts-section {
            flex-direction: row !important;
            text-align: left !important;
            padding: 40px 30px !important;
          }
          .scouts-count {
            font-size: 48px !important;
          }
          .join-title,
          .req-title {
            font-size: 26px !important;
          }
          .join-text,
          .req-text {
            font-size: 18px !important;
          }
          .updates-row {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            gap: 25px !important;
            padding: 0 10px;
          }
          .side-container {
            display: none !important;
          }
          .updates-section {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            order: 1;
          }
          .updates-header {
            height: 25px !important;
            width: 100% !important;
            margin: 20px 0 10px 0 !important;
          }
          .updates-header h2 {
            font-size: 12px !important;
            padding-left: 20px !important;
            padding-top: 5px !important;
          }
          .updates-grid {
            width: 100% !important;
            padding: 0 10px !important;
            gap: 15px !important;
          }
          .update-item {
            height: 140px !important;
            gap: 20px !important;
            margin: 0 !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
          }
          .update-image {
            width: 110px !important;
            height: 100% !important;
          }
          .update-content {
            margin: 0 !important;
            padding: 15px 20px 15px 0 !important;
            gap: 6px !important;
          }
          .update-date {
            font-size: 9px !important;
          }
          .update-title {
            font-size: 14px !important;
            line-height: 1.2 !important;
          }
          .update-description {
            font-size: 10px !important;
            -webkit-line-clamp: 3 !important;
          }
          .updates-header2 {
            margin-top: 15px;
            width: 100% !important;
          }
          .scouts-section-header {
            width: 100% !important;
            margin: 20px auto 10px !important;
            height: 25px;
            font-size: 12px !important;
            padding-left: 20px !important;
            padding-top: 5px !important;
          }
          .duties-grid {
            flex-direction: column !important;
            gap: 25px !important;
            align-items: center !important;
          }
          .duty-image {
            width: 280px !important;
            height: 280px !important;
          }
          .registersec {
            padding: 40px 20px !important;
            gap: 20px !important;
          }
          .propaganda {
            width: 100% !important;
            max-width: 500px !important;
          }
          .registerbtn {
            width: 95% !important;
            max-width: 380px !important;
            font-size: 28px !important;
          }
          .carousel-wrapper {
            width: 100% !important;
            margin: -80px auto 30px !important;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 120px 10px 30px !important;
          }
          .login-btn {
            font-size: 12px !important;
            padding: 18px 12px !important;
          }
          .counter-container {
            padding: 25px 15px !important;
            gap: 20px !important;
          }
          .scouts-section {
            padding: 30px 20px !important;
          }
          .join-section,
          .req-section {
            padding: 30px 20px !important;
          }
          .scouts-count {
            font-size: 42px !important;
          }
          .join-title,
          .req-title {
            font-size: 22px !important;
          }
          .join-text,
          .req-text {
            font-size: 16px !important;
          }
          .update-item {
            height: 110px !important;
            gap: 15px !important;
            width: 100%;
          }
          .update-image {
            width: 95px !important;
          }
          .update-content {
            padding: 12px 15px 12px 0 !important;
          }
          .update-title {
            font-size: 13px !important;
          }
          .update-description {
            font-size: 9px !important;
          }
          .duty-image {
            width: 260px !important;
            height: 260px !important;
          }
          .registersec {
            padding: 30px 15px !important;
            gap: 15px !important;
          }
          .propaganda {
            width: 98% !important;
            max-width: 400px !important;
          }
          .registerbtn {
            width: 98% !important;
            font-size: 24px !important;
            height: 55px !important;
          }
          .scouts-image {
            width: 100px !important;
            height: 100px !important;
          }
          .sidebar {
            width: 260px;
            left: -260px;
          }
        }

        @media (max-width: 768px) {
          body {
            overflow-x: hidden;
          }
          .counter-container,
          .join-section,
          .req-section {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }

        /* Hover effects */
        .nav-btn:hover {
          background-color: #eeeeee;
        }
        .login-btn:hover {
          background-color: #ececec;
        }
        .duty-image:hover {
          transform: translateY(-10px) scale(1.05);
        }
        .side-content a:hover {
          color: #1976D2;
        }
        .sidebar-nav a:hover {
          background: rgb(217, 217, 217);
        }
        .nav-btn.active {
          background-color: #cbcbcb !important;
        }
        .nav-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 3px;
          background: #01185c;
          border-radius: 2px 2px 0 0;
        }
        .sidebar-nav a.active {
          background: rgb(183, 183, 183);
          position: relative;
        }
        .sidebar-nav a.active::before {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        .registerbtn:hover {
          background-color: #04278e;
        }
        .event-item:hover {
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
};

export default HomePage;