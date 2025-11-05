'use client'
import React from 'react'
import { FaShippingFast, FaHeadphonesAlt, FaLock, FaRecycle, FaShoppingBag, FaCreditCard } from "react-icons/fa"
import Title from '@/components/Title'

const ourSpecsData = [
  {
    title: "Fast & Free Shipping",
    description: "Enjoy quick, free delivery on all your tech and fashion accessories, wherever you are.",
    accent: "#3B82F6", // Tailwind blue-500
    icon: FaShippingFast,
  },
  {
    title: "24/7 Support",
    description: "Our expert support team is available anytime to help you with your orders or queries.",
    accent: "#F59E0B", // amber-500
    icon: FaHeadphonesAlt,
  },
  {
    title: "Secure Payment",
    description: "We use advanced encryption for all transactions, ensuring your data and money are safe.",
    accent: "#10B981", // green-500
    icon: FaLock,
  },
  {
    title: "Easy Returns",
    description: "Shop confidently with our easy 7-day return and exchange policy.",
    accent: "#EF4444", // red-500
    icon: FaRecycle,
  },
  {
    title: "Premium Quality",
    description: "Each accessory is carefully tested and curated for quality, durability, and style.",
    accent: "#8B5CF6", // violet-500
    icon: FaShoppingBag,
  },
  {
    title: "Multiple Payment Options",
    description: "From UPI to credit cards, choose the payment method that suits you best.",
    accent: "#EC4899", // pink-500
    icon: FaCreditCard,
  },
]

const SpecificationsPage = () => {
  return (
    <div className="px-6 my-20 max-w-6xl mx-auto">
      {/* Section Title */}
      <Title
        visibleButton={false}
        title="Our Specifications"
        description="We provide top-tier service, quality, and convenience to make your shopping experience smooth, secure, and hassle-free."
      />

      {/* Specification Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {ourSpecsData.map((spec, index) => (
          <div
            key={index}
            className="relative h-48 px-8 flex flex-col items-center justify-center text-center border rounded-xl shadow-sm hover:shadow-lg transition bg-slate-900/80 hover:bg-slate-800 group"
            style={{
              borderColor: spec.accent + "80",
            }}
          >
            {/* Icon */}
            <div
              className="absolute -top-6 text-white size-12 flex items-center justify-center rounded-lg shadow-md group-hover:scale-110 transition-transform"
              style={{ backgroundColor: spec.accent }}
            >
              <spec.icon size={22} />
            </div>

            {/* Text */}
            <h3 className="text-white text-xl font-semibold mt-3">{spec.title}</h3>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">{spec.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpecificationsPage
