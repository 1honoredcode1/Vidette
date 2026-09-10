import { Spinner } from "@/components/ui/spinner";

const OverlayLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xs">
      <Spinner className="h-12 w-12 stroke-3 text-white!" />
    </div>
  );
};

export default OverlayLoader;
