'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/Card';

/**
 * FAQ section with accordion-style Q&A
 */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does it take to generate videos?",
      answer: "Video generation typically takes 2-5 minutes per product, depending on the complexity of the garment and current system load. Larger collections are processed in batches automatically, and you can track progress in real-time."
    },
    {
      question: "What e-commerce platforms are supported?",
      answer: "VeoFlow works with any e-commerce site, including Shopify, WooCommerce, Magento, custom platforms, and more. Our system can scrape product images from virtually any online store."
    },
    {
      question: "Where are my videos stored?",
      answer: "Your generated videos are stored securely in our cloud storage and organized by collection. You can download them directly from your dashboard or access them via API for integration with your existing systems."
    },
    {
      question: "What's the cost?",
      answer: "Pricing is based on the number of videos generated. Visit our pricing page for current rates, or contact sales for enterprise plans. The cost is typically much lower than traditional photoshoots, saving you thousands per collection."
    },
    {
      question: "What video quality can I expect?",
      answer: "Videos are generated in high definition (1080p) and optimized for web use. The AI creates professional-looking model videos that showcase how clothing fits and moves naturally, with seamless loops that start and end with the original product image."
    },
    {
      question: "Can I customize the model appearance?",
      answer: "The AI automatically generates diverse models wearing your products. While specific customization is limited in the initial version, the system intelligently varies body types, skin tones, and poses to showcase your products effectively."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8 animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Everything you need to know about VeoFlow
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className={`overflow-hidden transition-all duration-300 ease-out animate-slideUp hover:shadow-md`}
          >
            <button
              className="flex justify-between items-center w-full p-6 text-left hover:bg-accent/50 transition-all duration-200 cursor-pointer group"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              <span className={`ml-4 text-xl transition-all duration-300 ease-in-out flex-shrink-0 transform ${
                openIndex === index ? 'rotate-180 text-primary' : 'rotate-0'
              }`}>
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <CardContent className="p-6 pt-0 border-t border-border">
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}