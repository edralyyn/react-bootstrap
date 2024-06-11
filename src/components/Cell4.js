import React, { useEffect, useState } from 'react';
import axios from 'axios';

const eventSolutions = {
    41: "Event ID 41: Kernel-Power error. This typically indicates that the system rebooted without cleanly shutting down first. Possible solutions: \n" +
        "- Check for overheating issues and ensure adequate cooling.\n" +
        "- Update your motherboard's BIOS.\n" +
        "- Check for faulty power supply.\n" +
        "- Ensure drivers and firmware are up-to-date.",
    6008: "Event ID 6008: Unexpected shutdown. This indicates that the system did not shut down cleanly. Possible solutions: \n" +
        "- Check the system for power interruptions.\n" +
        "- Investigate potential hardware failures.\n" +
        "- Review any system changes or new hardware that may be causing instability.",
    1000: "Event ID 1000: Application Error. This error occurs when a program crashes. Possible solutions: \n" +
        "- Check for updates or patches for the application.\n" +
        "- Reinstall the application.\n" +
        "- Check system logs for related errors and troubleshoot accordingly.",
    3207: "Event ID 3207: License Activation (SLUI) error. This usually relates to issues with software licensing. Possible solutions: \n" +
        "- Ensure the system's date and time are correct.\n" +
        "- Verify that the system has internet connectivity.\n" +
        "- Use the `slmgr` command-line tool to troubleshoot activation issues.\n" +
        "- Contact Microsoft Support if the issue persists.",
    0: "Event ID 0: GPU recovery. This event indicates that the GPU has recovered from a previous error. Possible solutions: \n" +
        "- Ensure proper ventilation for the GPU.\n" +
        "- Update GPU drivers to the latest version.\n" +
        "- Check for overheating issues.",
    4101: "Event ID 4101: Display driver timeout. This indicates that the display driver failed to respond in a timely manner. Possible solutions: \n" +
        "- Update GPU drivers to the latest version.\n" +
        "- Adjust GPU settings for performance or stability.\n" +
        "- Check for overheating issues.",
    141: "Event ID 141: Timeout Detection and Recovery (TDR). This event indicates that the GPU stopped responding and was reset. Possible solutions: \n" +
        "- Increase TDR timeout value in Windows registry.\n" +
        "- Update GPU drivers to the latest version.\n" +
        "- Check for overheating issues.",
    13: "Event ID 13: Display driver crash. This indicates that the display driver has crashed. Possible solutions: \n" +
        "- Update GPU drivers to the latest version.\n" +
        "- Adjust GPU settings for performance or stability.\n" +
        "- Check for overheating issues.",
    1: "Event ID 1: Driver installation failure. This event indicates that the GPU driver installation has failed. Possible solutions: \n" +
        "- Ensure the GPU is properly connected to the system.\n" +
        "- Download and install the correct GPU drivers from the manufacturer's website.\n" +
        "- Check for any conflicting software or drivers that may be causing the installation failure.",
    12: "Event ID 12: Memory allocation failure. This indicates that the system failed to allocate memory. Possible solutions: \n" +
        "- Check for faulty RAM modules.\n" +
        "- Reseat or replace RAM modules.\n" +
        "- Run memory diagnostics to identify any issues.",
    29: "Event ID 29: Memory ECC error. This event indicates that a memory error correction has occurred. Possible solutions: \n" +
        "- Check for faulty RAM modules.\n" +
        "- Reseat or replace RAM modules.\n" +
        "- Ensure ECC memory is properly configured in BIOS settings.",
    153: "Event ID 153: Disk error on a hard drive. This event indicates a problem with a disk. Possible solutions: \n" +
        "- Run CHKDSK to check for disk errors and repair them.\n" +
        "- Replace the hard drive if errors persist.\n" +
        "- Ensure all connections are secure.",
    7: "Event ID 7: Bad block found. This event indicates that a bad block was found on the disk. Possible solutions: \n" +
        "- Run CHKDSK to mark bad sectors and attempt to recover data.\n" +
        "- Replace the hard drive if bad sectors cannot be repaired.\n" +
        "- Regularly back up data to prevent data loss.",
    51: "Event ID 51: An error was detected on device during a paging operation. This event indicates a problem with disk paging. Possible solutions: \n" +
        "- Check disk health using tools like CrystalDiskInfo.\n" +
        "- Ensure there is enough free space on the disk.\n" +
        "- Consider defragmenting the disk if fragmentation is high.",
    10016: "Event ID 10016: Sample suggestion"
};

const Cell4 = () => {
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/forecast');
                const forecast = response.data.forecast;

                const foundSolutions = {};

                // Check forecast for any known event IDs and collect the solutions
                for (const pcData of Object.values(forecast)) {
                    for (const eventId of Object.values(pcData)) {
                        if (eventSolutions[eventId] && !foundSolutions[eventId]) {
                            foundSolutions[eventId] = eventSolutions[eventId];
                        }
                    }
                }

                // Set the found solutions
                setSolutions(Object.values(foundSolutions));

            } catch (error) {
                console.error('Error fetching the forecast data:', error);
                setSolutions(['Error loading data']);
            }
        };

        fetchForecast();
    }, []);

    return (
        <div className="col" style={{ borderRadius: '12px', marginInlineEnd: '7.5px', padding: '20px', marginBottom: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div>
                <h5 style={{ margin: '0px'}}>Suggested Solutions</h5>
                {solutions.length === 0 ? (
                    <span>No critical issues predicted</span>
                ) : (
                    solutions.map((solution, index) => (
                        <p key={index}>{solution}</p>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cell4;
