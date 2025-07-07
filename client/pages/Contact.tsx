import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-[#1e90ff]">Pich & Safe</div>
            <div className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-gray-600 hover:text-[#1e90ff] transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-600 hover:text-[#1e90ff] transition-colors font-medium"
              >
                About
              </a>
              <a
                href="/services"
                className="text-gray-600 hover:text-[#1e90ff] transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="/products"
                className="text-gray-600 hover:text-[#1e90ff] transition-colors font-medium"
              >
                Products
              </a>
              <a href="#" className="text-[#1e90ff] font-medium">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            Contact <span className="text-[#1e90ff]">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            This page is under construction. We're building something amazing
            for you!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-[#1e90ff] hover:bg-[#1e90ff]/90 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
