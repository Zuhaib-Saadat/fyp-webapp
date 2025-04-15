# Pothole Detection Dashboard
  
1. Technology Stack

Frontend:
- React (TypeScript) - Modern UI framework
- Vite - Build tool and development server
- TailwindCSS - Utility-first CSS framework
- Chart.js - For detection frequency visualization
- Leaflet - For interactive maps
- Three.js - For 3D road mesh visualization

Backend:
- Convex - Real-time backend service
- TypeScript - Type-safe programming language
2. Project Structure

/
├── convex/                 # Backend code
│   ├── _generated/        # Auto-generated Convex types
│   ├── potholes.ts        # Pothole-related backend functions
│   └── schema.ts          # Database schema definition
│
├── src/                    # Frontend code
│   ├── components/        # React components
│   │   ├── Dashboard.tsx  # Main dashboard layout
│   │   ├── PotholeMap.tsx # Map visualization
│   │   ├── PotholeStats.tsx # Detection frequency graph
│   │   ├── PotholeViewer.tsx # 3D mesh viewer
│   │   └── RecentPotholes.tsx # Real-time notifications
│   │
│   ├── App.tsx           # Root component
│   └── main.tsx          # Entry point
│
└── public/               # Static assets
3. Key Components
Backend (convex/)

// potholes.ts - Core backend functions
1. getLatestPotholes() 
   - Fetches pothole detections
   - Will integrate with Azure database
   
2. getDeviceLocation()
   - Tracks Raspberry Pi location
   - Will integrate with Azure IoT Hub
   
3. getRoadMeshUrl()
   - Gets latest road mesh URL
   - Will integrate with Azure Storage
Frontend (src/components/)

// Dashboard.tsx - Main layout orchestrator
- Manages layout of all visualizations
- Uses Convex real-time queries

// PotholeMap.tsx
- Shows device location (green dot)
- Displays pothole markers
- Uses Leaflet for mapping

// PotholeStats.tsx
- Shows detection frequency
- Time ranges: 10min/1hr/10hrs
- Uses Chart.js for graphs

// PotholeViewer.tsx
- 3D visualization of road mesh
- Uses Three.js for rendering
- Will load .obj files from Azure

// RecentPotholes.tsx
- Real-time notifications
- Shows latest detections
- Animated notifications
4. Data Flow

1. Data Collection:
   Raspberry Pi → Azure IoT Hub → Convex Backend

2. Real-time Updates:
   Convex Backend → React Frontend (automatic)

3. Visualization Pipeline:
   a. Map: Device location + Pothole markers
   b. Graph: Detection frequency over time
   c. 3D Viewer: Road mesh visualization
   d. Notifications: Latest detections
5. Integration Points

Azure Services:
1. IoT Hub: Device location tracking
2. Database: Pothole detection storage
3. Storage: Road mesh (.obj) files

Convex Backend:
- Real-time data synchronization
- Automatic UI updates
- Scalable backend infrastructure
6. Key Features

1. Real-time Tracking:
   - Device location updates
   - Pothole detection notifications
   - Live detection frequency graph

2. Interactive Visualizations:
   - Map with color-coded markers
   - Time-range selectable graphs
   - 3D road mesh viewer

3. Responsive Design:
   - Mobile-friendly layout
   - Adaptive visualizations
   - Real-time notifications
7. Technical Highlights

1. Real-time Updates:
   - Uses Convex's live queries
   - No manual refresh needed
   - Efficient data synchronization

2. Type Safety:
   - Full TypeScript implementation
   - Auto-generated API types
   - Robust error handling

3. Performance:
   - Optimized 3D rendering
   - Efficient data filtering
   - Responsive UI updates
8. Future Integration

To integrate with Azure:
1. Update getLatestPotholes():
   - Connect to Azure database
   - Fetch real-time detections

2. Update getDeviceLocation():
   - Connect to Azure IoT Hub
   - Get real GPS coordinates

3. Update getRoadMeshUrl():
   - Connect to Azure Storage
   - Fetch latest .obj files
This project demonstrates:

Full-stack development skills
Real-time data handling
3D visualization capabilities
Integration with IoT devices
Cloud service integration
Modern web technologies
Responsive UI design
Type-safe programming
The architecture ensures:

Scalability for more devices
Real-time performance
Easy maintenance
Type safety
Code reusability
Clear separation of concerns
