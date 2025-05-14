
import { useLanguage } from "@/contexts/LanguageContext";

interface TextProps {
  id: string;
  children: string;
  className?: string;
}

const Text = ({ id, children, className }: TextProps) => {
  const { translate } = useLanguage();
  
  return (
    <span className={className}>
      {translate(id, children)}
    </span>
  );
};

export default Text;
