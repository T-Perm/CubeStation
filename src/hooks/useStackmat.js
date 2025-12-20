import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useStackmat Hook
 * Listens to Stackmat timer audio signals and decodes them into time and status.
 */
export const useStackmat = () => {
    const [time, setTime] = useState("0:00.00");
    const [status, setStatus] = useState("IDLE"); // IDLE, RUNNING, STOPPED, RESET
    const [signalStrength, setSignalStrength] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(null);

    const audioCtxRef = useRef(null);
    const streamRef = useRef(null);
    const workletNodeRef = useRef(null);

    const stopListening = useCallback(() => {
        if (workletNodeRef.current) {
            workletNodeRef.current.disconnect();
            workletNodeRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
        }
        setIsActive(false);
    }, []);

    const startListening = useCallback(async () => {
        try {
            setError(null);

            // 1. Request Microphone
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });
            streamRef.current = stream;

            // 2. Setup Audio Context
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: 44100
            });
            audioCtxRef.current = audioCtx;

            // 3. Load Worklet
            await audioCtx.audioWorklet.addModule('/stackmat-processor.js');

            const source = audioCtx.createMediaStreamSource(stream);
            const workletNode = new AudioWorkletNode(audioCtx, 'stackmat-processor');

            workletNode.port.onmessage = (event) => {
                const { type, value, time: decodedTime, status: decodedStatus } = event.data;

                if (type === 'STRENGTH') {
                    setSignalStrength(value);
                } else if (type === 'PACKET') {
                    setTime(decodedTime);
                    setStatus(decodedStatus);
                }
            };

            source.connect(workletNode);
            workletNode.connect(audioCtx.destination);
            workletNodeRef.current = workletNode;

            setIsActive(true);
        } catch (err) {
            console.error('Stackmat Error:', err);
            setError(err.name === 'NotAllowedError' ? 'Permission Denied' : err.message);
            stopListening();
        }
    }, [stopListening]);

    const toggleStackmat = useCallback(() => {
        if (isActive) {
            stopListening();
        } else {
            startListening();
        }
    }, [isActive, startListening, stopListening]);

    // Cleanup on unmount
    useEffect(() => {
        return () => stopListening();
    }, [stopListening]);

    return {
        time,
        status,
        signalStrength,
        isActive,
        error,
        toggleStackmat,
        startListening,
        stopListening
    };
};
