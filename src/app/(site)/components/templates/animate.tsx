'use client'
import { motion } from 'framer-motion'

export default function Animate({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <motion.div
            whileInView={{ 
                opacity: 1,
                transform: 'translateY(0px)',
             }}
            viewport={{ once: true, amount: 0 }}
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            transition={{ duration: 1, delay: 0.2 }}
            layout="position"
        >
            {children}
        </motion.div>
    )
}