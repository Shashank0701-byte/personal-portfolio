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
      className="relative py-section-lg min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-section font-bold mb-4">
            Get In <GlowEffect color="purple">Touch</GlowEffect>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollReveal direction="right" delay={0.2}>
            <Card className="h-full">
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-gray-400 mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>

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
                      className="flex items-center gap-4 p-4 rounded-lg glass hover:border-neon-primary/50 border border-white/10 transition-all group"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-2 rounded-lg bg-neon-primary/10 group-hover:bg-neon-primary/20 transition-colors">
                        <IconComponent size={24} className="text-neon-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{social.name}</div>
                        <div className="text-sm text-gray-400">
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
            <Card>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-300"
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
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-neon-primary focus:outline-none focus:ring-2 focus:ring-neon-primary/20 transition-all bg-dark-surface/50 text-white"
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
                    className="block text-sm font-medium mb-2 text-gray-300"
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
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-neon-primary focus:outline-none focus:ring-2 focus:ring-neon-primary/20 transition-all bg-dark-surface/50 text-white"
                    placeholder="your.email@example.com"
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
                    className="block text-sm font-medium mb-2 text-gray-300"
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
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-neon-primary focus:outline-none focus:ring-2 focus:ring-neon-primary/20 transition-all bg-dark-surface/50 text-white resize-none"
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
                  className="w-full"
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

