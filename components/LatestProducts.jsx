"use client";
import React from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

const LatestProducts = () => {
  const displayQuantity = 4;
  const products = useSelector((state) => state.product.list || []);

  const latestProducts = products
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, displayQuantity);

  const shown = Math.min(displayQuantity, products.length);

  return (
    <section className="px-6 my-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex justify-center items-center gap-2">
          <Sparkles className="text-indigo-600 dark:text-indigo-400" size={28} />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white">
            Latest <span className="text-indigo-600 dark:text-indigo-400">Products</span>
          </h2>
        </div>
        <p className="text-slate-500 dark:text-slate-300 mt-2 text-sm md:text-base max-w-xl mx-auto">
          Explore the freshest arrivals in tech & fashion — new styles, new gadgets, and new vibes, just for you.
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10">
        {latestProducts.map((product, index) => {
          const ratingNumber =
            typeof product.rating === "number"
              ? product.rating
              : Array.isArray(product.rating)
              ? product.rating.length
              : 0;

          return (
            <motion.div
              key={product.id ?? index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} rating={ratingNumber} />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10   text-center">
        <Link href="/shop" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
          <span>{`Showing ${shown} of ${products.length} products`}</span>
          <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default LatestProducts;
