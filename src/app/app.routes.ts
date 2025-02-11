import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { TextToImageComponent } from './component/text-to-image/text-to-image.component';
import { ImagesToVideoComponent } from './component/images-to-video/images-to-video.component';
import { TextToSpeechComponent } from './component/text-to-speech/text-to-speech.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
   
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { 
            path: '', 
            component: LayoutComponent,
            children: [
                { path: '', component: HomeComponent }
            ]
    
    
        },
        {
             path: 'tts', 
             component: LayoutComponent,
            children: [
                { path: '', component: TextToSpeechComponent }
            ]
        
        },
        
        {
            path: 'text-to-image',
            component: LayoutComponent,
    
            children: [
                { path: '', component: TextToImageComponent }
            ]
        },
        { 
            path: 'image-audio-to-video', 
            component: LayoutComponent,
    
            children: [
                { path: '', component: ImagesToVideoComponent}
            ]
        },
    ];
    