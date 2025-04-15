import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PotholeMap } from "./PotholeMap";
import { PotholeStats } from "./PotholeStats";
import { PotholeViewer } from "./PotholeViewer";
import { RecentPotholes } from "./RecentPotholes";

export function Dashboard() {
  const potholes = useQuery(api.potholes.getLatestPotholes) ?? [];
  const deviceLocation = useQuery(api.potholes.getDeviceLocation) ?? null;
  const roadMesh = useQuery(api.potholes.getRoadMeshUrl) ?? null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Map showing device location and potholes */}
      <div className="md:col-span-2">
        <PotholeMap 
          potholes={potholes}
          deviceLocation={deviceLocation}
        />
      </div>

      {/* Detection frequency chart */}
      <div>
        <PotholeStats detections={potholes} />
      </div>

      {/* 3D road mesh viewer */}
      <div>
        <PotholeViewer />
      </div>

      {/* Notifications for new potholes */}
      <RecentPotholes potholes={potholes} />
    </div>
  );
}
