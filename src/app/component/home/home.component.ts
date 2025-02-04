import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatIconAnchor } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  MatChipsModule } from '@angular/material/chips'
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { features } from 'node:process';



@Component({
  selector: 'app-home',
  imports: [MatCardModule, 
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule, CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('cardAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class HomeComponent   {

 feature = [
    { icon: 'chat', title: 'Excellent Support', description: 'We are passionate about empowering creatives with the tools they need to bring their vision to life.' },
    { icon: 'verified', title: 'Reliable Expert', description: 'We are passionate about empowering creatives with the tools they need to bring their vision to life.' },
    { icon: 'memory', title: 'Unique Technology', description: 'We are passionate about empowering creatives with the tools they need to bring their vision to life.' },
    { icon: 'visibility', title: 'High Image Quality', description: 'We are passionate about empowering creatives with the tools they need to bring their vision to life.' }
  ];
  cards = [
    { image: '../../../', text: 'Card 1' },
    { image: 'https://writebot-react.themetags.net/img/blog-img-2.jpg', text: 'Card 2' },
    { image: 'https://via.placeholder.com/80', text: 'Card 3' }
  ];

  onImageClick(card: any) {
    card.showFullImage = !card.showFullImage;
  }
}