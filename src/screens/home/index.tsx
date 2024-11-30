import { useRef, useState, useEffect } from "react";
import {SWATCHES} from '@/constants';
import {ColorSwatch, Group} from '@mantine/core';
import {Button} from '@/components/ui/button';
import axios from 'axios';

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setcolor] = useState('rgb(255,255,255')
    const [reset, setRest] = useState(false);
    

    useEffect(() => {
        const canvas = canvasRef.current;
        if(canvas){
            const ctx = canvas.getContext('2d');
            if(ctx){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                ctx.lineCap = 'round'; //brush type
                ctx.lineWidth = 3;
            }
        }
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.background = 'black';
            const ctx = canvas.getContext('2d');
            if(ctx){
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
  }

  const stopDrawing = () => {
    setIsDrawing(false);
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if(!isDrawing) return;
    
    const canvas = canvasRef.current;
    if(canvas){
        const ctx = canvas.getContext('2d');
        if(ctx){
            ctx.strokeStyle = color;
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctx.stroke();
        }
    }
  };

  return (
    <>
        <canvas
            ref={canvasRef}
            id="canvas"
            className="absolute top-0 left-0 w-full h-full"
            onMouseDown={startDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
        />
    </>
  );
}
