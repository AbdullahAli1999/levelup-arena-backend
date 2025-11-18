import { Card } from "@/components/ui/card";

const UserTypeCardSkeleton = () => {
  return (
    <Card className="p-6 border-border/50 shimmer">
      <div className="space-y-6">
        {/* Icon skeleton */}
        <div className="w-16 h-16 bg-muted/30 rounded-xl" />
        
        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-32 bg-muted/30 rounded" />
          <div className="h-4 w-full bg-muted/30 rounded" />
          <div className="h-4 w-3/4 bg-muted/30 rounded" />
        </div>

        {/* Features skeleton */}
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted/30 rounded-full" />
              <div className="h-3 w-24 bg-muted/30 rounded" />
            </div>
          ))}
        </div>

        {/* Button skeleton */}
        <div className="h-10 w-full bg-muted/30 rounded-md" />
      </div>
    </Card>
  );
};

export default UserTypeCardSkeleton;
