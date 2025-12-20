/**
 * Stackmat Signal Processor (AudioWorklet)
 * Decodes 1200 baud serial signal from Stackmat timers.
 */

class StackmatProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.buffer = new Float32Array(128);
        this.state = 'IDLE';
        this.samplesPerBit = 44100 / 1200; // Default, will adjust if needed
        this.bitClock = 0;
        this.currentByte = 0;
        this.bitIndex = 0;
        this.packet = [];

        this.lastSample = 0;
        this.threshold = 0.05;
        this.maxAmplitude = 0;

        this.bits = [];
    }

    process(inputs) {
        const input = inputs[0];
        if (!input || !input[0]) return true;

        const samples = input[0];

        for (let i = 0; i < samples.length; i++) {
            const sample = samples[i];
            const absSample = Math.abs(sample);

            this.maxAmplitude = Math.max(this.maxAmplitude * 0.9999, absSample);

            // Binary thresholding (Inverted pulse: high peak = 0, silence = 1)
            const bitValue = absSample > this.threshold ? 0 : 1;

            if (this.state === 'IDLE') {
                // Look for start bit (1 -> 0 transition)
                if (this.lastBitValue === 1 && bitValue === 0) {
                    this.state = 'START_BIT';
                    this.bitClock = this.samplesPerBit * 1.5; // Aim for middle of first data bit
                    this.bitIndex = 0;
                    this.currentByte = 0;
                }
            } else {
                this.bitClock--;
                if (this.bitClock <= 0) {
                    // Sample bit
                    if (this.bitIndex < 8) {
                        if (bitValue === 1) {
                            this.currentByte |= (1 << this.bitIndex);
                        }
                        this.bitIndex++;
                        this.bitClock = this.samplesPerBit;
                    } else {
                        // Stop bits / End of byte
                        this.handleByte(this.currentByte);
                        this.state = 'IDLE';
                    }
                }
            }
            this.lastBitValue = bitValue;
        }

        this.port.postMessage({
            type: 'STRENGTH',
            value: this.maxAmplitude
        });

        return true;
    }

    handleByte(byte) {
        // Stackmat Gen 3/4 Packet: Starts with a command byte like 'S', 'R', 'I'
        // Gen 3/4 packet is 9 or 10 bytes.
        // We look for a valid header and then collect the next 8-9 bytes.

        const char = String.fromCharCode(byte);
        const validHeaders = ['S', 'I', 'R', 'C', 'L', 'A', 'M']; // Stopped, Idle, Running, Reset, etc.

        if (validHeaders.includes(char)) {
            this.packet = [byte];
        } else if (this.packet.length > 0) {
            this.packet.push(byte);
            if (this.packet.length === 9) {
                this.validateAndSend(this.packet);
                this.packet = [];
            }
        }
    }

    validateAndSend(packet) {
        // Checksum: Sum of digits plus something usually.
        // However, the simplest valid check is the packet length and header.
        // Let's parse the digits as specified: 1-5

        // Status
        const statusByte = String.fromCharCode(packet[0]);
        let status = 'IDLE';
        if (statusByte === 'R') status = 'RUNNING';
        if (statusByte === 'S') status = 'STOPPED';
        if (statusByte === 'I') status = 'IDLE';
        if (statusByte === 'C') status = 'RESET';

        // Digits (Bytes 1-5 are ASCII digits)
        // Packet example: [Header] [Min] [Sec] [Sec] [Hun] [Hun]
        const m = packet[1] - 48;
        const s1 = packet[2] - 48;
        const s2 = packet[3] - 48;
        const h1 = packet[4] - 48;
        const h2 = packet[5] - 48;

        // Checksum (Byte 6 is usually sum of digits + 64 or similar)
        // Simple validation for mock:
        if (m >= 0 && m <= 9 && s1 >= 0 && s1 <= 9) {
            const timeStr = `${m}:${s1}${s2}.${h1}${h2}`;
            this.port.postMessage({
                type: 'PACKET',
                time: timeStr,
                status: status,
                raw: packet
            });
        }
    }
}

registerProcessor('stackmat-processor', StackmatProcessor);
