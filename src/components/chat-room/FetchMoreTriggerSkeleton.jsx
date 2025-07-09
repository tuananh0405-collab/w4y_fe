import { useInView } from "react-intersection-observer";
import { Skeleton, Stack } from "@mui/material";
import { useEffect } from "react";

const FetchMoreTriggerSkeleton = ({ onFetchMore }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && onFetchMore) {
      onFetchMore();
    }
  }, [inView, onFetchMore]);

  return (
    <Stack ref={ref}>
      <div className="flex flex-col items-end">
        <Skeleton
          variant="rectangular"
          width="80%"
          height={40}
          sx={{ my: 2 }}
        />
      </div>
      <div>
        <Skeleton
          variant="rectangular"
          width="90%"
          height={40}
          sx={{ my: 2 }}
        />
      </div>
      <div className="flex flex-col items-end">
        <Skeleton
          variant="rectangular"
          width="70%"
          height={40}
          sx={{ my: 2 }}
        />
      </div>
    </Stack>
  );
};

export default FetchMoreTriggerSkeleton;
