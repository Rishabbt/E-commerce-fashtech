"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ProductCard = ({ product, currency = "₹" }) => {
  const rating = product.rating?.length
    ? Math.round(product.rating.reduce((acc, r) => acc + r.rating, 0) / product.rating.length)
    : 0;

  const reviewCount = product.rating?.length || 0;

  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <Link href={`/product/${product.id}`} className="group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm hover:shadow-lg hover:shadow-indigo-200/30 dark:hover:shadow-indigo-500/10 overflow-hidden p-4 w-40 sm:w-48 md:w-56 lg:w-60 mx-auto cursor-pointer transition-all duration-300 min-h-[320px] flex flex-col"
      >
        {/* Image Section */}
        <div className="flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-40 sm:h-48 md:h-56 flex-shrink-0">
          <Image
            width={400}
            height={400}
            className="object-contain w-auto h-full group-hover:scale-110 transition-transform duration-500"
            src={product.images[0]}
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="pt-4 flex flex-col text-slate-800 dark:text-gray-100 flex-grow">
          <div className="flex justify-between items-start gap-2">
            <p className="font-semibold text-base leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 min-w-0">
              {product.name}
            </p>
            {/* 💰 Price */}
            <div className="flex flex-col items-end shrink-0">
              <p className="font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                {currency} {product.price.toLocaleString("en-IN")}
              </p>
              {discount && (
                <div className="flex items-center gap-1 mt-0.5">
                  {product.mrp && (
                    <span className="text-[10px] text-gray-400 line-through whitespace-nowrap">
                      {currency} {product.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold text-green-500 whitespace-nowrap">
                    {discount}% off
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* ⭐ Rating */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  className="mr-1"
                  fill={rating >= index + 1 ? "#00C950" : "none"}
                  stroke={rating >= index + 1 ? "#00C950" : "#D1D5DB"}
                />
              ))}
            {reviewCount > 0 && (
              <span className="text-[10px] text-gray-400">({reviewCount})</span>
            )}
          </div>
        </div>

        {/* Hover Overlay Accent */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-indigo-100/40 dark:from-indigo-500/10 to-transparent"></div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;