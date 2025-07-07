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
  Cylinder,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Stars,
  Text,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowLeft,
  Package,
  Monitor,
  Smartphone,
  Globe,
  ShoppingCart,
  Database,
  Cloud,
  Shield,
  Zap,
  Star,
  ExternalLink,
  Download,
  Play,
  Eye,
} from "lucide-react";
import { useRef, Suspense, useState } from "react";
import { Link } from "react-router-dom";

// 3D Product Visualization Components
function ProductHero3D() {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={200} depth={100} count={4000} factor={4} />

      {/* Central product showcase */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={1}>
        <Text
          position={[0, 3, 0]}
          fontSize={3}
          color="#F59E0B"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          PRODUCTS
          <MeshDistortMaterial
            color="#F59E0B"
            distort={0.2}
            speed={1}
            metalness={0.8}
            roughness={0.2}
          />
        </Text>
      </Float>

      {/* Product category representations */}
      {[
        { pos: [6, 2, 0], color: "#3B82F6", type: "web" },
        { pos: [-6, 2, 0], color: "#8B5CF6", type: "mobile" },
        { pos: [0, -2, 5], color: "#10B981", type: "saas" },
        { pos: [4, 0, -4], color: "#EF4444", type: "ecommerce" },
        { pos: [-4, 0, -4], color: "#F59E0B", type: "cms" },
        { pos: [0, 5, -2], color: "#EC4899", type: "dashboard" },
      ].map((item, i) => (
        <Float
          key={i}
          speed={0.8 + i * 0.1}
          rotationIntensity={0.5}
          floatIntensity={1.5}
        >
          {item.type === "web" && (
            <Box position={item.pos} args={[0.8, 0.5, 0.1]}>
              <MeshWobbleMaterial
                color={item.color}
                factor={0.3}
                speed={1.5}
                transparent
                opacity={0.8}
              />
            </Box>
          )}
          {item.type === "mobile" && (
            <Cylinder position={item.pos} args={[0.3, 0.3, 0.8, 16]}>
              <MeshDistortMaterial
                color={item.color}
                distort={0.3}
                speed={2}
                transparent
                opacity={0.8}
              />
            </Cylinder>
          )}
          {item.type === "saas" && (
            <Icosahedron position={item.pos} args={[0.5]}>
              <meshStandardMaterial
                color={item.color}
                metalness={0.9}
                roughness={0.1}
                emissive={item.color}
                emissiveIntensity={0.2}
              />
            </Icosahedron>
          )}
          {item.type === "ecommerce" && (
            <Torus position={item.pos} args={[0.5, 0.2, 16, 32]}>
              <MeshWobbleMaterial
                color={item.color}
                factor={0.4}
                speed={2}
                transparent
                opacity={0.9}
              />
            </Torus>
          )}
          {item.type === "cms" && (
            <Octahedron position={item.pos} args={[0.6]}>
              <MeshDistortMaterial
                color={item.color}
                distort={0.5}
                speed={2.5}
                transparent
                opacity={0.8}
              />
            </Octahedron>
          )}
          {item.type === "dashboard" && (
            <Sphere position={item.pos} args={[0.4]}>
              <MeshWobbleMaterial
                color={item.color}
                factor={0.6}
                speed={3}
                transparent
                opacity={0.7}
              />
            </Sphere>
          )}
        </Float>
      ))}

      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color="#F59E0B" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={1} />
      <pointLight position={[0, 10, -10]} color="#3B82F6" intensity={0.8} />
    </group>
  );
}

