import { Component } from '@angular/core';

@Component({
  selector: 'app-hashtag-section',
  imports: [],
  templateUrl: './hashtag-section.html',
  styleUrl: './hashtag-section.scss',
})
export class HashtagSection {
  protected readonly hashtag = '#EveryDreiWithTricia'.split('');
}
