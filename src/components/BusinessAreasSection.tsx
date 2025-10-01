import React from 'react';
import { ChevronRight } from 'lucide-react';

const businessCategories = [
  { title: '안전점검 및 정밀안전진단', id: 'safety-inspection' },
  { title: '교량 및 터널', id: 'bridge-tunnel' },
  { title: '수리시설', id: 'water-facility' },
  { title: '항만', id: 'port' },
  { title: '건축', id: 'architecture' },
  { title: '기타', id: 'others' }
];

export const BusinessAreasSection = () => {
  return (
    <section id="business-areas" className="pt-24 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 사업분야 */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop"
                alt="사업분야 - 교량"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white font-korean">사업분야</h2>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {businessCategories.map((category) => (
                  <li key={category.id}>
                    <a 
                      href={`#${category.id}`}
                      className="flex items-center justify-between py-3 px-4 bg-muted/50 hover:bg-accent/10 rounded transition-colors group"
                    >
                      <span className="font-korean text-foreground">{category.title}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 수행실적 */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border">
            <div className="relative h-64">
              <img 
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop"
                alt="수행실적 - 항만"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white font-korean">수행실적</h2>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {[
                  { title: '교량 및 터널', id: 'portfolio-bridge' },
                  { title: '수리시설', id: 'portfolio-water' },
                  { title: '항만', id: 'portfolio-port' },
                  { title: '건축', id: 'portfolio-architecture' },
                  { title: '기타', id: 'portfolio-others' },
                  { title: '기술개발', id: 'portfolio-tech' }
                ].map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`}
                      className="flex items-center justify-between py-3 px-4 bg-muted/50 hover:bg-accent/10 rounded transition-colors group"
                    >
                      <span className="font-korean text-foreground">{item.title}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
