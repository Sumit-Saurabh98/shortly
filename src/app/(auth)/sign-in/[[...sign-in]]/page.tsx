"use client"

import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.7,
          type: "spring",
          stiffness: 100 
        }}
        className="w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transform hover:scale-[1.02] transition-all duration-300"
      >
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <motion.div 
            initial={{ x: 200, opacity: 0, rotateY: 30 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className='p-8 flex items-center justify-center'
          >
            <SignIn />
          </motion.div>
          <motion.div 
            initial={{ x: -200, opacity: 0, rotateY: -30 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className='hidden lg:block relative h-full min-h-[500px]'
          >
            <Image 
              src="/landing.jpg" 
              alt="Authentication" 
              fill
              className='object-cover'
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}