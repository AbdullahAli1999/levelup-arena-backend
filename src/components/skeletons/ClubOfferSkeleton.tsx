import { Card } from "@/components/ui/card";

const ClubOfferSkeleton = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Skeleton */}
          <div className="space-y-8 shimmer">
            <div className="space-y-4">
              <div className="h-6 w-40 bg-muted/30 rounded" />
              <div className="h-12 w-3/4 bg-muted/30 rounded" />
              <div className="h-12 w-2/3 bg-muted/30 rounded" />
              <div className="h-6 w-full bg-muted/30 rounded" />
              <div className="h-6 w-5/6 bg-muted/30 rounded" />
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-8 w-24 bg-muted/30 rounded" />
                  <div className="h-4 w-32 bg-muted/30 rounded" />
                </div>
              ))}
            </div>

            <div className="h-12 w-48 bg-muted/30 rounded-md" />
          </div>

          {/* Right Content - Card Skeleton */}
          <Card className="bg-gradient-card border-border/50 p-8 shadow-elegant shimmer">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-muted/30 rounded-full mx-auto" />
                <div className="h-8 w-48 bg-muted/30 rounded mx-auto" />
                <div className="h-4 w-64 bg-muted/30 rounded mx-auto" />
              </div>

              <div className="space-y-4">
                <div className="h-6 w-32 bg-muted/30 rounded" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-muted/30 rounded" />
                      <div className="h-4 w-48 bg-muted/30 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-6 w-40 bg-muted/30 rounded" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-muted/30 rounded" />
                      <div className="h-4 w-40 bg-muted/30 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-10 w-full bg-muted/30 rounded-md" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ClubOfferSkeleton;
