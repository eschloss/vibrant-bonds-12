
import React from "react";
import { MessageSquare } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
      <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-accent" />
        {question}
      </h3>
      <div 
        className="text-gray-300 faq-answer prose prose-invert" 
        dangerouslySetInnerHTML={{ __html: typeof answer === 'string' ? answer : '' }}
      />
      {typeof answer !== 'string' && (
        <div className="text-gray-300">{answer}</div>
      )}
    </div>
  );
};

export default FAQItem;
