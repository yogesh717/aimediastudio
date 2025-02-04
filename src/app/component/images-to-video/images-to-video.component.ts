import { FFmpeg } from '@ffmpeg/ffmpeg';  // Correct import
  import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
  
@Component({
  selector: 'app-images-to-video',
  imports: [CommonModule,BrowserModule],
  templateUrl: './images-to-video.component.html',
  styleUrl: './images-to-video.component.css'
})

export class ImagesToVideoComponent
 {


  imageFile: File | null = null;
  audioFile: File | null = null;
  videoUrl: string | null = null;
   
  private ffmpeg = FFmpeg.caller({ log: true });

  constructor() {
    this.ffmpeg.load();
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.imageFile = input.files[0];
    }
  }

  onAudioUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.audioFile = input.files[0];
    }
  }

  
  async convertToVideo() {
    if (this.imageFile && this.audioFile) {
     
      await this.ffmpeg.load();
      
      this.ffmpeg.FS('writeFile', 'image.jpg', await this.ffmpeg.fetchFile(this.imageFile));
      this.ffmpeg.FS('writeFile', 'audio.mp3', await this.ffmpeg.fetchFile(this.audioFile));

      
      await this.ffmpeg.run(
        '-framerate', '1', 
        '-i', 'image.jpg', 
        '-i', 'audio.mp3', 
        '-c:v', 'libx264', 
        '-t', '10', 
        '-pix_fmt', 'yuv420p', 
        'output.mp4'
      );

      
      const output = this.ffmpeg.FS('readFile', 'output.mp4');

      
      const videoBlob = new Blob([output.buffer], { type: 'video/mp4' });
      this.videoUrl = URL.createObjectURL(videoBlob);
    }
  }
}
