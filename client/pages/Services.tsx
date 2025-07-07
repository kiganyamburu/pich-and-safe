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
  Cone,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Stars,
  Text,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowLeft,
  Code,
  TrendingUp,
  Globe,
  Shield,
  Users,
  Rocket,
  Smartphone,
  Cloud,
  Database,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useRef, Suspense } from "react";
import { Link } from "react-router-dom";

// 3D Service Visualization Components
function ServiceHero3D() {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={150} depth={80} count={3000} factor={3} />
      <Environment preset="sunset" />

      {/* Central service icon */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={2}>
        <Text
          position={[0, 2, 0]}
          fontSize={2.5}
          color="#8B5CF6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          SERVICES
          <MeshDistortMaterial
            color="#8B5CF6"
            distort={0.3}
            speed={2}
            metalness={0.9}
            roughness={0.1}
          />
        </Text>
      </Float>

      {/* Service category representations */}
      {[
        { pos: [4, 1, 0], color: "#3B82F6", geometry: "sphere" },
        { pos: [-4, 1, 0], color: "#F59E0B", geometry: "box" },
        { pos: [0, -2, 3], color: "#10B981", geometry: "torus" },
        { pos: [3, 0, -3], color: "#EF4444", geometry: "octahedron" },
        { pos: [-3, 0, -3], color: "#8B5CF6", geometry: "icosahedron" },
        { pos: [0, 4, 0], color: "#EC4899", geometry: "cone" },
      ].map((item, i) => (
        <Float
          key={i}
          speed={1 + i * 0.2}
          rotationIntensity={1}
          floatIntensity={2}
        >
          {item.geometry === "sphere" && (
            <Sphere position={item.pos} args={[0.4]}>
              <MeshWobbleMaterial
                color={item.color}
                factor={0.5}
                speed={2}
                transparent
                opacity={0.8}
              />
            </Sphere>
          )}
          {item.geometry === "box" && (
            <Box position={item.pos} args={[0.6, 0.6, 0.6]}>
              <MeshDistortMaterial
                color={item.color}
                distort={0.4}
                speed={2}
                transparent
                opacity={0.8}
              />
            </Box>
          )}
          {item.geometry === "torus" && (
            <Torus position={item.pos} args={[0.4, 0.15, 16, 32]}>
              <meshStandardMaterial
                color={item.color}
                metalness={0.8}
                roughness={0.2}
                emissive={item.color}
                emissiveIntensity={0.3}
              />
            </Torus>
          )}
          {item.geometry === "octahedron" && (
            <Octahedron position={item.pos} args={[0.5]}>
              <MeshDistortMaterial
                color={item.color}
                distort={0.6}
                speed={3}
                transparent
                opacity={0.9}
              />
            </Octahedron>
          )}
          {item.geometry === "icosahedron" && (
            <Icosahedron position={item.pos} args={[0.4]}>
              <meshStandardMaterial
                color={item.color}
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.8}
              />
            </Icosahedron>
          )}
          {item.geometry === "cone" && (
            <Cone position={item.pos} args={[0.3, 0.8, 8]}>
              <MeshWobbleMaterial
                color={item.color}
                factor={0.3}
                speed={2}
                transparent
                opacity={0.8}
              />
            </Cone>
          )}
        </Float>
      ))}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#3B82F6" intensity={1.2} />
      <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={0.8} />
    </group>
  );
}

function Service3DCard({ geometry, color, position }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {geometry === "sphere" && (
        <Sphere ref={meshRef} position={position} args={[0.5]}>
          <MeshDistortMaterial
            color={color}
            distort={0.4}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      )}
      {geometry === "torus" && (
        <Torus ref={meshRef} position={position} args={[0.5, 0.2, 16, 32]}>
          <MeshWobbleMaterial
            color={color}
            factor={0.5}
            speed={2}
            metalness={0.7}
            roughness={0.3}
          />
        </Torus>
      )}
      {geometry === "octahedron" && (
        <Octahedron ref={meshRef} position={position} args={[0.6]}>
          <MeshDistortMaterial
            color={color}
            distort={0.5}
            speed={3}
            metalness={0.9}
            roughness={0.1}
          />
        </Octahedron>
      )}
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
            <Link
              to="/about"
              className="text-text-secondary hover:text-brand-primary transition-colors font-medium"
            >
              About
            </Link>
            <span className="text-brand-primary font-medium">Services</span>
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
function ServicesHeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <motion.section
      style={{ y }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12] }}>
          <Suspense fallback={null}>
            <ServiceHero3D />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-blue-50/60 to-orange-50/80 dark:from-gray-900/80 dark:via-purple-900/60 dark:to-blue-900/80" />

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
            className="inline-flex items-center px-6 py-3 rounded-full glass border border-brand-secondary/20"
          >
            <Zap className="h-5 w-5 text-brand-accent mr-2" />
            <span className="text-sm font-medium text-text-secondary">
              Our Professional Services
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Comprehensive{" "}
            <span className="text-gradient-primary">ICT Solutions</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            From web development to digital transformation, we offer a complete
            suite of technology services designed to accelerate your business
            growth and digital presence.
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

