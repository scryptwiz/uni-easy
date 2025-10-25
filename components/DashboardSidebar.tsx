"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useSession, signOut } from "@/lib/auth-client";
import { sidebarItems } from "@/lib/dashboardConstants";
import { LogoutModal } from "@/components/LogoutModal";
import { ChevronDown, ChevronRight } from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const hasActiveSubItem = (subItems: any[]) => {
    return subItems?.some(subItem => isActive(subItem.href)) || false;
  };

  // Auto-expand items with active sub-items
  useEffect(() => {
    const itemsToExpand: string[] = [];
    sidebarItems.forEach(item => {
      if (item.subItems && hasActiveSubItem(item.subItems)) {
        itemsToExpand.push(item.id);
      }
    });
    setExpandedItems(itemsToExpand);
  }, [pathname]);

  // Get user initials from name
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    await signOut();
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.114 11.114 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">UniEase</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedItems.includes(item.id);
              const hasActiveSub = hasActiveSubItem(item.subItems || []);
              
              return (
                <div key={item.id}>
                  {/* Main Item */}
                  <div className="space-y-1">
                    {hasSubItems ? (
                      <div className="flex items-center">
                        {/* Main item as link */}
                        <Link
                          href={item.href}
                          className={cn(
                            "flex-1 flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                            active || hasActiveSub
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          )}
                          onClick={() => {
                            // Close sidebar on mobile after navigation
                            if (window.innerWidth < 1024) {
                              onClose();
                            }
                          }}
                        >
                          <div className={cn(
                            "p-1.5 rounded-md transition-colors",
                            active || hasActiveSub
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-400 group-hover:text-gray-600"
                          )}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <Badge 
                              variant="secondary" 
                              className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                        {/* Dropdown toggle button */}
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className={cn(
                            "p-2 rounded-lg text-sm font-medium transition-all duration-200",
                            active || hasActiveSub
                              ? "text-blue-700 hover:bg-blue-100"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          )}
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                        onClick={() => {
                          // Close sidebar on mobile after navigation
                          if (window.innerWidth < 1024) {
                            onClose();
                          }
                        }}
                      >
                        <div className={cn(
                          "p-1.5 rounded-md transition-colors",
                          active
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        )}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* Sub Items */}
                  {hasSubItems && isExpanded && (
                    <div className="ml-6 space-y-1 mt-1">
                      {item.subItems?.map((subItem) => {
                        const SubIconComponent = subItem.icon;
                        const subActive = isActive(subItem.href);
                        
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={cn(
                              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                              subActive
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            )}
                            onClick={() => {
                              // Close sidebar on mobile after navigation
                              if (window.innerWidth < 1024) {
                                onClose();
                              }
                            }}
                          >
                            <div className={cn(
                              "p-1 rounded-md transition-colors",
                              subActive
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-400 group-hover:text-gray-600"
                            )}>
                              <SubIconComponent className="h-3.5 w-3.5" />
                            </div>
                            <span className="flex-1">{subItem.label}</span>
                            {subItem.badge && (
                              <Badge 
                                variant="secondary" 
                                className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                              >
                                {subItem.badge}
                              </Badge>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-3 border-t border-gray-200">
            <button 
              onClick={handleLogoutClick}
              className="w-full flex items-center space-x-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {session?.user?.name ? getUserInitials(session.user.name) : "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session?.user?.email || "user@example.com"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <svg className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        userName={session?.user?.name}
        userEmail={session?.user?.email}
      />
    </>
  );
}
