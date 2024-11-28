"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageSection } from "../../components/page-container";
import { ScrollProgress } from "../../components/ui/scroll-progress";
import { ScrollToTop } from "../../components/ui/scroll-to-top";
import { ProjectButtons } from "../../components/ui/project-buttons";

const TechTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-2.5 sm:px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/5 dark:bg-primary/10 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 mr-1.5 mb-1.5 md:mr-2 md:mb-2 transition-all border border-primary/10 dark:border-primary/20">
    {children}
  </span>
);

export default function ShowcasePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-background via-background/95 to-background">
      <ScrollProgress />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.span 
            className="text-lg sm:text-xl md:text-2xl text-primary mb-4 md:mb-6 block font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to my
          </motion.span>
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Project Showcase
          </motion.h1>
          <motion.p 
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Take a look at some of the projects I've developed, each reflecting unique facets of web development.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="animate-bounce mt-12 sm:mt-16 md:mt-24"
          >
            <span className="text-sm sm:text-base md:text-lg text-muted-foreground">Scroll to explore</span>
            <div className="w-6 h-10 md:w-8 md:h-12 border-2 border-primary/50 dark:border-primary rounded-full mx-auto mt-2 md:mt-3 relative">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary/50 dark:bg-primary rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Container */}
      <div className="relative">
        {/* SteamShare Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-[#1b2838] dark:bg-[#1b2838] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10 dark:opacity-0" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <div className="relative h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                  <Image
                    src="/images/steam4.png"
                    alt="SteamShare Main"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/steam2.png"
                      alt="SteamShare Gallery"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/steam3.png"
                      alt="SteamShare Editor"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10 order-1 lg:order-2">
                <motion.h2 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#66c0f4] dark:text-[#66c0f4]"
                >
                  SteamShare
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-zinc-200 dark:text-zinc-200 leading-relaxed">
                    Steam screenshot management platform with integrated gallery organization and canvas editing. Features seamless Steam authentication, real-time data fetch, and collage creation tools.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>React 18</TechTag>
                    <TechTag>TypeScript</TechTag>
                    <TechTag>Steam Web API</TechTag>
                    <TechTag>Fabric.js</TechTag>
                    <TechTag>Framer Motion</TechTag>
                  </div>
                  <ProjectButtons 
                    liveUrl="https://steamshare.net"
                    codeUrl="https://github.com/JayRichh/steamshare"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </PageSection>

        {/* CSS Battle Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-background/50 to-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary dark:text-primary"
                >
                  CSS Battle
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed">
                    A full-featured web app for recreating CSS battles with real-time previews, scoring based on accuracy and code efficiency, and interactive comparison tools.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>Next.js</TechTag>
                    <TechTag>TypeScript</TechTag>
                    <TechTag>Tailwind CSS</TechTag>
                    <TechTag>Monaco Editor</TechTag>
                    <TechTag>html2canvas</TechTag>
                  </div>
                  <ProjectButtons 
                    liveUrl="https://domination.vercel.app"
                    codeUrl="https://github.com/JayRichh/domination"
                  />
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8"
              >
                <div className="relative h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                  <Image
                    src="/images/editor.png"
                    alt="CSS Battle Editor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/compare.png"
                      alt="CSS Battle Comparison"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/challenges.png"
                      alt="CSS Battle Challenges"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </PageSection>



        {/* Encompass Tours Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-emerald-950 to-background dark:from-emerald-950 dark:to-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10 dark:opacity-0" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#4CAF50] dark:text-[#4CAF50]"
                >
                  Encompass Tours
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-emerald-100 dark:text-emerald-100 leading-relaxed">
                    Digital platform for NZ motorcycle tours using Vue and Supabase. Features server-side caching, dynamic tour management, and interactive route visualization.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>Vue.js</TechTag>
                    <TechTag>Supabase</TechTag>
                    <TechTag>Redis</TechTag>
                    <TechTag>Node.js</TechTag>
                    <TechTag>TypeScript</TechTag>
                  </div>
                  <ProjectButtons 
                    liveUrl="https://encompasstours.co.nz"
                    codeUrl="https://github.com/JayRichh"
                  />
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8"
              >
                <div className="relative h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                  <Image
                    src="/images/encompass-hero.png"
                    alt="Encompass Tours Hero"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/encompass-about.png"
                      alt="Encompass Tours About"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/encompass-contact.png"
                      alt="Encompass Tours Contact"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </PageSection>

        {/* PomoDev Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-rose-950 to-background dark:from-rose-950 dark:to-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10 dark:opacity-0" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <div className="relative h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 transition-transform hover:scale-[1.02]">
                  <Image
                    src="/images/pomodev-logo.png"
                    alt="PomoDev Logo"
                    fill
                    className="object-contain p-8 md:p-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/pomodev1.png"
                      alt="PomoDev Timer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/pomodev3.png"
                      alt="PomoDev Tasks"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10 order-1 lg:order-2">
                <motion.h2 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#FF6B6B] dark:text-[#FF6B6B]"
                >
                  PomoDev
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-rose-100 dark:text-rose-100 leading-relaxed">
                    A Pomodoro Timer Chrome Extension designed to boost productivity. Features customizable timers, task management, and theme options, all built with modern web technologies.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>React</TechTag>
                    <TechTag>TypeScript</TechTag>
                    <TechTag>Vite</TechTag>
                    <TechTag>Chrome Extension API</TechTag>
                    <TechTag>Firefox Add-on API</TechTag>
                  </div>
                  <ProjectButtons 
                    codeUrl="https://github.com/JayRichh/pomodev"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </PageSection>

                {/* Aim Trainer Section */}
                <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-zinc-900 to-background dark:from-zinc-900 dark:to-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10 dark:opacity-0" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <div className="relative h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                  <Image
                    src="/images/a11.png"
                    alt="Aim Trainer Main"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/a12.png"
                      alt="Aim Trainer Gameplay"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] bg-background/5 backdrop-blur-sm">
                    <Image
                      src="/images/a7.png"
                      alt="Aim Trainer Features"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10 order-1 lg:order-2">
                <motion.h2 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-zinc-200 dark:text-zinc-200"
                >
                  Aim Trainer
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-zinc-300 dark:text-zinc-300 leading-relaxed">
                    A 3D FPS training application built with Three.js and React. Features weapon mechanics, moving targets, and performance tracking in an immersive environment.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>Next.js</TechTag>
                    <TechTag>Three.js</TechTag>
                    <TechTag>React</TechTag>
                    <TechTag>TypeScript</TechTag>
                    <TechTag>WebGL</TechTag>
                  </div>
                  <ProjectButtons 
                    liveUrl="https://aimtrainer-zeta.vercel.app/"
                    codeUrl="https://github.com/JayRichh/aimtrainer"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </PageSection>
      </div>

    </div>
  );
}
