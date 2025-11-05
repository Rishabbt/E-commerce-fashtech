'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaShippingFast, 
  FaHeadphonesAlt, 
  FaLock, 
  FaRecycle, 
  FaShoppingBag, 
  FaCreditCard 
} from "react-icons/fa"
import Title from '@/components/Title'

const ourSpecsData = [
  {
    title: "Fast & Free Shipping",
    description: "Enjoy quick, free delivery on all your tech and fashion accessories, wherever you are.",
    accent: "#3B82F6", 
    icon: FaShippingFast,
  },
  {
    title: "24/7 Support",
    description: "Our expert support team is available anytime to help you with your orders or queries.",
    accent: "#F59E0B", 
    icon: FaHeadphonesAlt,
  },
  {
    title: "Secure Payment",
    description: "We use advanced encryption for all transactions, ensuring your data and money are safe.",
    accent: "#10B981", 
    icon: FaLock,
  },
  {
    title: "Easy Returns",
    description: "Shop confidently with our easy 7-day return and exchange policy.",
    accent: "#EF4444", 
    icon: FaRecycle,
  },
  {
    title: "Premium Quality",
    description: "Each accessory is carefully tested and curated for quality, durability, and style.",
    accent: "#8B5CF6", 
    icon: FaShoppingBag,
  },
  {
    title: "Multiple Payment Options",
    description: "From UPI to credit cards, choose the payment method that suits you best.",
    accent: "#EC4899", 
    icon: FaCreditCard,
  },
]

const SpecificationsPage = () => {
  return (
    <div className="px-6 my-20 max-w-6xl mx-auto ">
      
      <Title
        visibleButton={false}
        title="Our Specifications"
        description="We provide top-tier service, quality, and convenience to make your shopping experience smooth, secure, and hassle-free."
      />

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {ourSpecsData.map((spec, index) => {
          const Icon = spec.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-5 relative h-52 px-8 flex flex-col items-center justify-center text-center border rounded-xl shadow-sm hover:shadow-lg transition bg-slate-900/80 hover:bg-slate-800 group"
              style={{
                borderColor: spec.accent + "80",
              }}
            >
              
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="absolute -top-6 text-white size-12 flex items-center justify-center rounded-lg shadow-md"
                style={{ backgroundColor: spec.accent }}
              >
                <Icon size={22} />
              </motion.div>

              
              <h3 className="text-white text-xl font-semibold mt-3">{spec.title}</h3>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">{spec.description}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SpecificationsPage
