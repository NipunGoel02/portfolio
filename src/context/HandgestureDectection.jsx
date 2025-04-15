import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const HandGestureDetection = ({ onGesture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState(null);  // Store detected gesture

  useEffect(() => {
    const loadModel = async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded.");

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const detectHands = async () => {
        const predictions = await net.estimateHands(video);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (predictions.length > 0) {
          predictions.forEach((prediction) => {
            const landmarks = prediction.landmarks;
            for (let i = 0; i < landmarks.length; i++) {
              const [x, y] = landmarks[i];
              ctx.fillStyle = "red";
              ctx.fillRect(x, y, 5, 5);
            }

            // Enhanced gesture detection
            const extendedFingers = countExtendedFingers(landmarks);
            detectGesture(extendedFingers);
          });
        } else {
          // No hands detected, send pause gesture
          setGesture('Pause');
          if (onGesture) onGesture('Pause');
        }

        requestAnimationFrame(detectHands);
      };

      detectHands();
    };

    const setupCamera = async () => {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      video.srcObject = stream;

      video.onloadeddata = () => {
        video.play();
      };
    };

    setupCamera().then(loadModel);
  }, [onGesture]);

  const countExtendedFingers = (landmarks) => {
    let extendedFingers = 0;

    // Thumb is excluded from extended fingers count
    // Check for other fingers
    // Index: landmarks[8] (tip) vs landmarks[7] (PIP)
    if (landmarks[8][1] < landmarks[7][1]) extendedFingers++;

    // Middle: landmarks[12] (tip) vs landmarks[11] (PIP)
    if (landmarks[12][1] < landmarks[11][1]) extendedFingers++;

    // Ring: landmarks[16] (tip) vs landmarks[15] (PIP)
    if (landmarks[16][1] < landmarks[15][1]) extendedFingers++;

    // Pinky: landmarks[20] (tip) vs landmarks[19] (PIP)
    if (landmarks[20][1] < landmarks[19][1]) extendedFingers++;

    return extendedFingers;
  };

  const detectGesture = (extendedFingers) => {
    if (extendedFingers === 1) {
      setGesture('One Finger Up');  // One finger extended (not the thumb)
      if (onGesture) onGesture('One Finger Up');
    } else if (extendedFingers === 2) {
      setGesture('Two Fingers Up');  // Two fingers extended
      if (onGesture) onGesture('Two Fingers Up');
    } else if (extendedFingers === 0) {
      setGesture('Pause');  // No extended fingers (closed fist)
      if (onGesture) onGesture('Pause');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Video feed from camera */}
      <video 
        ref={videoRef} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          zIndex: -1 
        }} 
        autoPlay 
        muted 
      />
      
      {/* Canvas overlay for hand detection */}
      <canvas ref={canvasRef} 
        width="640" 
        height="480" 
        style={{ position: 'absolute', top: 0, left: 0 }} />
      
      {/* Displaying detected gesture */}

    </div>
  );
};

export default HandGestureDetection;
