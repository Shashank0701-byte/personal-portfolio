import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';
import { Button } from '../ui/Button';
import { EMAILJS_CONFIG } from '../../utils/constants';
import { socialLinks } from '../../data/socialLinks';
import * as LucideIcons from 'lucide-react';
import CosmicBackground from "../ui/CosmicBackground";


interface FormData {
  name: string;
  email: string;
  message: string;
}

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
        throw new Error('EmailJS configuration is missing. Please set up your environment variables.');
      }

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Mail;
    return IconComponent;
  };

  return (
    <section
      id="contact"
      className="relative py-24 min-h-screen flex items-center"
    >
      {/* --- 1. COSMIC BACKGROUND --- 
          Variant 'contact' uses the Earth/Horizon texture for a grand finale.
      */}
      <CosmicBackground variant="contact" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white">
            Get In <GlowEffect color="purple">Touch</GlowEffect>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-4">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>

          {/* Availability Badge */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-300 font-medium">Available for new opportunities</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollReveal direction="right" delay={0.2}>
            {/* Added glass effect to Card */}
            <Card className="h-full bg-slate-900/60 backdrop-blur-md border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-white">Let's Connect</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>

              {/* What I'm Looking For */}
              <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">Open to:</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span><strong className="text-white">Full-time roles</strong> in full-stack development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span><strong className="text-white">Freelance projects</strong> (web apps, APIs, AI integration)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-0.5">•</span>
                    <span><strong className="text-white">Open-source collaboration</strong> on interesting problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span><strong className="text-white">Technical discussions</strong> and knowledge sharing</span>
                  </li>
                </ul>
              </div>

              {/* Response Time */}
              <div className="mb-8 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong className="text-blue-300">Response time:</strong> Usually within 24-48 hours</span>
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = getIcon(social.icon);

                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all group"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                        <IconComponent size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{social.name}</div>
                        <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                          {social.url.replace('mailto:', '').replace('https://', '').replace('http://', '')}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </Card>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="left" delay={0.2}>
            {/* Added glass effect to Card */}
            <Card className="bg-slate-900/60 backdrop-blur-md border border-white/10">
              <h3 className="text-xl font-bold mb-2 text-white">Send a Message</h3>
              <p className="text-sm text-slate-400 mb-6">
                Fill out the form below and I'll get back to you as soon as possible. Please be specific about your project or inquiry.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-slate-300"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950/50 border border-white/10 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-slate-500"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950/50 border border-white/10 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-slate-500"
                    placeholder="shashankchakraborty712005@gmail.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950/50 border border-white/10 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-slate-500 resize-none"
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle size={14} />
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-cyan-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="inline-block mr-2 animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="inline-block mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2 text-green-400"
                  >
                    <CheckCircle size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400"
                  >
                    <AlertCircle size={20} />
                    <span>Failed to send message. Please try again or contact me directly.</span>
                  </motion.div>
                )}
              </form>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};