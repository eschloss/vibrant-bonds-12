import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Zap, Activity, Brain, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { cn } from "@/lib/utils";

// Data with citations
const generationData = [
  {
    generation: "Gen Z",
    ageRange: "18-27",
    lonelinessScore: 48.3,
    lonelinessPercent: 79,
    noFriends: 27,
    color: "url(#gen-z-gradient)",
    solidColor: "#FF2688",
    gradient: "linear-gradient(135deg, #FF2688, #FF4DA6)",
    citations: ["Cigna 2019", "Cigna 2020", "Survey Center on American Life 2021"],
    citationNumbers: [4, 5, 6],
    insights: [
      "Highest loneliness scores despite being most connected digitally",
      "Social media paradox: more connections, less meaningful relationships",
      "Financial stress and career uncertainty compound isolation"
    ]
  },
  {
    generation: "Millennials",
    ageRange: "28-43",
    lonelinessScore: 45.3,
    lonelinessPercent: 71,
    noFriends: 22,
    color: "url(#millennials-gradient)",
    solidColor: "#741ADD",
    gradient: "linear-gradient(135deg, #741ADD, #9B4DFF)",
    citations: ["YouGov 2019"],
    citationNumbers: [20, 3],
    insights: [
      "Work-life balance challenges impact social connections",
      "Adulting responsibilities leave less time for friendships",
      "Higher friendship maintenance expectations vs reality"
    ]
  },
  {
    generation: "Gen X",
    ageRange: "44-59",
    lonelinessScore: 40.2,
    lonelinessPercent: 50,
    noFriends: 15,
    color: "url(#gen-x-gradient)",
    solidColor: "#38D1BF",
    gradient: "linear-gradient(135deg, #38D1BF, #5FDDD0)",
    citations: ["Survey Center on American Life 2021"],
    citationNumbers: [21, 3],
    insights: [
      "Sandwich generation: caring for parents and children",
      "Career peak years limit social time",
      "More selective about deep vs surface relationships"
    ]
  },
  {
    generation: "Boomers",
    ageRange: "60+",
    lonelinessScore: 38.5,
    lonelinessPercent: 50,
    noFriends: 9,
    color: "url(#boomers-gradient)",
    solidColor: "#FFD600",
    gradient: "linear-gradient(135deg, #FFD600, #FFED4E)",
    citations: ["AARP 2020", "National Academies of Sciences 2020"],
    citationNumbers: [21, 22],
    insights: [
      "Retirement and empty nest syndrome create new social challenges",
      "Health issues and mobility impact social engagement",
      "Lifetime relationship skills help maintain existing connections"
    ]
  }
];

const metrics = [
  { key: 'lonelinessPercent', label: 'Loneliness Rate (%)', icon: Users, suffix: '%' },
  { key: 'lonelinessScore', label: 'UCLA Loneliness Score', icon: Brain, suffix: '/80' },
  { key: 'noFriends', label: 'No Close Friends (%)', icon: TrendingDown, suffix: '%' }
];

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-bold">
      {count}{suffix}
    </span>
  );
};

interface GenerationalLonelinessChartProps {
  className?: string;
}