function Product3DPreview({ geometry, color, animated = true }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current && animated) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      {geometry === "monitor" && (
        <Box ref={meshRef} args={[1.2, 0.8, 0.1]}>
          <MeshDistortMaterial
            color={color}
            distort={0.2}
            speed={1.5}
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      )}
      {geometry === "mobile" && (
        <Cylinder ref={meshRef} args={[0.25, 0.25, 1, 16]}>
          <MeshWobbleMaterial
            color={color}
            factor={0.2}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Cylinder>
      )}
      {geometry === "cube" && (
        <Box ref={meshRef} args={[0.6, 0.6, 0.6]}>
          <MeshDistortMaterial
            color={color}
            distort={0.4}
            speed={2}
            metalness={0.6}
            roughness={0.4}
          />
        </Box>
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
            <Link
              to="/services"
              className="text-text-secondary hover:text-brand-primary transition-colors font-medium"
            >
              Services
            </Link>
            <span className="text-brand-primary font-medium">Products</span>
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
function ProductsHeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <motion.section
      style={{ y }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <Suspense fallback={null}>
            <ProductHero3D />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.1}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-purple-50/60 to-blue-50/80 dark:from-gray-900/80 dark:via-orange-900/60 dark:to-purple-900/80" />

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
            className="inline-flex items-center px-6 py-3 rounded-full glass border border-brand-accent/20"
          >
            <Package className="h-5 w-5 text-brand-accent mr-2" />
            <span className="text-sm font-medium text-text-secondary">
              Our Digital Products
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Innovative{" "}
            <span className="text-gradient-accent">Digital Products</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Discover our portfolio of cutting-edge digital products designed to
            streamline operations, enhance user experience, and drive business
            growth across various industries.
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

// Featured Products Section
function FeaturedProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const products = [
    {
      id: 1,
      title: "Professional Website Development",
      category: "Web Development",
      description:
        "Custom-built responsive websites with modern design, SEO optimization, and content management systems tailored for your business needs.",
      features: [
        "Responsive Mobile-First Design",
        "SEO Optimization & Analytics",
        "Content Management System",
        "E-commerce Integration",
      ],
      tech: ["React", "Next.js", "WordPress", "Shopify"],
      image: "/placeholder.svg",
      status: "Live",
      geometry: "monitor",
      color: "#3B82F6",
    },
    {
      id: 2,
      title: "Digital Marketing Solutions",
      category: "Marketing Services",
      description:
        "Comprehensive digital marketing services including social media management, content creation, and targeted advertising campaigns.",
      features: [
        "Social Media Management",
        "Content Strategy & Creation",
        "Google Ads & Facebook Ads",
        "Performance Analytics & Reporting",
      ],
      tech: ["Google Analytics", "Facebook Business", "Canva", "Hootsuite"],
      image: "/placeholder.svg",
      status: "Live",
      geometry: "mobile",
      color: "#8B5CF6",
    },
    {
      id: 3,
      title: "Domain & Hosting Services",
      category: "Web Hosting",
      description:
        "Reliable domain registration and web hosting solutions with 99.9% uptime guarantee, SSL certificates, and 24/7 technical support.",
      features: [
        "Domain Registration & Management",
        "SSL Certificate Installation",
        "Daily Automated Backups",
        "24/7 Technical Support",
      ],
      tech: ["cPanel", "Let's Encrypt", "CloudFlare", "Linux"],
      image: "/placeholder.svg",
      status: "Live",
      geometry: "cube",
      color: "#10B981",
    },
    {
      id: 4,
      title: "Business Consulting Services",
      category: "ICT Consulting",
      description:
        "Strategic ICT consulting to help businesses leverage technology for growth, digital transformation, and operational efficiency.",
      features: [
        "Technology Strategy Planning",
        "Digital Transformation Roadmap",
        "IT Infrastructure Assessment",
        "Process Optimization Consulting",
      ],
      tech: ["Microsoft 365", "Google Workspace", "Slack", "Zoom"],
      image: "/placeholder.svg",
      status: "Live",
      geometry: "monitor",
      color: "#F59E0B",
    },
    {
      id: 5,
      title: "Graphics Design & Branding",
      category: "Design Services",
      description:
        "Professional graphics design services including logo design, brand identity, marketing materials, and visual content creation.",
      features: [
        "Logo & Brand Identity Design",
        "Marketing Material Design",
        "Social Media Graphics",
        "Print & Digital Design",
      ],
      tech: ["Adobe Creative Suite", "Figma", "Canva", "Illustrator"],
      image: "/placeholder.svg",
      status: "Live",
      geometry: "mobile",
      color: "#EC4899",
    },
    {
      id: 6,
      title: "IT Support & Maintenance",
      category: "Technical Support",
      description:
        "Comprehensive IT support services including system maintenance, troubleshooting, software updates, and network management.",
      features: [
        "Remote Technical Support",
        "System Maintenance & Updates",
        "Network Setup & Management",
        "Software Installation & Training",
      ],
      tech: ["TeamViewer", "Windows Server", "Linux", "Network Tools"],
      image: "/placeholder.svg",
      status: "Live",
      geometry: "cube",
      color: "#EF4444",
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
            Featured Products
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Explore our flagship digital products that are transforming
            businesses worldwide
          </p>
        </motion.div>

        {/* Product Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 p-2 bg-surface-elevated rounded-2xl">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(index)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  selectedProduct === index
                    ? "bg-brand-primary text-white"
                    : "text-text-secondary hover:text-brand-primary hover:bg-surface-hover"
                }`}
              >
                {product.category}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Product Display */}
        <motion.div
          key={selectedProduct}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: products[selectedProduct].color + "20",
                    color: products[selectedProduct].color,
                  }}
                >
                  {products[selectedProduct].status}
                </span>
                <span className="text-text-muted">
                  {products[selectedProduct].category}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {products[selectedProduct].title}
              </h3>
              <p className="text-lg text-text-secondary leading-relaxed">
                {products[selectedProduct].description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xl font-semibold text-text-primary mb-4">
                Key Features
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {products[selectedProduct].features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <Star
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: products[selectedProduct].color }}
                    />
                    <span className="text-text-secondary">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xl font-semibold text-text-primary mb-4">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {products[selectedProduct].tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-surface-elevated rounded-full text-sm font-medium text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button className="btn-primary group">
                <Eye className="mr-2 h-4 w-4" />
                View Demo
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="group">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          {/* 3D Product Preview */}
          <div className="h-96 lg:h-[500px] relative">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <pointLight
                    position={[3, 3, 3]}
                    color={products[selectedProduct].color}
                  />
                  <pointLight position={[-3, -3, -3]} color="#8B5CF6" />
                  <Product3DPreview
                    geometry={products[selectedProduct].geometry}
                    color={products[selectedProduct].color}
                  />
                  <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={2}
                  />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Product Categories Section
function ProductCategoriesSection() {
  const categories = [
    {
      icon: Monitor,
      title: "Web Development",
      count: "50+ Websites Built",
      description:
        "Custom websites, e-commerce platforms, and web applications",
      color: "#3B82F6",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      count: "30+ Campaigns",
      description: "Social media marketing, content creation, and advertising",
      color: "#8B5CF6",
    },
    {
      icon: Cloud,
      title: "Hosting & Domains",
      count: "100+ Domains Managed",
      description: "Domain registration, web hosting, and SSL certificates",
      color: "#10B981",
    },
    {
      icon: Users,
      title: "ICT Consulting",
      count: "25+ Businesses Advised",
      description:
        "Technology strategy, digital transformation, and IT planning",
      color: "#F59E0B",
    },
    {
      icon: Palette,
      title: "Graphics Design",
      count: "200+ Designs Created",
      description:
        "Logo design, branding, marketing materials, and visual content",
      color: "#EF4444",
    },
    {
      icon: Shield,
      title: "IT Support",
      count: "24/7 Support Available",
      description: "Technical support, system maintenance, and troubleshooting",
      color: "#EC4899",
    },
  ];

  return (
    <section className="py-20 bg-gradient-rainbow relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-15">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <Suspense fallback={null}>
            <Stars radius={150} depth={80} count={3000} />
            <ambientLight intensity={0.3} />

            {categories.map((_, i) => (
              <Float
                key={i}
                speed={0.8 + i * 0.1}
                rotationIntensity={0.3}
                floatIntensity={1.5}
              >
                <Octahedron
                  position={[
                    (i - 2.5) * 4,
                    Math.sin(i * 0.7) * 3,
                    Math.cos(i * 0.5) * 4,
                  ]}
                  args={[0.8]}
                >
                  <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.6}
                    emissive="#ffffff"
                    emissiveIntensity={0.1}
                  />
                </Octahedron>
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
            Product Categories
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover our diverse range of digital products across various
            categories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border border-white/20 group cursor-pointer"
            >
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: category.color + "30" }}
              >
                <category.icon
                  className="h-8 w-8 text-white"
                  style={{ filter: `drop-shadow(0 0 8px ${category.color})` }}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {category.title}
              </h3>
              <p className="text-white/70 mb-4">{category.count}</p>
              <p className="text-white/80 text-sm">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Products Component
export default function Products() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <ProductsHeroSection />
      <FeaturedProductsSection />
      <ProductCategoriesSection />
    </div>
  );
}
