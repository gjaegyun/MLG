"use client"

import Logo from '@/assets/images/Logo.png';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

interface HeaderProps {
  isAdmin?: boolean
  currentPage?: string
  userName?: string
}

const studentNavItems = [
  { name: "만들기", href: "/make", key: "make" },
  { name: "둘러보기", href: "/others", key: "others" },
  { name: "비교하기", href: "/comparision", key: "comparision" },
]

export function Header({ currentPage = "" }: HeaderProps) {

  const {push} = useRouter()

  const navItems = studentNavItems

  const isCurrentPage = (key: string) => {
    return currentPage === key
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center ">
              <div className="relative w-12 h-12">
                <Image
                  src={Logo}
                  alt="MLGLOGO"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <span className="text-xl font-bold text-gray-900 cursor-pointer" onClick={() => push('/')}>My Life Graph</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`${
                  isCurrentPage(item.key) ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
