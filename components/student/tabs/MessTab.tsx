'use client';

import React from 'react';

export function MessTab() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-[28px] border border-card-border p-6 sm:p-8 md:p-10">
        <div className="mb-6 pb-6 border-b border-primary/10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block">
            Saltmere Kitchen &amp; Nutrition
          </span>
          <h2 className="font-luxury text-3xl text-primary font-normal">
            Hostel Dining &amp; Mess Schedule
          </h2>
          <p className="text-xs text-primary/70 mt-1">
            Cooked with fresh local ingredients from coastal farms and day markets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              meal: 'Breakfast',
              time: '07:30 – 10:00',
              menu: [
                'Steamed Idli & Medu Vada with Sambar',
                'Oats Porridge with Wild Berries',
                'Boiled Eggs & Omelette Station',
                'Fresh Filter Coffee & Herbal Teas',
              ],
            },
            {
              meal: 'Lunch',
              time: '12:30 – 14:30',
              menu: [
                'Steamed Basmati & Jeera Rice',
                'Paneer Butter Masala / Dal Tadka',
                'Whole Wheat Phulkas with Ghee',
                'Fresh Curd, Cucumber Salad & Papad',
              ],
            },
            {
              meal: 'Evening Snacks',
              time: '17:00 – 18:30',
              menu: [
                'Hot Masala Chai & Lemon Tea',
                'Corn Cheese Balls / Veg Cutlets',
                'Assorted Biscuits & Fresh Rusks',
              ],
            },
            {
              meal: 'Dinner',
              time: '19:30 – 21:30',
              menu: [
                'Kadai Veg & Mixed Dal',
                'Coastal Chicken Curry (Non-Veg option)',
                'Hot Phulkas & Steamed Rice',
                'Gulab Jamun / Rice Kheer',
              ],
            },
          ].map((mealItem, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-card-border flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block">
                  {mealItem.time}
                </span>
                <h3 className="font-luxury text-xl text-primary font-normal mt-0.5 mb-3">
                  {mealItem.meal}
                </h3>
                <ul className="space-y-2 text-xs text-primary/75">
                  {mealItem.menu.map((dish, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sand mt-1.5 shrink-0" />
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-primary/10 text-[10px] text-emerald-800 font-medium">
                ✓ Quality Inspected Today
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
