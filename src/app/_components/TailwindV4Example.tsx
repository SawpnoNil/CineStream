"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function TailwindV4Example() {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`p-8 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background border border-border rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Tailwind CSS v4 Features</h2>
          <button 
            onClick={toggleDarkMode} 
            className="bg-muted hover:bg-muted/80 p-2 rounded-full"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Custom Buttons</h3>
            <div className="space-y-2">
              <button className="btn btn-primary w-full">Primary Button</button>
              <button className="btn btn-secondary w-full">Secondary Button</button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Native CSS Variables</h3>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-md" 
                  style={{ backgroundColor: `var(--color-chart-${i})` }} 
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Custom Animation</h3>
          <div className="h-1 w-full bg-muted relative overflow-hidden rounded-full">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-primary animate-loader"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Custom Color Mixing (Hover)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80">
              Opacity Modifier
            </button>
            <button className="btn btn-primary">
              Color Mix Hover
            </button>
            <div className="bg-gradient-to-r from-chart-1 to-chart-5 text-white font-medium p-4 rounded-lg">
              Gradient with Theme Colors
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Custom Brand Colors</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-brand p-4 rounded-lg text-white font-medium text-center">Brand</div>
            <div className="bg-brand-light p-4 rounded-lg text-white font-medium text-center">Brand Light</div>
            <div className="bg-brand-dark p-4 rounded-lg text-white font-medium text-center">Brand Dark</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-muted-foreground">
        <p>This example demonstrates Tailwind CSS v4 features like CSS-first configuration, custom utilities via @utility, and custom animations.</p>
      </div>
    </div>
  );
} 