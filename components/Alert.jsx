'use client'
import React, { useEffect, useState } from 'react'
import { ChevronRightIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const AlertBanner = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500) // show after 1.5s
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="absolute top-6 left-1/2 -translate-x-100 z-30"
        >
          <div className="inline-flex items-center gap-3 bg-slate-300 text-slate-600 pr-4 p-1 rounded-full text-xs sm:text-sm shadow-md">
            <span className="bg-red-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs">
              ALERT
            </span>
            Free Shipping on Orders Above ₹500!
            <ChevronRightIcon className="group-hover:ml-2 transition-all" size={16} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AlertBanner
