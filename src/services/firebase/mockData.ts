export interface RandomData {
  id: string;
  title: string;
  value: string;
  category: string;
  timestamp: string;
}

export function generateRandomData(): RandomData[] {
  const metrics = [
    { title: "Network Efficiency", suffix: "%", min: 92, max: 99.8, category: "Performance" },
    { title: "Server Response Time", suffix: "ms", min: 28, max: 95, category: "Performance" },
    { title: "Daily Active Users", suffix: " users", min: 1420, max: 2950, category: "Analytics" },
    { title: "API Success Rate", suffix: "%", min: 99.5, max: 99.99, category: "Analytics" },
    { title: "Memory Usage", suffix: "MB", min: 112, max: 215, category: "System" },
    { title: "Database Transactions", suffix: "/sec", min: 180, max: 540, category: "Database" },
  ];

  // Shuffle and pick 4 random metrics
  const shuffled = [...metrics].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4).map((m, idx) => {
    const val = (Math.random() * (m.max - m.min) + m.min).toFixed(m.suffix === "%" || m.title === "API Success Rate" ? 2 : 0);
    return {
      id: `data-${idx}-${Date.now()}`,
      title: m.title,
      value: `${val}${m.suffix}`,
      category: m.category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  });
}
