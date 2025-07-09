import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  Cylinder,
  Text,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Stars,
  Cloud,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ChevronDown,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Zap,
  Rocket,
  Target,
  Users,
  TrendingUp,
  Code,
  Palette,
  Globe,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";
import { useRef, Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Enhanced 3D Scene Components
function AnimatedSphere({ position, color, speed = 1 }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={0.3}
          speed={2}
          metalness={0.3}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedBox({ position, color, speed = 1 }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.1;
      meshRef.current.position.y =
        position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={1} floatIntensity={3}>
      <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.9}
          factor={0.6}
          speed={2}
          metalness={0.5}
          roughness={0.1}
        />
      </Box>
    </Float>
  );
}

function AnimatedTorus({ position, color, speed = 1 }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.position.x =
        position[0] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} position={position} args={[0.3, 0.1, 16, 32]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Torus>
    </Float>
  );
}

function AnimatedOctahedron({ position, color, speed = 1 }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * speed * 2) * 0.1,
      );
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.5} floatIntensity={2}>
      <Octahedron ref={meshRef} position={position} args={[0.4]}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={0.5}
          speed={3}
          metalness={0.7}
          roughness={0.1}
        />
      </Octahedron>
    </Float>
  );
}

function AnimatedIcosahedron({ position, color, speed = 1 }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.position.z =
        position[2] + Math.cos(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <Float speed={speed * 0.7} rotationIntensity={0.8} floatIntensity={1.5}>
      <Icosahedron ref={meshRef} position={position} args={[0.35]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
        />
      </Icosahedron>
    </Float>
  );
}

function AnimatedCone({ position, color, speed = 1 }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.6;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed * 1.5) * 0.4;
    }
  });

  return (
    <Float speed={speed * 1.3} rotationIntensity={1.2} floatIntensity={3}>
      <Cone ref={meshRef} position={position} args={[0.2, 0.6, 8]}>
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.8}
          factor={0.4}
          speed={2}
          metalness={0.6}
          roughness={0.3}
        />
      </Cone>
    </Float>
  );
}

function EnhancedScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <Environment preset="city" />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />

      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#F59E0B" />

      {/* Spheres with distortion */}
      <AnimatedSphere position={[-2, 1, 0]} color="#3B82F6" speed={1} />
      <AnimatedSphere position={[2, -1, 0]} color="#8B5CF6" speed={1.5} />
      <AnimatedSphere position={[0, 2, -2]} color="#F59E0B" speed={0.8} />

      {/* Boxes with wobble material */}
      <AnimatedBox position={[-1, -2, 1]} color="#10B981" speed={1.3} />
      <AnimatedBox position={[3, 1, -1]} color="#EF4444" speed={0.9} />
      <AnimatedBox position={[-3, 0, 1]} color="#F59E0B" speed={1.1} />

      {/* New complex geometries */}
      <AnimatedTorus position={[1, 3, 0]} color="#EC4899" speed={1.2} />
      <AnimatedTorus position={[-2, -1, 2]} color="#06B6D4" speed={0.9} />

      <AnimatedOctahedron position={[0, -3, 1]} color="#8B5CF6" speed={1.4} />
      <AnimatedOctahedron position={[4, 0, -2]} color="#F59E0B" speed={1.1} />

      <AnimatedIcosahedron position={[-4, 2, 0]} color="#10B981" speed={0.8} />
      <AnimatedIcosahedron position={[2, -2, -1]} color="#3B82F6" speed={1.3} />

      <AnimatedCone position={[0, 0, 3]} color="#EF4444" speed={1.5} />
      <AnimatedCone position={[-3, -3, 0]} color="#8B5CF6" speed={1.0} />

      {/* Floating clouds for atmosphere */}
      <Cloud
        position={[-4, -2, -5]}
        speed={0.2}
        opacity={0.3}
        color="#ffffff"
      />
      <Cloud position={[4, 2, -5]} speed={0.3} opacity={0.2} color="#e0e7ff" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

