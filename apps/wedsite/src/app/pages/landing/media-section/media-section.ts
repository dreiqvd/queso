import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-section',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './media-section.html',
})
export class MediaSection {
  protected readonly footerLinks = [
    { label: 'Dress Code', route: '/dress-code' },
    { label: 'Our Story', route: '/our-story' },
    { label: 'Our Cats', route: '/miming-patrol' },
  ];
}
