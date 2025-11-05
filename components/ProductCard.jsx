"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react"; // ✅ fixed icon import

const ProductCard = ({ product, rating = 4, currency = "₹" }) => {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-gradient-to-b from-slate-50 to-slate-100 
                   dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm 
                   hover:shadow-lg hover:shadow-indigo-200/30 dark:hover:shadow-indigo-500/10 
                   overflow-hidden p-4 sm:w-60 mx-auto cursor-pointer transition-all duration-300"
      >
        {/* Image Section */}
        <div className="flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-44 sm:h-56">
          <Image
            width={400}
            height={400}
            className="object-contain w-auto h-full group-hover:scale-110 transition-transform duration-500"
            src={product.images[0]}
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="pt-4 flex justify-between items-start text-slate-800 dark:text-gray-100">
          <div>
            <p className="font-semibold text-base leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {product.name}
            </p>

            {/* ⭐ Rating */}
            <div className="flex mt-1">
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    className="mr-1"
                    fill={rating >= index + 1 ? "#00C950" : "none"} // ✅ visible green fill for rated stars
                    stroke={rating >= index + 1 ? "#00C950" : "#D1D5DB"} // ✅ gray for empty stars
                  />
                ))}
            </div>
          </div>

          {/* 💰 Price */}
          <p className="font-bold text-indigo-600 dark:text-indigo-400">
            {currency}
            {product.price}
          </p>
        </div>

        {/* Hover Overlay Accent */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-indigo-100/40 dark:from-indigo-500/10 to-transparent"></div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