// Services Grid Section
function ServicesGridSection() {
  const services = [
    {
      icon: Code,
      title: "Web Development & Design",
      description:
        "Custom websites and web applications built with modern frameworks and responsive design principles.",
      features: [
        "React/Next.js Development",
        "Responsive Design",
        "SEO Optimization",
        "Performance Optimization",
      ],
      color: "#3B82F6",
      geometry: "sphere",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies to boost your online presence and drive conversions.",
      features: [
        "Social Media Marketing",
        "Content Strategy",
        "PPC Campaigns",
        "Analytics & Reporting",
      ],
      color: "#8B5CF6",
      geometry: "torus",
    },
    {
      icon: Globe,
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and migration services for modern, efficient business operations.",
      features: [
        "Cloud Migration",
        "Infrastructure Setup",
        "Scalability Planning",
        "Security Implementation",
      ],
      color: "#F59E0B",
      geometry: "octahedron",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Advanced security measures to protect your digital assets and ensure business continuity.",
      features: [
        "Security Audits",
        "Threat Assessment",
        "Data Protection",
        "Compliance Management",
      ],
      color: "#10B981",
      geometry: "sphere",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android devices.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-platform Apps",
        "App Store Optimization",
      ],
      color: "#EF4444",
      geometry: "torus",
    },
    {
      icon: Database,
      title: "Data Solutions",
      description:
        "Database design, data analytics, and business intelligence solutions for informed decision-making.",
      features: [
        "Database Design",
        "Data Analytics",
        "Business Intelligence",
        "Reporting Dashboards",
      ],
      color: "#EC4899",
      geometry: "octahedron",
    },
  ];

  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient-primary mb-6">
            Our Service Portfolio
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Explore our comprehensive range of ICT services designed to meet
            your business needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              className="card-enhanced rounded-3xl p-8 group cursor-pointer relative overflow-hidden"
            >
              {/* 3D Background Element */}
              <div className="absolute top-4 right-4 w-32 h-32 opacity-10 group-hover:opacity-30 transition-opacity">
                <Canvas>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[2, 2, 2]} />
                    <Service3DCard
                      geometry={service.geometry}
                      color={service.color}
                      position={[0, 0, 0]}
                    />
                  </Suspense>
                </Canvas>
              </div>

              <div className="flex items-start space-x-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10"
                  style={{ backgroundColor: service.color + "20" }}
                >
                  <service.icon
                    className="h-8 w-8"
                    style={{ color: service.color }}
                  />
                </div>

                <div className="flex-1 relative z-10">
                  <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle
                          className="h-5 w-5 flex-shrink-0"
                          style={{ color: service.color }}
                        />
                        <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="h-1 rounded-full mt-6"
                    style={{
                      background: `linear-gradient(90deg, ${service.color}, ${service.color}80)`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const processes = [
    {
      title: "Discovery",
      description: "Understanding your needs and goals",
      icon: Target,
    },
    {
      title: "Planning",
      description: "Strategic roadmap and timeline",
      icon: Users,
    },
    { title: "Development", description: "Building your solution", icon: Code },
    {
      title: "Launch",
      description: "Deployment and optimization",
      icon: Rocket,
    },
  ];

  return (
    <section className="py-20 bg-gradient-rainbow relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={2000} />
            <ambientLight intensity={0.4} />

            {processes.map((_, i) => (
              <Float
                key={i}
                speed={1 + i * 0.3}
                rotationIntensity={0.5}
                floatIntensity={2}
              >
                <Icosahedron
                  position={[
                    (i - 1.5) * 4,
                    Math.sin(i * 0.8) * 2,
                    Math.cos(i * 0.6) * 3,
                  ]}
                  args={[0.5]}
                >
                  <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.7}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                  />
                </Icosahedron>
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
            Our Development Process
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A proven methodology that ensures successful project delivery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {processes.map((process, index) => (
            <motion.div
              key={process.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border border-white/20"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <process.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {index + 1}. {process.title}
              </h3>
              <p className="text-white/80">{process.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Button
            size="lg"
            className="bg-white text-brand-primary hover:bg-gray-100 rounded-full px-8 py-4 text-lg group"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Main Services Component
export default function Services() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <ServicesHeroSection />
      <ServicesGridSection />
      <ProcessSection />
    </div>
  );
}
