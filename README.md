# AI Pothole Detection System

## Overview

The AI Pothole Detection System is a specialized dashboard designed for the UK Metropolitan Police and local councils to monitor, analyze, and manage road surface defects. This application leverages artificial intelligence and computer vision data to provide real-time insights into road conditions, facilitating efficient resource allocation and improved public safety.

The system integrates live mapping, severe defect alerts, unit rostering, and statistical analytics into a unified command and control interface.

## Key Features

### Live Operations Map
- **Real-time Visualization:** Displays pothole detections on an interactive map using distinct markers for severity levels (Severe, Moderate, Minor).
- **Cluster Management:** Automatically groups nearby detections to declutter the view at high zoom levels.
- **Heatmap Overlay:** Provides a density visualization to identify high-risk zones and deterioration trends.
- **Detailed Inspection:** interactive panels provide high-resolution snapshots, AI confidence scores, and depth categorization for each detection.

### Alert Management
- **Prioritized Notifications:** Automatically flags severe defects requiring immediate attention.
- **Status Tracking:** rigorous workflow management from "Pending" to "Assigned" and "Resolved".
- **Risk Assessment:** detailed risk scoring based on depth, location, and traffic volume.

### Resource Management (Roster)
- **Unit Tracking:** Real-time status monitoring of patrol units (On Duty, Busy, Off Duty).
- **Assignment:** Efficient interface for assigning units to specific high-priority defects.
- **Filtering:** Rapidly filter staff by rank, status, or assignment.

### Analytics & Reporting
- **Performance Metrics:** Track detection frequency, repair rates, and vehicle sensor reliability.
- **Trend Analysis:** Historical data visualization to track improvements over time.

## Technical Architecture

### Edge Computing Implementation
We deploy a **Raspberry Pi 5** as an edge computing unit mounted on the vehicle with a fixed forward-facing camera. This ensures stable geometry and predictable inference timing.

-   **Model:** Lightweight **YOLOv8-S**–based road surface anomaly detection model.
-   **Optimization:** CPU inference using reduced input resolution and ROI focusing on the drivable road area.
-   **Tracking:** Detections are confirmed across consecutive frames to suppress false positives (Temporal Consistency).
-   **Design:** Edge-first design eliminates network dependency for inference, ensuring low-latency warnings.
-   **Telemetry:** GPS data is sourced asynchronously via Bluetooth from a paired smartphone to prevent blocking critical alert paths.

### Web Application Stack
This dashboard is built using a modern frontend stack designed for performance, reliability, and security.

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Mapping Engine:** Leaflet (via React Leaflet)
- **State Management:** React Hooks
- **Styling:** CSS Modules with Government Design Principles

## Installation and Setup

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-org/pothole-detection-system.git
    cd pothole-detection-system
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

## Security and Compliance

This system is designed for authorized personnel only. Access is restricted and requires Two-Factor Authentication (2FA) via smartcard or secure token. All user sessions are monitored and logged in accordance with the Computer Misuse Act 1990.

## License

Copyright (c) 2024 Metropolitan Police Service. All rights reserved.
Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.
