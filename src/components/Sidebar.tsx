"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { Crown, LayoutDashboard, PlusCircle, UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({
  isSidebarOpen,
  activeItem,
  setActiveItem
}: {
  isSidebarOpen: boolean;
  activeItem: string;
  setActiveItem: (item: string) => void;
}) => {
  const pathname = usePathname();

  const menuItems = [
    { 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      label: "Dashboard",
      href: "/dashboard" 
    },
    { 
      icon: <PlusCircle className="w-5 h-5" />, 
      label: "Create New",
      href: "/dashboard/create" 
    },
    { 
      icon: <Crown className="w-5 h-5" />, 
      label: "Upgrade",
      href: "/dashboard/upgrade" 
    },
    { 
      icon: <UserCog className="w-5 h-5" />, 
      label: "Account",
      href: "/dashboard/account" 
    },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <AnimatePresence>
      {(isSidebarOpen || window.innerWidth >= 1024) && (
        <motion.aside
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          className="fixed inset-y-0 left-0 z-40 w-64 pt-16 lg:translate-x-0"
        >
          <div className="h-full text-white px-3 py-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {menuItems.map((item, index) => (
                <motion.li key={index}>
                  <Link href={item.href}>
                    <motion.button
                      onClick={() => setActiveItem(item.label)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex items-center w-full p-3 rounded-lg
                        transition-colors duration-200
                        ${pathname === item.href || activeItem === item.label 
                          ? 'bg-white text-purple-600' 
                          : 'text-white hover:bg-white/20'
                        }
                      `}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </motion.button>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;