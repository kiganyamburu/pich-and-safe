import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Box,
  Float,
  Environment,
  PerspectiveCamera,
  Torus,
  Octahedron,
  Icosahedron,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Stars,
  Text,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowLeft,
  Users,
  Target,
  Award,
  Lightbulb,
  Heart,
  Zap,
  Globe,
  Shield,
  Rocket,
} from "lucide-react";
import { useRef, Suspense } from "react";
import { Link } from "react-router-dom";

// 3D About Scene Components
function AboutHero3D() {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={2000} factor={2} />
      <Environment preset="city" />

      {/* Central floating text */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
        <Text
          position={[0, 1, 0]}
          fontSize={2}
          color="#3B82F6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          ABOUT
          <MeshDistortMaterial
            color="#3B82F6"
            distort={0.2}
            speed={1.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text>
      </Float>

      {/* Orbiting elements */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Float
            key={i}
            speed={1 + i * 0.2}
            rotationIntensity={1}
            floatIntensity={2}
          >
            <Sphere
              position={[
                Math.cos(angle) * 4,
                Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.5,
                Math.sin(angle) * 4,
              ]}
              args={[0.2]}
            >
              <MeshWobbleMaterial
                color={`hsl(${220 + i * 30}, 70%, 60%)`}
                factor={0.5}
                speed={2}
                transparent
                opacity={0.8}
              />
            </Sphere>
          </Float>
        );
      })}

      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} color="#3B82F6" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={0.5} />
    </group>
  );
}

function TeamMember3D({ position, color }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} position={position} args={[0.3]}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </Icosahedron>
    </Float>
  );
}

// Navigation Component
function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gradient-primary"
          >
            Pich & Safe
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-text-secondary hover:text-brand-primary transition-colors font-medium"
            >
              Home
            </Link>
            <span className="text-brand-primary font-medium">About</span>
            <Link
              to="/services"
              className="text-text-secondary hover:text-brand-primary transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              to="/products"
              className="text-text-secondary hover:text-brand-primary transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-text-secondary hover:text-brand-primary transition-colors font-medium"
            >
              Contact Us
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function AboutHeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <motion.section
      style={{ y }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <Suspense fallback={null}>
            <AboutHero3D />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-orange-50/80 dark:from-gray-900/80 dark:via-purple-900/60 dark:to-blue-900/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center px-6 py-3 rounded-full glass border border-brand-primary/20"
          >
            <Users className="h-5 w-5 text-brand-accent mr-2" />
            <span className="text-sm font-medium text-text-secondary">
              About Our Company
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Transforming the Future of{" "}
            <span className="text-gradient-primary">Technology</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            We are a passionate team of innovators, developers, and digital
            strategists committed to delivering cutting-edge ICT solutions that
            empower businesses to thrive in the digital age.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => (window.location.href = "/")}
              className="btn-secondary rounded-full px-8 py-4 text-lg group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Values Section
function ValuesSection() {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology solutions",
      color: "#3B82F6",
      geometry: "sphere",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering superior quality in every project we undertake",
      color: "#8B5CF6",
      geometry: "octahedron",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Building trust through transparency and ethical practices",
      color: "#F59E0B",
      geometry: "icosahedron",
    },
    {
      icon: Lightbulb,
      title: "Creativity",
      description: "Crafting unique solutions tailored to your business needs",
      color: "#10B981",
      geometry: "torus",
    },
  ];

  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 opacity-20">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} color="#3B82F6" />
            {values.map((value, i) => (
              <TeamMember3D
                key={i}
                position={[
                  (i - 1.5) * 4,
                  Math.sin(i * 0.5) * 2,
                  Math.cos(i * 0.8) * 3,
                ]}
                color={value.color}
              />
            ))}
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient-primary mb-6">
            Our Core Values
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            The principles that guide everything we do and shape our company
            culture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              viewport={{ once: true }}
              className="card-enhanced rounded-2xl p-8 text-center group cursor-pointer relative overflow-hidden"
            >
              {/* 3D Background Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10 group-hover:opacity-30 transition-opacity">
                <Canvas>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                      <Octahedron args={[1]}>
                        <MeshDistortMaterial
                          color={value.color}
                          distort={0.4}
                          speed={2}
                        />
                      </Octahedron>
                    </Float>
                  </Suspense>
                </Canvas>
              </div>

              <div
                className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: value.color + "20" }}
              >
                <value.icon
                  className="h-8 w-8"
                  style={{ color: value.color }}
                />
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-brand-primary transition-colors">
                {value.title}
              </h3>

              <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                {value.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="h-1 rounded-full mt-6"
                style={{
                  background: `linear-gradient(90deg, ${value.color}, ${value.color}80)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  const teamStats = [
    { number: "15+", label: "Team Members", icon: Users },
    { number: "5+", label: "Years Experience", icon: Award },
    { number: "100+", label: "Projects Completed", icon: Rocket },
    { number: "50+", label: "Happy Clients", icon: Heart },
  ];

  return (
    <section className="py-20 bg-gradient-rainbow relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 12] }}>
          <Suspense fallback={null}>
            <Stars radius={50} depth={30} count={2000} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} color="#ffffff" />

            {teamStats.map((_, i) => (
              <Float
                key={i}
                speed={1 + i * 0.2}
                rotationIntensity={0.5}
                floatIntensity={2}
              >
                <Torus
                  position={[
                    (i - 1.5) * 3,
                    Math.sin(i * 0.8) * 2,
                    Math.cos(i * 0.6) * 2,
                  ]}
                  args={[0.5, 0.2, 16, 32]}
                >
                  <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.6}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                  />
                </Torus>
              </Float>
            ))}
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Meet Our Amazing Team
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A diverse group of talented professionals passionate about
            technology and innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {teamStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border border-white/20"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main About Component
export default function About() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <AboutHeroSection />
      <ValuesSection />
      <TeamSection />
    </div>
  );
}
