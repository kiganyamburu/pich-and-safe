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
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Zap,
  Heart,
  Users,
} from "lucide-react";
import { useRef, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";

// 3D Contact Scene Components
function ContactHero3D() {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={180} depth={90} count={3500} factor={3} />

      {/* Central contact visualization */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={1}>
        <Text
          position={[0, 4, 0]}
          fontSize={2.8}
          color="#EC4899"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          GET IN TOUCH
          <MeshDistortMaterial
            color="#EC4899"
            distort={0.3}
            speed={1.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text>
      </Float>

      {/* Communication network visualization */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 5 + Math.sin(i * 0.5) * 2;
        return (
          <Float
            key={i}
            speed={0.8 + i * 0.1}
            rotationIntensity={0.5}
            floatIntensity={1}
          >
            <Sphere
              position={[
                Math.cos(angle) * radius,
                Math.sin(i * 0.3) * 1,
                Math.sin(angle) * radius,
              ]}
              args={[0.15]}
            >
              <meshStandardMaterial
                color={`hsl(${300 + i * 15}, 70%, 60%)`}
                emissive={`hsl(${300 + i * 15}, 70%, 30%)`}
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </Sphere>
          </Float>
        );
      })}

      {/* Contact method representations */}
      <Float speed={1} rotationIntensity={0.8} floatIntensity={2}>
        <Torus position={[4, 0, 0]} args={[0.6, 0.2, 16, 32]}>
          <MeshWobbleMaterial
            color="#3B82F6"
            factor={0.4}
            speed={2}
            metalness={0.7}
            roughness={0.3}
          />
        </Torus>
      </Float>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.5}>
        <Octahedron position={[-4, 1, 0]} args={[0.7]}>
          <MeshDistortMaterial
            color="#10B981"
            distort={0.5}
            speed={2.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Octahedron>
      </Float>

      <Float speed={0.9} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron position={[0, -3, 2]} args={[0.5]}>
          <meshStandardMaterial
            color="#F59E0B"
            metalness={0.9}
            roughness={0.1}
            emissive="#F59E0B"
            emissiveIntensity={0.3}
          />
        </Icosahedron>
      </Float>

      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#EC4899" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#3B82F6" intensity={1} />
      <pointLight position={[0, 10, -10]} color="#10B981" intensity={0.8} />
    </group>
  );
}

function FloatingContactIcon({ icon: Icon, position, color }: any) {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          metalness={0.6}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </Box>
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
            <Link
              to="/products"
              className="text-text-secondary hover:text-brand-primary transition-colors font-medium"
            >
              Products
            </Link>
            <span className="text-brand-primary font-medium">Contact Us</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function ContactHeroSection() {
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
            <ContactHero3D />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.15}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-blue-50/80 dark:from-gray-900/80 dark:via-pink-900/60 dark:to-purple-900/80" />

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
            <MessageCircle className="h-5 w-5 text-brand-accent mr-2" />
            <span className="text-sm font-medium text-text-secondary">
              Let's Start a Conversation
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Ready to <span className="text-gradient-primary">Transform</span>{" "}
            Your Business?
          </h1>

          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            We're here to help you achieve your digital goals. Reach out to our
            team of experts and let's discuss how we can bring your vision to
            life with innovative ICT solutions.
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

// Contact Methods Section
function ContactMethodsSection() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "079-409-3840",
      description: "Mon-Fri from 8am to 6pm EAT",
      color: "#3B82F6",
      action: "tel:079-409-3840",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "info@pichsafe.com",
      description: "We'll respond within 24 hours",
      color: "#10B981",
      action: "mailto:info@pichsafe.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Nairobi, Kenya",
      description: "Our office location",
      color: "#F59E0B",
      action: "#",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "8:00 AM - 6:00 PM",
      description: "Monday to Friday (EAT)",
      color: "#8B5CF6",
      action: "#",
    },
  ];

  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 opacity-10">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            {contactMethods.map((method, i) => (
              <FloatingContactIcon
                key={i}
                icon={method.icon}
                position={[
                  (i - 1.5) * 4,
                  Math.sin(i * 0.8) * 2,
                  Math.cos(i * 0.6) * 3,
                ]}
                color={method.color}
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
            Get in Touch
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose your preferred way to connect with us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.action}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              viewport={{ once: true }}
              className="card-enhanced rounded-2xl p-8 text-center group cursor-pointer relative overflow-hidden"
            >
              {/* Glowing background effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                style={{ backgroundColor: method.color }}
              />

              <div
                className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: method.color + "20" }}
              >
                <method.icon
                  className="h-8 w-8"
                  style={{ color: method.color }}
                />
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                {method.title}
              </h3>

              <p
                className="text-lg font-semibold mb-2"
                style={{ color: method.color }}
              >
                {method.value}
              </p>

              <p className="text-text-secondary text-sm">
                {method.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="h-1 rounded-full mt-6"
                style={{
                  background: `linear-gradient(90deg, ${method.color}, ${method.color}80)`,
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Form Section


function ContactFormSection() {
  const [state, handleSubmit] = useForm("xpwrvykn");

  const services = [
    "Web Development",
    "Mobile Development",
    "Digital Marketing",
    "Cloud Solutions",
    "Cybersecurity",
    "IT Consulting",
    "Other",
  ];

  return (
    <section className="py-20 bg-gradient-rainbow relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-15">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={2000} />
            <ambientLight intensity={0.4} />
            {[...Array(8)].map((_, i) => (
              <Float
                key={i}
                speed={1 + i * 0.2}
                rotationIntensity={0.5}
                floatIntensity={2}
              >
                <Sphere
                  position={[
                    (i - 3.5) * 3,
                    Math.sin(i * 0.7) * 2,
                    Math.cos(i * 0.5) * 4,
                  ]}
                  args={[0.3]}
                >
                  <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.6}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                  />
                </Sphere>
              </Float>
            ))}
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Send Us a Message
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you as soon as
            possible
          </p>
        </motion.div>

        {state.succeeded ? (
          <div className="text-center text-white text-xl font-semibold">
            Thank you! Your message has been sent.
          </div>
        ) : (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Your full name"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  >
                    <option value="" className="text-gray-900">
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service} className="text-gray-900">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none"
                  placeholder="Tell us about your project..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-center"
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={state.submitting}
                  className="bg-white text-brand-primary hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold group"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {state.submitting ? "Sending..." : "Send Message"}
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Social Media Section
function SocialMediaSection() {
  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      handle: "Pich Safe",
      color: "#1877F2",
      link: "#",
    },
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@pich&safe",
      color: "#E4405F",
      link: "https://www.instagram.com/pichsafe?igsh=YzljYTk1ODg3Zg==",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      handle: "Pich Safe.",
      color: "#0A66C2",
      link: "https://www.linkedin.com/in/pich-safe-b0671b296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      icon: Twitter,
      name: "Twitter",
      handle: "@pichsafe",
      color: "#1DA1F2",
      link: "#",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8 mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient-primary">
            Follow Us on Social Media
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Stay connected and get the latest updates from our team
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="card-enhanced rounded-2xl p-8 group cursor-pointer"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: social.color + "20" }}
              >
                <social.icon
                  className="h-8 w-8"
                  style={{ color: social.color }}
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {social.name}
              </h3>
              <p className="text-text-secondary">{social.handle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Contact Component
export default function Contact() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <ContactHeroSection />
      <ContactMethodsSection />
      <ContactFormSection />
      <SocialMediaSection />
    </div>
  );
}