// Enhanced Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 0.6,
        stiffness: 100,
        damping: 15,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass backdrop-blur-xl border-b border-white/20 shadow-lg"
          : "bg-transparent"
      }`}
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
            {[
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Products", path: "/products" },
              { name: "Contact Us", path: "/contact" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                <Link
                  to={item.path}
                  className="text-text-secondary hover:text-brand-primary transition-all duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}

            <ThemeToggle />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="btn-primary rounded-full px-6 py-2">
                Demo Our Products
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Enhanced Hero Section
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20" />

      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas>
          <Suspense fallback={null}>
            <EnhancedScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            className="bg-gradient-to-r from-brand-primary to-brand-secondary"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center px-4 py-2 rounded-full glass border border-brand-primary/20"
            >
              <Zap className="h-4 w-4 text-brand-accent mr-2" />
              <span className="text-sm font-medium text-text-secondary">
                Walk in the Path of Service
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl md:text-7xl font-bold leading-tight"
            >
              Empowering Growth Through{" "}
              <span className="text-gradient-primary block mt-2">
                Smart ICT Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl text-text-secondary font-medium max-w-2xl leading-relaxed"
            >
              Pich & Safe Consultancy Ltd is a Kenyan-based ICT solutions company offering expert services in software development, networking, hardware support, and digital transformation.
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="btn-primary text-lg px-8 py-4 rounded-full group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 rounded-full glass border-brand-primary/30 hover:border-brand-primary/60"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { number: "100+", label: "Projects Delivered" },
                { number: "50+", label: "Happy Clients" },
                { number: "99%", label: "Success Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-text-muted mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced 3D Visual */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-96 lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-rainbow rounded-3xl animate-glow">
              <Canvas camera={{ position: [0, 0, 8] }}>
                <Suspense fallback={null}>
                  <EnhancedScene />
                </Suspense>
              </Canvas>
            </div>

            {/* Floating icons */}
            {[
              { icon: Code, position: "top-4 left-4", delay: 1.5 },
              { icon: Palette, position: "top-4 right-4", delay: 1.7 },
              { icon: Globe, position: "bottom-4 left-4", delay: 1.9 },
              { icon: Shield, position: "bottom-4 right-4", delay: 2.1 },
            ].map(({ icon: Icon, position, delay }) => (
              <motion.div
                key={position}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay }}
                className={`absolute ${position} p-3 glass rounded-full animate-float`}
                style={{ animationDelay: `${delay}s` }}
              >
                <Icon className="h-6 w-6 text-brand-primary" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <p className="text-text-muted text-sm mb-2">Discover More</p>
          <ChevronDown className="h-6 w-6 text-brand-primary mx-auto animate-bounce" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// 3D Service Card Component
function Service3DIcon({ geometry = "sphere", color = "#3B82F6" }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  const GeometryComponent =
    {
      sphere: Sphere,
      box: Box,
      torus: Torus,
      octahedron: Octahedron,
      icosahedron: Icosahedron,
      cone: Cone,
    }[geometry] || Sphere;

  const getArgs = () => {
    switch (geometry) {
      case "sphere":
        return [0.5, 32, 32];
      case "box":
        return [0.8, 0.8, 0.8];
      case "torus":
        return [0.4, 0.15, 16, 32];
      case "octahedron":
        return [0.6];
      case "icosahedron":
        return [0.5];
      case "cone":
        return [0.3, 0.8, 8];
      default:
        return [0.5, 32, 32];
    }
  };

  return (
    <GeometryComponent ref={meshRef} args={getArgs()}>
      <MeshDistortMaterial
        color={color}
        distort={0.3}
        speed={2}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </GeometryComponent>
  );
}

// Enhanced Services Section
function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Web Development & Design",
      description:
        "We provide scalable end-to-end application development and management solutions. Our expertise includes healthcare, business, travel, accounting, and school systems.",
      color: "from-blue-500 to-purple-600",
      geometry: "sphere",
      geometryColor: "#3B82F6",
    },
    {
      icon: TrendingUp,
      title: "Social Media and Digital Marketing",
      description:
        "We offer social media management, graphic design, and advertising services. Additionally, we develop custom social media applications tailored to your needs.",
      color: "from-purple-500 to-pink-600",
      geometry: "torus",
      geometryColor: "#8B5CF6",
    },
    {
      icon: Globe,
      title: "Network Services",
      description:
        "Pich and Safe delivers reliable network solutions including cabling, CCTV, access control, and wireless setups—built for security and performance..",
      color: "from-orange-500 to-red-600",
      geometry: "icosahedron",
      geometryColor: "#F59E0B",
    },
    {
      icon: Shield,
      title: "General IT Consultations",
      description:
        "We provide consulting services for technology implementation and upgrades. Our team delivers tailored solutions to meet your business needs.",
      color: "from-green-500 to-teal-600",
      geometry: "octahedron",
      geometryColor: "#10B981",
    },
    {
      icon: Users,
      title: "Enterprise Resource Planning (ERP)",
      description:
        "We offer ERP solutions that bring all your business processes into one easy-to-use system. This helps you stay organized, save time, and make better decisions every day.",
      color: "from-indigo-500 to-blue-600",
      geometry: "box",
      geometryColor: "#6366F1",
    },
    {
      icon: Rocket,
      title: "AI Automation",
      description:
        "We help businesses save time and work faster by using smart tools that handle repetitive tasks. Our AI automation service is simple, safe, and designed to make everyday work easier.",
      color: "from-pink-500 to-rose-600",
      geometry: "cone",
      geometryColor: "#EC4899",
    },
  ];

  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--color-primary))_1px,_transparent_0)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full glass border border-brand-secondary/20 mb-6"
          >
            <Target className="h-4 w-4 text-brand-accent mr-2" />
            <span className="text-sm font-medium text-text-secondary">
              Our Services
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-gradient-primary mb-6">
            Services
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We are deeply committed to the growth and success of our clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              viewport={{ once: true }}
              className="card-enhanced rounded-2xl p-8 group cursor-pointer overflow-hidden relative"
            >
              {/* 3D Background Element */}
              <div className="absolute top-4 right-4 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity">
                <Canvas>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[2, 2, 2]} />
                    <Service3DIcon
                      geometry={service.geometry}
                      color={service.geometryColor}
                    />
                  </Suspense>
                </Canvas>
              </div>

              <div
                className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                <service.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-brand-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                {service.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-6"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3D CTA Background Component
function CTA3DBackground() {
  return (
    <>
      <Stars radius={50} depth={30} count={3000} factor={2} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />

      {[...Array(8)].map((_, i) => {
        const geometries = ["sphere", "box", "torus", "octahedron"];
        const colors = ["#ffffff", "#f0f9ff", "#e0e7ff", "#fef3c7"];
        return (
          <Float
            key={i}
            speed={0.5 + Math.random() * 0.5}
            rotationIntensity={0.5}
            floatIntensity={2}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
          >
            <Service3DIcon
              geometry={geometries[i % geometries.length]}
              color={colors[i % colors.length]}
            />
          </Float>
        );
      })}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
}

// Enhanced CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-gradient-rainbow relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <Suspense fallback={null}>
            <CTA3DBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full glass border border-white/20"
          >
            <Star className="h-5 w-5 text-yellow-300 mr-2" />
            <span className="text-white font-medium">Ready to Transform?</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight">
            Are you ready to{" "}
            <span className="text-yellow-300">scale your business?</span>
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get in touch and let us build something amazing together! Transform
            your digital presence with our expert solutions.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-white text-brand-primary hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-2xl group"
            >
              Send a Message
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-8 text-white/80 text-sm"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Free Consultation
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              24/7 Support
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
              Custom Solutions
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// 3D Footer Logo Component
function Footer3DLogo() {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Text
        position={[0, 0, 0]}
        fontSize={1}
        color="#3B82F6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        P&S
        <MeshDistortMaterial
          color="#3B82F6"
          distort={0.2}
          speed={2}
          metalness={0.8}
          roughness={0.2}
        />
      </Text>

      {/* Orbiting elements around logo */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere position={[2, 0, 0]} args={[0.1]}>
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <Box position={[-2, 0, 0]} args={[0.2, 0.2, 0.2]}>
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={0.3}
          />
        </Box>
      </Float>
    </group>
  );
}

// Enhanced Footer
function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16 relative overflow-hidden">
      {/* 3D Logo Background */}
      <div className="absolute top-8 right-8 w-32 h-32 opacity-20">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 2]} color="#3B82F6" />
            <Footer3DLogo />
          </Suspense>
        </Canvas>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-3xl font-bold text-gradient-primary">
              Pich & Safe
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transforming businesses through innovative ICT solutions and
              strategic digital transformation.
            </p>
            <div className="space-y-3 text-gray-300">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <MapPin className="h-5 w-5 text-brand-primary" />
                <span>Kenya,Tharaka-Nithi,Chogoria.</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <Phone className="h-5 w-5 text-brand-primary" />
                <span>+254 700 000 000</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <Mail className="h-5 w-5 text-brand-primary" />
                <span>info@pichsafe.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-gradient-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Products", path: "/products" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-brand-primary transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-gradient-accent">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Web Development",
                "Digital Marketing",
                "Cloud Solutions",
                "Mobile Development",
                "Cybersecurity",
                "IT Consulting",
              ].map((service) => (
                <li key={service}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-brand-primary transition-all duration-300 text-sm flex items-center group"
                  >
                    <div className="w-2 h-2 bg-brand-secondary rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-gradient-accent">
              Connect With Us
            </h4>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Follow us on social media for the latest updates and insights.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white hover:shadow-lg transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-white hover:shadow-lg transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-medium mb-3">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-brand-primary text-sm"
                />
                <Button className="btn-primary rounded-l-none">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} Pich & Safe. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

// Main Index Component
export default function Index() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
