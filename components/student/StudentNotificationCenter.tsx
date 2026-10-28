'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  CheckCheck,
  Wrench,
  CreditCard,
  Megaphone,
  Check,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useStudent, TabType } from './StudentContext';

export interface StudentNotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'MAINTENANCE' | 'PAYMENT' | 'SYSTEM' | 'ADMISSION' | 'OCCUPANCY';
  urgency: 'LOW' | 'NORMAL' | 'HIGH' | 'EMERGENCY';
  createdAt: string;
  isRead: boolean;
  targetTab?: TabType;
}

export function StudentNotificationCenter() {
  const { setActiveTab, triggerSuccess } = useStudent();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<StudentNotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<'ALL' | 'MAINTENANCE' | 'PAYMENT' | 'SYSTEM'>('ALL');
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch resident notifications from backend
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notifications/resident');
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      // Fallback local mock if offline
      console.warn('Could not connect to live backend notifications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 25000); // 25s auto-sync
    return () => clearInterval(interval);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAsRead = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
    } catch (err) {}
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((c) => Math.max(0, c - 1));
  };

  const handleMarkAllAsRead = async () => {
    try {
      await fetch('/api/notifications/mark-all-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: notifications.map((n) => n.id) }),
      });
    } catch (err) {}
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
    triggerSuccess('All notifications marked as read');
  };

  const handleItemClick = (notif: StudentNotificationItem) => {
    if (!notif.isRead) {
      handleMarkAsRead(notif.id);
    }
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
      triggerSuccess(`Navigated to ${notif.targetTab.toUpperCase()}`);
    }
    setIsOpen(false);
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'ALL') return true;
    return n.category === filter;
  });

  const getRelativeTime = (isoString: string) => {
    try {
      const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
      if (diffSec < 60) return 'Just now';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      return `${Math.floor(diffSec / 86400)}d ago`;
    } catch (e) {
      return 'Recently';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-card border border-card-border/80 text-primary/80 hover:text-primary hover:bg-linen transition-colors shadow-2xs active:scale-95 cursor-pointer"
        title="Resident Notifications"
        aria-label="Resident Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-sand text-[10px] font-bold flex items-center justify-center shadow-xs border border-linen animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="fixed inset-x-3 top-14 sm:absolute sm:inset-auto sm:right-0 sm:mt-2.5 sm:w-96 bg-card rounded-2xl shadow-2xl border border-card-border overflow-hidden z-50 text-left animate-fadeIn max-h-[82vh] flex flex-col">
          {/* Header */}
          <div className="p-3.5 px-4 bg-linen/70 border-b border-card-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary text-sand flex items-center justify-center shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-primary tracking-tight font-luxury">
                    Resident Notices
                  </h4>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-sand/50 text-primary text-[9px] font-bold">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted leading-none mt-0.5">
                  Hostel updates & ticket activity
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  title="Mark all as read"
                  className="px-2 py-1 rounded-lg text-primary/70 hover:text-primary hover:bg-linen text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <CheckCheck className="w-3 h-3" />
                  <span>Read all</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-muted hover:text-primary hover:bg-linen transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-3 py-1.5 bg-card border-b border-card-border/60 flex items-center gap-1 overflow-x-auto text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-xs ${
                filter === 'ALL'
                  ? 'bg-primary text-sand font-semibold shadow-2xs'
                  : 'text-muted hover:text-primary hover:bg-linen'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('SYSTEM')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-xs ${
                filter === 'SYSTEM'
                  ? 'bg-primary text-sand font-semibold shadow-2xs'
                  : 'text-muted hover:text-primary hover:bg-linen'
              }`}
            >
              Notices
            </button>
            <button
              type="button"
              onClick={() => setFilter('MAINTENANCE')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-xs ${
                filter === 'MAINTENANCE'
                  ? 'bg-primary text-sand font-semibold shadow-2xs'
                  : 'text-muted hover:text-primary hover:bg-linen'
              }`}
            >
              Tickets
            </button>
            <button
              type="button"
              onClick={() => setFilter('PAYMENT')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-xs ${
                filter === 'PAYMENT'
                  ? 'bg-primary text-sand font-semibold shadow-2xs'
                  : 'text-muted hover:text-primary hover:bg-linen'
              }`}
            >
              Bills
            </button>
          </div>

          {/* List Content */}
          <div className="max-h-[340px] overflow-y-auto divide-y divide-card-border/60">
            {filteredNotifs.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-9 h-9 rounded-full bg-sand/30 text-primary mx-auto flex items-center justify-center mb-2">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-primary">All caught up</p>
                <p className="text-[11px] text-muted mt-0.5">No notifications in this filter</p>
              </div>
            ) : (
              filteredNotifs.map((n) => {
                let Icon = Megaphone;
                let iconColor = 'bg-sand/30 text-primary';

                if (n.category === 'MAINTENANCE') {
                  Icon = Wrench;
                  iconColor = 'bg-amber-100/70 text-amber-900';
                } else if (n.category === 'PAYMENT') {
                  Icon = CreditCard;
                  iconColor = 'bg-emerald-100/70 text-emerald-900';
                }

                return (
                  <div
                    key={n.id}
                    onClick={() => handleItemClick(n)}
                    className={`p-3.5 hover:bg-linen/80 transition-colors flex items-start gap-3 cursor-pointer group ${
                      !n.isRead ? 'bg-sand/10' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg ${iconColor} flex items-center justify-center shrink-0 shadow-2xs mt-0.5`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h5 className="text-xs font-bold text-primary leading-tight group-hover:text-primary-dark transition-colors truncate">
                          {n.title}
                        </h5>
                        {!n.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1" />
                        )}
                      </div>

                      <p className="text-[11px] text-muted leading-snug mt-1 line-clamp-2">
                        {n.message}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-card-border/40 text-[10px]">
                        <span className="text-muted/70">{getRelativeTime(n.createdAt)}</span>
                        <div className="flex items-center gap-2">
                          {!n.isRead && (
                            <button
                              type="button"
                              onClick={(e) => handleMarkAsRead(n.id, e)}
                              className="text-muted hover:text-primary font-medium"
                            >
                              Mark read
                            </button>
                          )}
                          {n.targetTab && (
                            <span className="text-primary font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                              <span>Open</span>
                              <ChevronRight className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 px-4 bg-linen/50 border-t border-card-border flex items-center justify-between text-[10px] text-muted">
            <span>Saltmere Resident Portal</span>
            <button
              type="button"
              onClick={fetchNotifications}
              className="font-bold text-primary hover:underline cursor-pointer"
            >
              Sync Live
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
