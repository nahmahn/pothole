
// Mock Data for UK Police Pothole Dashboard

export const getSummaryStats = () => {
    return {
        totalDetectedToday: 42,
        severePending: 8,
        confirmedByMultiple: 15,
        avgConfidence: 94,
        repeatedAlertAreas: 3
    };
};

export const getPotholeDetections = () => {
    return [
        {
            id: "P-1024",
            lat: 51.5074,
            lng: -0.1278,
            severity: "severe", // red
            confidence: 98,
            detectedAt: "2023-10-25T08:30:00Z",
            location: "Trafalgar Square, London",
            depthCategory: "Deep (>5cm)",
            vehicleSpeed: 25,
            vehicleCount: 4,
            model: "Vision-Detect-v2.1",
            snapshot: "/potholes/uk_pothole_1.png",
            explanation: "Detected by vision model based on sharp shadow contrast and surface depression pattern. Confirmed across 4 independent vehicle passes."
        },
        {
            id: "P-1025",
            lat: 51.5155,
            lng: -0.0922,
            severity: "moderate", // orange
            confidence: 85,
            detectedAt: "2023-10-25T09:15:00Z",
            location: "Cheapside, London",
            depthCategory: "Medium (2-5cm)",
            vehicleSpeed: 18,
            vehicleCount: 2,
            model: "Vision-Detect-v2.1",
            snapshot: "/potholes/uk_pothole_2.png",
            explanation: "Surface irregularity detected. Confidence lower due to glare. Requires secondary validation."
        },
        {
            id: "P-1026",
            lat: 51.5200,
            lng: -0.1500,
            severity: "minor", // yellow
            confidence: 72,
            detectedAt: "2023-10-25T10:00:00Z",
            location: "Marylebone Rd",
            depthCategory: "Shallow (<2cm)",
            vehicleSpeed: 30,
            vehicleCount: 1,
            model: "Vision-Detect-v2.1",
            snapshot: "/potholes/pothole1.png",
            explanation: "Possible surface cracking detected. Single pass confirmation only."
        },
        {
            id: "P-1027",
            lat: 51.4900,
            lng: -0.2000,
            severity: "severe",
            confidence: 96,
            detectedAt: "2023-10-25T11:20:00Z",
            location: "West Cromwell Rd",
            depthCategory: "Deep (>5cm)",
            vehicleSpeed: 28,
            vehicleCount: 5,
            model: "Vision-Detect-v2.1",
            snapshot: "/potholes/pothole2.png",
            explanation: "Severe defect identified. Suspension shock sensor corroborated vision data."
        },
        // Additional data points
        { id: "P-1028", lat: 51.5100, lng: -0.1350, severity: "severe", confidence: 94, detectedAt: "2023-10-25T12:00:00Z", location: "Strand", depthCategory: "Deep (>5cm)", vehicleSpeed: 20, vehicleCount: 3, model: "Vision-Detect-v2.1", snapshot: "/potholes/uk_pothole_1.png", explanation: "Severe defect." },
        { id: "P-1029", lat: 51.5085, lng: -0.1250, severity: "severe", confidence: 91, detectedAt: "2023-10-25T12:30:00Z", location: "Embankment", depthCategory: "Deep (>5cm)", vehicleSpeed: 22, vehicleCount: 4, model: "Vision-Detect-v2.1", snapshot: "/potholes/uk_pothole_2.png", explanation: "Severe defect." },
        { id: "P-1030", lat: 51.5095, lng: -0.1300, severity: "moderate", confidence: 80, detectedAt: "2023-10-25T13:00:00Z", location: "Villiers St", depthCategory: "Medium (2-5cm)", vehicleSpeed: 15, vehicleCount: 2, model: "Vision-Detect-v2.1", snapshot: "/potholes/pothole1.png", explanation: "Moderate defect." },
        { id: "P-1031", lat: 51.5060, lng: -0.1220, severity: "severe", confidence: 95, detectedAt: "2023-10-25T13:30:00Z", location: "Westminster Bridge Rd", depthCategory: "Deep (>5cm)", vehicleSpeed: 30, vehicleCount: 6, model: "Vision-Detect-v2.1", snapshot: "/potholes/uk_pothole_1.png", explanation: "Severe defect." },
        { id: "P-1032", lat: 51.5180, lng: -0.1100, severity: "moderate", confidence: 78, detectedAt: "2023-10-25T14:00:00Z", location: "Holborn", depthCategory: "Medium (2-5cm)", vehicleSpeed: 18, vehicleCount: 2, model: "Vision-Detect-v2.1", snapshot: "/potholes/uk_pothole_2.png", explanation: "Moderate defect." },
        { id: "P-1033", lat: 51.5120, lng: -0.0900, severity: "severe", confidence: 97, detectedAt: "2023-10-25T14:30:00Z", location: "Bank", depthCategory: "Deep (>5cm)", vehicleSpeed: 12, vehicleCount: 5, model: "Vision-Detect-v2.1", snapshot: "/potholes/pothole1.png", explanation: "Severe defect." },
        { id: "P-1034", lat: 51.5050, lng: -0.1350, severity: "minor", confidence: 68, detectedAt: "2023-10-25T15:00:00Z", location: "Lambeth", depthCategory: "Shallow (<2cm)", vehicleSpeed: 25, vehicleCount: 1, model: "Vision-Detect-v2.1", snapshot: "/potholes/pothole2.png", explanation: "Minor defect." },
        { id: "P-1035", lat: 51.5170, lng: -0.1400, severity: "severe", confidence: 93, detectedAt: "2023-10-25T15:30:00Z", location: "Oxford Circus", depthCategory: "Deep (>5cm)", vehicleSpeed: 10, vehicleCount: 4, model: "Vision-Detect-v2.1", snapshot: "/potholes/uk_pothole_1.png", explanation: "Severe defect." },
        { id: "P-1036", lat: 51.5140, lng: -0.0980, severity: "moderate", confidence: 82, detectedAt: "2023-10-25T16:00:00Z", location: "Liverpool St", depthCategory: "Medium (2-5cm)", vehicleSpeed: 20, vehicleCount: 3, model: "Vision-Detect-v2.1", snapshot: "/potholes/uk_pothole_2.png", explanation: "Moderate defect." },
        { id: "P-1037", lat: 51.5020, lng: -0.1180, severity: "severe", confidence: 99, detectedAt: "2023-10-25T16:30:00Z", location: "Waterloo", depthCategory: "Deep (>5cm)", vehicleSpeed: 28, vehicleCount: 7, model: "Vision-Detect-v2.1", snapshot: "/potholes/pothole1.png", explanation: "Severe defect." },
    ];
};

