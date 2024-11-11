"use client";

import React from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

import { CtaButton } from "../components/cta-button";
import { GradientSecondaryText } from "../components/gradient-secondary-text";

import ContactForm from "../components/contact-form";

const JaydenRichardsonHero: React.FC = () => {
  return (
    <div className="relative my-20 mb-32 min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90 text-foreground">
      <div className="bg-gradient-radial absolute inset-0 from-transparent to-background/20 dark:to-background/40" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <section className="m-0 flex min-h-screen w-full flex-col items-center justify-center p-0">
          <div className="mt-40 w-full">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-2 space-y-1 text-4xl font-bold sm:text-5xl md:mb-4 md:space-y-2 md:text-6xl lg:text-7xl"
              >
                <span className="block text-foreground">Hi, I'm</span>
                <GradientSecondaryText className="block bg-gradient-to-r from-black/100 to-black/70 bg-clip-text pb-3 font-bold dark:from-white dark:to-white/60">
                  Jayden Richardson
                </GradientSecondaryText>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl"
              >
                Full Stack Web Developer with a background in Industrial
                Electrical Engineering
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-2 text-lg text-muted-foreground sm:text-xl md:text-2xl"
              >
                Kiwi innovating in the UK
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:mt-12"
              >
                <Link href="/about" passHref>
                  <CtaButton className="w-full bg-primary px-8 py-3 text-lg text-primary-foreground hover:bg-primary/90 sm:w-auto">
                    <motion.span
                      className="block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      About Me
                    </motion.span>
                  </CtaButton>
                </Link>
                <Link href="/code" passHref>
                  <CtaButton
                    variant="outline"
                    className="w-full border-primary px-8 py-3 text-lg text-primary hover:bg-primary/10 sm:w-auto"
                  >
                    <motion.span
                      className="block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      View Projects
                    </motion.span>
                  </CtaButton>
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="m-0 mb-16 w-full p-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex justify-center space-x-6 md:mt-12"
            >
              <motion.a
                href="https://github.com/JayRichh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <GithubIcon className="h-8 w-8" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/jaydenrichardson"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <LinkedinIcon className="h-8 w-8" />
              </motion.a>
              <motion.a
                href="mailto:jayrich.dev@gmail.com"
                whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <MailIcon className="h-8 w-8" />
              </motion.a>
            </motion.div>

            <ContactForm />
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default JaydenRichardsonHero;
