import { Component } from '@angular/core';

@Component({
  selector: 'app-our-story-page',
  templateUrl: './our-story-page.html',
})
export class OurStoryPage {
  protected readonly personas = [
    {
      avatar: 'drei-avatar.webp',
      name: 'Drei',
      title: 'The Tofu Whisperer',
      attributes: [
        { label: 'Age', value: 29 },
        { label: 'Zodiac', value: 'Capricorn' },
        { label: 'Work', value: 'Programmer' },
        { label: 'Strengths', value: 'Chess, Gaming' },
        { label: 'Weaknesses', value: 'Memory, Performing Arts, Tricia ✌️' },
      ],
    },
    {
      avatar: 'tricia-avatar.webp',
      name: 'Tricia',
      title: 'The Household CEO',
      attributes: [
        { label: 'Age', value: 29 },
        { label: 'Zodiac', value: 'Cancer' },
        { label: 'Work', value: 'Content (Strategist, Writer, Editor)' },
        { label: 'Strengths', value: 'Random Trivia, Organization' },
        { label: 'Weaknesses', value: 'Math, Directions, Driving 🚗' },
      ],
    },
  ];

  protected readonly coupleAttributes = [
    {
      label: 'How did you meet?',
      value: `
        <p>We signed up for the same (very early!) PE Volleyball class way back in 2013. He did quite well, while she struggled, and somehow her clumsiness was attractive to him. </p>
        <p>Although he swears he has liked her ever since, the timing wasn't right yet. The universe had other plans, and they faced the hurdles of the next seven years as just Twitter mutuals.</p>
        <p class="m-0">Fast-forward to December 2020, when the whole world remained in lockdown due to C-who-must-not-be-named. A certain beautiful creature, now the Maid of Honor, created a group chat and then left. He messaged: “Hi Trish! 😅” and confessed, and well, they never stopped talking since.</p>
      `,
    },
    {
      label: 'How long have you been together?',
      value: `
        <p class="m-0">Four years and counting... 🤞</p>
      `,
    },
    {
      label: 'How many pets do you have?',
      value: `
        <p>We have plenty… 13 indoor cats, 3 strays who became our regular outdoor team, and 3 more up there in cat paradise.</p>
        <p class="m-0">We've got a dedicated <a href="/miming-patrol" target="_blank" rel="noopener noreferrer">page</a> where you can get to know them all a little better!</p>
      `,
    },
    {
      label: 'What are your hobbies as a couple?',
      value: `
        <p class="m-0">We love completing puzzles, watching documentaries, competing in board games, and playing couch co-op games—basically, staying indoors.</p>
      `,
    },
    {
      label: 'Got any tips for making a relationship work?',
      value: `
        <p>Set up separate offices. Get separate blankets. Don't forget to say “Thank You” and "Please."</p>
        <p class="m-0">You can only nurture love when you've finished your work in peace and had a good night's rest. At the end of the day, your relationship should be grounded in respect.</p>
      `,
    },
  ];
}