export const getAlerts = () => {
    return [
        {
            id: "A-501",
            potholeId: "P-1024",
            riskScore: 92,
            location: "Trafalgar Square, London",
            time: "2 hours ago",
            status: "Pending",
            recommendation: "Inspect within 24 hours"
        },
        {
            id: "A-502",
            potholeId: "P-1027",
            riskScore: 88,
            location: "West Cromwell Rd",
            time: "4 hours ago",
            status: "Acknowledged",
            recommendation: "Temporary warning signage recommended"
        },
        {
            id: "A-503",
            potholeId: "P-1025",
            riskScore: 65,
            location: "Cheapside, London",
            time: "5 hours ago",
            status: "Assigned",
            recommendation: "Routine inspection"
        }
    ];
};

export const getVehicleStats = () => {
    return {
        activeVehicles: 124,
        detectionFrequency: "4.2 / hr",
        gpsReliability: "99.8%",
        cameraStatus: "98% Online"
    };
};

export const getHistoricalData = () => {
    return [
        { name: 'Mon', detections: 24, repairs: 10 },
        { name: 'Tue', detections: 35, repairs: 12 },
        { name: 'Wed', detections: 42, repairs: 15 }, // Today
        { name: 'Thu', detections: 0, repairs: 0 },
        { name: 'Fri', detections: 0, repairs: 0 },
    ];
};

export const getOfficers = () => {
    return [
        { id: "OFF-101", name: "PC Sarah Jenkins", rank: "Constable", unit: "Alpha-1", status: "On Duty", location: "Westminster" },
        { id: "OFF-102", name: "Sgt David Miller", rank: "Sergeant", unit: "Alpha-Lead", status: "Busy", location: "Soho" },
        { id: "OFF-103", name: "PC James White", rank: "Constable", unit: "Bravo-2", status: "On Duty", location: "Kensington" },
        { id: "OFF-104", name: "PC Amara Kaur", rank: "Constable", unit: "Charlie-1", status: "Off Duty", location: "--" },
        { id: "OFF-105", name: "Insp Robert Grant", rank: "Inspector", unit: "HQ-Ops", status: "On Duty", location: "Lambeth HQ" },
        { id: "OFF-106", name: "PC Lisa Wong", rank: "Constable", unit: "Bravo-3", status: "Busy", location: "Camden" },
    ];
};
