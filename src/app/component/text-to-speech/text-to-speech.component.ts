
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-text-to-speech',
  imports: [CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,

  ],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})
export class TextToSpeechComponent  implements OnInit {
    text: string = '';
    loading: boolean = false;
    voices: SpeechSynthesisVoice[] = [];
    selectedVoice: string = '';
    isBrowser: boolean;
  
    constructor(@Inject(PLATFORM_ID) private platformId: object) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }
  
    ngOnInit() {
      if (this.isBrowser) {
        this.loadVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  
    loadVoices() {
      if (!this.isBrowser) return;
  
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length > 0 && !this.selectedVoice) {
        this.selectedVoice = this.voices[0].name;
      }
    }
  
    generateSpeech() {
      if (!this.text.trim()) {
        alert('Please enter some text.');
        return;
      }
  
      if (!this.isBrowser) {
        alert('Text-to-Speech is only available in the browser.');
        return;
      }
  
      // this.loading = true;
  
      const utterance = new SpeechSynthesisUtterance(this.text);
      const selected = this.voices.find(voice => voice.name === this.selectedVoice);
      if (selected) {
        utterance.voice = selected;
      }
  
      utterance.onend = () => (this.loading = false);
      utterance.onerror = () => {
        this.loading = false;
        alert('Error generating speech. Please try again.');
      };
  
      window.speechSynthesis.speak(utterance);
    }
  }
  