import React from "react";
import { Box, Skeleton, Card, CardContent } from "@mui/material";

export const CategoryCardSkeleton = () => (
  <Card sx={{ height: "100%", borderRadius: 2 }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent>
      <Skeleton variant="text" height={32} width="80%" />
      <Skeleton variant="text" height={20} width="60%" sx={{ mt: 1 }} />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="text" width={100} height={20} />
      </Box>
    </CardContent>
  </Card>
);

export const AdCardSkeleton = () => (
  <Card sx={{ height: "100%", borderRadius: 2 }}>
    <Skeleton variant="rectangular" height={240} />
    <CardContent>
      <Skeleton variant="text" height={28} width="90%" />
      <Skeleton variant="text" height={20} width="70%" sx={{ mt: 1 }} />
      <Skeleton variant="text" height={20} width="50%" sx={{ mt: 1 }} />
      <Box sx={{ mt: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={36} />
      </Box>
    </CardContent>
  </Card>
);

export const ExpertCardSkeleton = () => (
  <Card sx={{ borderRadius: 2, p: 2 }}>
    <Box sx={{ display: "flex", gap: 2 }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" height={24} width="60%" />
        <Skeleton variant="text" height={20} width="80%" />
        <Skeleton variant="text" height={20} width="40%" sx={{ mt: 1 }} />
      </Box>
    </Box>
  </Card>
);

const SkeletonLoader = ({ type = "category", count = 3 }) => {
  const SkeletonComponent = {
    category: CategoryCardSkeleton,
    ad: AdCardSkeleton,
    expert: ExpertCardSkeleton,
  }[type] || CategoryCardSkeleton;

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </Box>
  );
};

export default SkeletonLoader;
