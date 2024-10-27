import { Check, Zap, Sparkles, Crown, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const PricingSection = forwardRef<HTMLDivElement>((props, ref) => {
  const plans = [
    {
      name: "Free",
      price: "0",
      tokens: "40",
      icon: Zap,
      features: [
        "40 AI video generations",
        "720p video quality",
        "Basic templates",
        "Email support",
        "2 minutes max duration"
      ],
      popular: false,
      buttonText: "Get Started",
      delay: 0.2
    },
    {
      name: "Pro",
      price: "99",
      tokens: "500",
      icon: Sparkles,
      features: [
        "500 AI video generations",
        "1080p video quality",
        "Premium templates",
        "Priority support",
        "5 minutes max duration",
        "Custom branding"
      ],
      popular: true,
      buttonText: "Try Pro",
      delay: 0.4
    },
    {
      name: "Enterprise",
      price: "199",
      tokens: "2000",
      icon: Crown,
      features: [
        "2000 AI video generations",
        "4K video quality",
        "All premium features",
        "24/7 priority support",
        "10 minutes max duration",
        "Custom branding",
        "API access"
      ],
      popular: false,
      buttonText: "Get Enterprise",
      delay: 0.6
    }
  ];


  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-purple-200 text-lg">
            Select the perfect plan for your video creation needs
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: plan.delay }}
              className={`relative rounded-2xl bg-white/10 backdrop-blur-lg p-8 border ${
                plan.popular ? 'border-purple-400' : 'border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex justify-center mb-6">
                <plan.icon className={`w-12 h-12 ${
                  plan.popular ? 'text-purple-400' : 'text-white/80'
                }`} />
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {plan.name}
              </h3>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-purple-200">/month</span>
                <div className="mt-2 text-purple-300">
                  {plan.tokens} Tokens
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-purple-100">
                    <Check className="w-5 h-5 mr-3 text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                  plan.popular
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-purple-200">
            Need more tokens? Contact us for custom enterprise solutions.
            <br />
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
              Get in touch →
            </span>
          </p>
        </motion.div>

        {/* Social Proof */}
        <div className="max-w-7xl mx-auto mt-7">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-8 text-white/80"
          >
            <a href="#" className="flex items-center space-x-2 hover:text-white transition-colors">
              <Github className="h-6 w-6" />
              <span>Star on GitHub</span>
            </a>
            <a href="#" className="flex items-center space-x-2 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
              <span>Follow us</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

PricingSection.displayName = 'PricingSection';

export default PricingSection;