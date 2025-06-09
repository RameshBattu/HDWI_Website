
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onDonate: () => void;
}

const Navigation = ({ onDonate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Media", href: "/media" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <div className="ml-3">
              <div className="font-bold text-gray-900 text-lg">HDWI Foundation</div>
              <div className="text-xs text-gray-600">Since 1992</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <Button 
              onClick={onDonate}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6"
            >
              Donate
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button 
                    onClick={() => {
                      onDonate();
                      setIsOpen(false);
                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white w-full mt-8"
                  >
                    Donate Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
