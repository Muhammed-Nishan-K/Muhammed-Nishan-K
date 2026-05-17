import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text3D, Center, OrbitControls } from '@react-three/drei';
import { userData } from '../data';
import { Link } from 'react-router-dom';
import './Home.css';

import { Suspense } from 'react';

// --- 3D Letter Components ---
const MERN_LETTERS = [
  { letter: 'M', color: '#6366f1', name: 'MongoDB' },
  { letter: 'E', color: '#477bed', name: 'Express' },
  { letter: 'R', color: '#2b90e9', name: 'React' },
  { letter: 'N', color: '#0ea5e9', name: 'Node.js' }
];

const LetterModel = ({ letter, color }) => (
  <Center>
    <Text3D 
      font="https://unpkg.com/three@0.150.1/examples/fonts/helvetiker_bold.typeface.json"
      size={2.5}
      height={0.6}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.05}
      bevelSize={0.05}
      bevelOffset={0}
      bevelSegments={5}
    >
      {letter}
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
    </Text3D>
  </Center>
);

const LaptopModel = () => (
  <group scale={0.8}>
    {/* Base/Keyboard */}
    <mesh position={[0, -0.6, 0.5]} rotation={[0.1, 0, 0]}>
      <boxGeometry args={[3.2, 0.1, 2.2]} />
      <meshStandardMaterial color="#a0a0ab" roughness={0.4} metalness={0.8} />
    </mesh>
    {/* Screen Frame */}
    <mesh position={[0, 0.5, -0.5]} rotation={[-0.1, 0, 0]}>
      <boxGeometry args={[3.2, 2.2, 0.1]} />
      <meshStandardMaterial color="#a0a0ab" roughness={0.4} metalness={0.8} />
    </mesh>
    {/* Screen Display */}
    <mesh position={[0, 0.5, -0.44]} rotation={[-0.1, 0, 0]}>
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial color="#6366f1" />
    </mesh>
  </group>
);

const ProjectModel = ({ index }) => {
  const data = MERN_LETTERS[index % MERN_LETTERS.length];
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <Suspense fallback={
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color={data.color} />
        </mesh>
      }>
        <LetterModel letter={data.letter} color={data.color} />
      </Suspense>
    </Float>
  );
};

const Scene = ({ scrollYProgress }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Calculate how far we've scrolled
      const progress = scrollYProgress.get();
      // Distance between objects is 5 units
      const totalDistance = (userData.projects.length) * 5;
      
      // Move the group up so the camera sees the next object
      groupRef.current.position.y = progress * totalDistance;
      
      // Add a slight global rotation
      groupRef.current.rotation.y = progress * Math.PI * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Intro Laptop at the very top (y = 0) */}
      <group position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
           <LaptopModel />
        </Float>
      </group>

      {/* Project Logos spread downwards */}
      {userData.projects.map((project, i) => (
        <group key={i} position={[0, -(i + 1) * 5, 0]}>
          <ProjectModel index={i} />
        </group>
      ))}
    </group>
  );
};

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div className="home-page" ref={containerRef} style={{ position: 'relative' }}>
      <div className="home-layout">
        
        {/* Left Column - Scrolling Content */}
        <div className="left-column">
          
          {/* Intro Section */}
          <section className="intro-section">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="greeting">Hello, I am</p>
              <h1>{userData.name}</h1>
              <h2 className="text-gradient role">{userData.role}</h2>
              <p className="summary">{userData.profileSummary}</p>
              
              <div className="cta-group" style={{marginTop: '2rem'}}>
                <Link to="/about" className="btn btn-primary">More About Me</Link>
                <Link to="/contact" className="btn btn-outline">Contact</Link>
              </div>
            </motion.div>
          </section>

          {/* Project Sections */}
          <div className="projects-scroll-container">
            <h2 className="scroll-title">Scroll down to see my projects <span className="arrow">↓</span></h2>
            {userData.projects.map((project, i) => (
              <section key={i} className="project-text-section">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tags">
                     <span className="tag">{MERN_LETTERS[i % MERN_LETTERS.length].name}</span>
                  </div>
                  <ul className="project-desc">
                    {project.description.slice(0, 2).map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                  <Link to="/projects" className="view-more-link">View Full Details →</Link>
                </motion.div>
              </section>
            ))}
          </div>
          
        </div>

        {/* Right Column - Sticky 3D Canvas */}
        <div className="right-column">
          <div className="sticky-canvas">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <directionalLight position={[-2, -2, -2]} intensity={0.5} color="#6366f1" />
              <Scene scrollYProgress={scrollYProgress} />
            </Canvas>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
