import React from 'react';
import { Scale, Zap, Lock, Phone } from 'lucide-react';
import { whyChooseUs, aboutStats } from '../data/mock';

const iconMap = {
  Scale,
  Zap,
  Lock,
  Phone
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
          {/* Left: Why Choose Us */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                Why Shiv Bidya Niwas?
              </h3>
              
              <div className="space-y-6">
                {whyChooseUs.map((item, index) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: About Text */}
          <div className="order-1 lg:order-2">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3 block">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Helping Families
              <br />
              Reclaim What's
              <br />
              <span className="text-amber-600">Rightfully Theirs</span>
            </h2>
            
            <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
              <p>
                Shiv Bidya Niwas Private Limited was founded with one mission — to help ordinary investors and families navigate the complex world of unclaimed shares and lost investments.
              </p>
              <p>
                Many investors — especially senior citizens and heirs — are unaware that their shares have been transferred to IEPF or that dividends remain uncollected for years. We bridge this gap with expertise, empathy, and efficiency.
              </p>
              <p>
                From a single unclaimed share to a complex multi-company recovery, our team manages the entire process — filing, documentation, follow-ups, and final credit — so you can focus on what matters.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {aboutStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