const GenerationalLonelinessChart: React.FC<GenerationalLonelinessChartProps> = ({ className }) => {
  const [activeMetric, setActiveMetric] = useState<string>('lonelinessPercent');
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const currentData = generationData.map(gen => ({
    ...gen,
    value: gen[activeMetric as keyof typeof gen] as number,
    name: gen.generation
  }));

  const selectedGen = selectedGeneration ? generationData.find(g => g.generation === selectedGeneration) : null;
  const currentMetric = metrics.find(m => m.key === activeMetric);

  // Neural network background animation
  useEffect(() => {
    if (!isInView) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const container = containerRef.current;
    if (!container) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.1';
    container.appendChild(canvas);

    const nodes: Array<{x: number, y: number, vx: number, vy: number}> = [];
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.fill();
      });

      // Draw connections
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [isInView]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl">
        <h3 className="font-semibold text-foreground mb-2">{label}</h3>
        <p className="text-muted-foreground text-sm mb-2">{data.ageRange} years old</p>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: data.solidColor }}
          />
          <span className="text-sm text-foreground font-medium">
            {payload[0].value}{currentMetric?.suffix}
          </span>
        </div>
        {data.citations && (
          <div className="mt-3 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">Sources:</p>
            <div className="text-xs text-primary">
              {data.citations.join(', ')}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-purple-900/20 to-blue-900/30 rounded-2xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2 
            className="text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Loneliness Across Generations
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
          >
            Interactive data visualization revealing how loneliness affects different age groups
          </motion.p>
        </div>

        {/* Metric Selector */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Button
                key={metric.key}
                variant={activeMetric === metric.key ? "default" : "outline"}
                className={cn(
                  "transition-all duration-300 backdrop-blur-sm",
                  activeMetric === metric.key 
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25" 
                    : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
                )}
                onClick={() => setActiveMetric(metric.key)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {metric.label}
              </Button>
            );
          })}
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/30">
            <CardContent className="p-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <defs>
                      <linearGradient id="gen-z-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF2688" />
                        <stop offset="100%" stopColor="#FF4DA6" />
                      </linearGradient>
                      <linearGradient id="millennials-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#741ADD" />
                        <stop offset="100%" stopColor="#9B4DFF" />
                      </linearGradient>
                      <linearGradient id="gen-x-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38D1BF" />
                        <stop offset="100%" stopColor="#5FDDD0" />
                      </linearGradient>
                      <linearGradient id="boomers-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFD600" />
                        <stop offset="100%" stopColor="#FFED4E" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" className="opacity-20" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      radius={[8, 8, 0, 0]}
                      cursor="pointer"
                      onClick={(data) => {
                        setSelectedGeneration(data.generation);
                        setShowInsights(true);
                      }}
                    >
                      {currentData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="hover:opacity-95 transition-opacity drop-shadow-lg"
                        />
                      ))}
                      {/* Animated bars */}
                      <motion.g>
                        {currentData.map((entry, index) => (
                          <motion.rect
                            key={entry.generation}
                            initial={{ height: 0, y: 400 }}
                            animate={{ height: "auto", y: "auto" }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                          />
                        ))}
                      </motion.g>
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Generation Spotlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {generationData.map((gen, index) => (
            <motion.div
              key={gen.generation}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={cn(
                  "cursor-pointer transition-all duration-300 bg-gray-800/50 backdrop-blur-sm border-gray-700/50",
                  "hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30"
                )}
                onClick={() => {
                  setSelectedGeneration(gen.generation);
                  setShowInsights(true);
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center justify-between">
                    {gen.generation}
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: gen.solidColor }}
                    />
                  </CardTitle>
                  <p className="text-gray-400 text-sm">{gen.ageRange} years</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Loneliness Rate</span>
                    <span className="text-xl font-bold" style={{ color: gen.solidColor }}>
                      <AnimatedCounter value={gen.lonelinessPercent} suffix="%" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">No Close Friends</span>
                    <span className="text-lg font-semibold text-gray-300">
                      <AnimatedCounter value={gen.noFriends} suffix="%" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">UCLA Score</span>
                    <span className="text-lg font-semibold text-gray-300">
                      <AnimatedCounter value={gen.lonelinessScore} suffix="/80" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.9 }}
          className="space-y-6"
        >
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                Key Findings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/5 rounded-lg border border-purple-500/20">
                  <TrendingUp className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Younger = Lonelier</p>
                    <p className="text-gray-300 text-sm">Gen Z reports 79% loneliness vs 50% for Boomers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500/10 to-pink-600/5 rounded-lg border border-pink-500/20">
                  <Activity className="h-5 w-5 text-pink-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Friendship Decline</p>
                    <p className="text-gray-300 text-sm">1 in 4 Gen Z adults have no close friends</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-2">The Digital Paradox</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Despite being the most connected generation in history, Gen Z shows the highest rates of loneliness, 
                    suggesting that digital connections may not satisfy our fundamental need for meaningful human relationships.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Generation Insights Modal/Overlay */}
      <AnimatePresence>
        {showInsights && selectedGen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInsights(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <Card className="bg-gray-900/95 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: selectedGen.solidColor }}
                      />
                      {selectedGen.generation} Deep Dive
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowInsights(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </Button>
                  </CardTitle>
                  <p className="text-gray-400">{selectedGen.ageRange} years old</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        <AnimatedCounter value={selectedGen.lonelinessPercent} suffix="%" />
                      </div>
                      <div className="text-sm text-gray-400">Feel Lonely</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        <AnimatedCounter value={selectedGen.noFriends} suffix="%" />
                      </div>
                      <div className="text-sm text-gray-400">No Close Friends</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        <AnimatedCounter value={selectedGen.lonelinessScore} suffix="/80" />
                      </div>
                      <div className="text-sm text-gray-400">UCLA Score</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">Key Insights:</h4>
                    <div className="space-y-2">
                      {selectedGen.insights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                          <Zap className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          {insight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <ExternalLink className="h-3 w-3" />
                      Sources:
                    </div>
                    <div className="text-xs text-primary">
                      {selectedGen.citations.join(', ')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenerationalLonelinessChart;