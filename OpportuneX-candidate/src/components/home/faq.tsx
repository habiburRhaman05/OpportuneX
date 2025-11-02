"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "How do I create a profile on JobPortal?",
    answer:
      'Creating a profile is simple and takes just 5 minutes. Click "Sign Up", fill in your details, upload your resume, and you\'re ready to start applying for jobs.',
  },
  {
    id: 2,
    question: "Is it really free to use JobPortal?",
    answer:
      "Yes! JobPortal is completely free for job seekers. You can apply to unlimited jobs, set up job alerts, and use all our features at no cost.",
  },
  {
    id: 3,
    question: "How often are new jobs posted?",
    answer:
      "New jobs are posted every hour. Companies continuously update their listings, so you'll always find fresh opportunities in your area of interest.",
  },
  {
    id: 4,
    question: "Can I set up job alerts?",
    answer:
      "You can create custom job alerts based on job title, location, salary range, and company. We'll notify you via email when matching jobs are posted.",
  },
  {
    id: 5,
    question: "How do I apply for a job?",
    answer:
      'Simply click "Apply" on any job listing. Your profile information will be automatically shared with the employer. You can also customize your application if needed.',
  },
  {
    id: 6,
    question: "What if I need help or have issues?",
    answer:
      "Our support team is available 24/7. You can reach us through live chat, email, or our help center. We're here to help!",
  },
]

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-400">Find answers to common questions about JobPortal</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/5 transition"
              >
                <span className="text-white font-semibold">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-blue-400 transition-transform duration-300 ${
                    expandedId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === faq.id && (
                <div className="px-6 pb-4 border-t border-white/10">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
