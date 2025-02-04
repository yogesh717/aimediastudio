import { ChangeDetectorRef, Component } from '@angular/core';
import { TextToImageService } from '../../services/text-to-image.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {  MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-text-to-image',
  imports: [FormsModule, 
            CommonModule,
            MatCardModule,
            MatGridListModule,
            MatFormFieldModule,
            MatToolbarModule,
            MatButtonModule,
            MatInputModule,
            MatChipsModule,
            MatProgressSpinnerModule,
            MatIcon
           ],
  templateUrl: './text-to-image.component.html',
  styleUrl: './text-to-image.component.css'
})
export class TextToImageComponent {
  
  prompt: string = '';
  imageUrl: SafeUrl | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private textToImageService: TextToImageService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {}

  generateImage() {
    this.resetFeedback();
    if (this.prompt.trim()) {
      this.isLoading = true;
      this.imageUrl = null;

      this.textToImageService.generateImage(this.prompt).subscribe({
        next: (blob) => {
          console.log('Blob received:', blob);
          if (!blob || blob.size === 0) {
            this.errorMessage = 'Failed to load image.';
            this.isLoading = false;
            return;
          }

          const objectURL = URL.createObjectURL(blob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          console.log('Generated Image URL:', objectURL);

          this.isLoading = false;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          console.error('Error generating image:', err);
          this.errorMessage = 'Failed to generate image. Please try again.';
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Please enter a prompt!';
    }
  }

  downloadImage() {
    if (this.imageUrl) {
      const a = document.createElement('a');
      a.href = this.imageUrl.toString();
      a.download = 'generated-image.png';
      a.click();
    } else {
      this.errorMessage = 'No image available to download.';
    }
  }

  reset() {
    this.prompt = '';
    this.imageUrl = null;
    this.resetFeedback();
  }

  private resetFeedback() {
    this.errorMessage = null;
    this.isLoading = false;
  }
}
