import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Float } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useRef, Suspense } from "react";
import { Link } from "react-router-dom";

// 3D Scene Components
function FloatingElements() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Box position={[-2, 1, 0]} args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial color="#1e90ff" />
        </Box>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere position={[2, -1, 0]} args={[0.3, 32, 32]}>
          <meshStandardMaterial color="#60a5fa" />
        </Sphere>
      </Float>
      <Float speed={3} rotationIntensity={1.5} floatIntensity={3}>
        <Box position={[0, 2, -1]} args={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial color="#3b82f6" />
        </Box>
      </Float>
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingElements />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

// Navigation Component
function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-[#1e90ff]"
          >
            Pich & Safe
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["About", "Services", "Products", "Contact Us"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ scale: 1.1, color: "#1e90ff" }}
                className="text-gray-600 hover:text-[#1e90ff] transition-colors font-medium"
              >
                {item}
              </motion.a>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#1e90ff] hover:bg-[#1e90ff]/90 text-white">
                Demo Our Products
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0" ref={canvasRef}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#1e90ff]/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
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
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
            >
              Empowering Growth Through{" "}
              <span className="text-[#1e90ff] bg-gradient-to-r from-[#1e90ff] to-[#3b82f6] bg-clip-text text-transparent">
                Smart ICT Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 font-medium max-w-2xl"
            >
              Pich & Safe Consultancy Ltd is a Kenyan-based ICT solutions
              company dedicated to transforming businesses through innovative
              technology and strategic digital solutions.
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-[#1e90ff] hover:bg-[#1e90ff]/90 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Visual */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-96 lg:h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e90ff]/10 to-[#3b82f6]/10 rounded-3xl">
              <Canvas camera={{ position: [0, 0, 8] }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} />
                  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <Box position={[0, 0, 0]} args={[2, 2, 2]}>
                      <meshStandardMaterial
                        color="#1e90ff"
                        transparent
                        opacity={0.8}
                      />
                    </Box>
                  </Float>
                  <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
                    <Sphere position={[3, 1, 0]} args={[1, 32, 32]}>
                      <meshStandardMaterial
                        color="#60a5fa"
                        transparent
                        opacity={0.6}
                      />
                    </Sphere>
                  </Float>
                  <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={2}
                  />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <p className="text-gray-600 text-sm mb-2">Scroll Down</p>
          <ChevronDown className="h-6 w-6 text-[#1e90ff] mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Products Section
function ProductsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Products
          </h2>
          <div className="w-24 h-1 bg-[#1e90ff] mx-auto rounded-full mb-16"></div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              "Web Development & Design",
              "Digital Marketing Solutions",
              "Cloud & Hosting Services",
            ].map((product, index) => (
              <motion.div
                key={product}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#1e90ff]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-[#1e90ff] rounded-lg"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {product}
                </h3>
                <p className="text-gray-600">
                  Professional solutions tailored to your business needs with
                  cutting-edge technology.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1e90ff] to-[#3b82f6] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
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
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Are you ready to scale your business?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get in touch and let us build something amazing together!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#1e90ff] hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Send a Message
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-[#1e90ff]">Pich & Safe</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@pichsafe.com</span>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">LINKS</h4>
            <ul className="space-y-2">
              {["About", "Services", "Products", "Contact"].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5, color: "#1e90ff" }}
                    className="text-gray-300 hover:text-[#1e90ff] transition-colors"
                  >
                    {link}
                  </motion.a>
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
            <h4 className="text-lg font-semibold mb-4">OUR SERVICES</h4>
            <ul className="space-y-2">
              {[
                "Web Development & Design",
                "Social Media Marketing",
                "Domain & Hosting",
                "Mobile Development",
                "Cloud Solutions",
              ].map((service) => (
                <li key={service}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5, color: "#1e90ff" }}
                    className="text-gray-300 hover:text-[#1e90ff] transition-colors text-sm"
                  >
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
            <h4 className="text-lg font-semibold mb-4">Social Media Links</h4>
            <p className="text-gray-300 text-sm mb-4">
              Follow us on social media.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#1e90ff" }}
                className="text-gray-300 hover:text-[#1e90ff] transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: "#1e90ff" }}
                className="text-gray-300 hover:text-[#1e90ff] transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            Copyright © Pich & Safe. All rights reserved.
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
      <ProductsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
